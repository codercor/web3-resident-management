import { useEffect, useState } from "react";
import { Web3Context, initialContext } from "./Web3Context";
import Web3, { ContractAbi, RpcError } from "web3";
import ResidentRegistrationContract from "../../../backend/build/contracts/ResidentRegistration.json";
import { toast } from "react-toastify";

const Web3ContextProvider = ({ children }: React.PropsWithChildren) => {
  const [context, setContext] = useState(initialContext);

  const connect = async () => {
    let provider = window.ethereum;
    let newContext = { ...context };
    if (typeof provider !== "undefined") {
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts: string[]) => {
          newContext = {
            ...newContext,
            selectedAccount: accounts[0],
          };
          console.log(`Selected account is ${accounts[0]}`);
        })
        .catch((err: RpcError) => {
          toast.error(err.message);
        });
      window.ethereum.on("accountsChanged", function (accounts: string[]) {
        newContext = {
          ...newContext,
          selectedAccount: accounts[0],
        };
        console.log(`Selected account changed to ${accounts[0]}`);
      });
    }
    const web3 = new Web3(provider);
    web3.eth.handleRevert = true;
    const networkId = await web3.eth.net.getId();
    newContext = {
      ...newContext,
      contract: new web3.eth.Contract(
        ResidentRegistrationContract.abi as ContractAbi,
        // @ts-ignore
        ResidentRegistrationContract.networks[networkId as string].address
      ),
      isInitialized: true,
    };
    setContext(newContext);
  };

  useEffect(() => {
    console.log("context", context);
  }, [context]);

  const getMeResident = async () => {
    if (!context.isInitialized) {
      await connect();
    }
    return context.contract.methods
      .getMeResident()
      .call({ from: context.selectedAccount });
  };
  const getProfile = async () => {
    if (!context.isInitialized) {
      await connect();
    }
    context.contract.methods
      .getMeResident()
      .call({ from: context.selectedAccount })
      .then((res: any) => {
        console.log("res", res);
        setContext({
          ...context,
          isLoggedIn: true,
          profile: {
            address: {
              street: res.addr.street as string,
              city: res.addr.city as string,
              state: res.addr.state as string,
              zip: res.addr.zip as number,
            },
            name: "",
            day: 0,
            month: 0,
            year: 0,
          },
        });
      });
  };

  const getOwner = async () => {
    if (!context.isInitialized) {
      await connect();
    }
    return context.contract.methods
      .owner()
      .call({ from: context.selectedAccount });
  };

  useEffect(() => {
    if (context.isLoggedIn) {
      getOwner().then((res: any) => {
        console.log("is admin", (res as string) === context.selectedAccount);
        if ((res as string) === context.selectedAccount) {
          setContext({
            ...context,
            isAdmin: true,
          });
        }
      }).catch((err: Error) => {
        console.log(err);
      });
    }
  }, [context.isLoggedIn]);

  const registerResident = async (
    name: string,
    city: string,
    state: string,
    street: string,
    zip: number,
    day: number,
    month: number,
    year: number
  ) => {
    if (!context.isInitialized) {
      await connect();
    }
    return (
      context.contract.methods
        // @ts-ignore
        .registerResident(name, city, state, street, zip, day, month, year)
        .send({
          from: context.selectedAccount,
        })
    );
  };

  const disconnect = () => {
    setContext(initialContext);
  };

  return (
    <Web3Context.Provider
      value={{
        ...context,
        connect,
        disconnect,
        getMeResident,
        registerResident,
        getProfile,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;
