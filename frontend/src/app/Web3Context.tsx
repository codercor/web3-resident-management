import { createContext } from "react";
import ResidentRegistrationContract from "../../../backend/build/contracts/ResidentRegistration.json";
import { useEffect, useState } from "react";
import Web3, { ContractAbi, RpcError, Contract } from "web3";
import { toast } from "react-toastify";

const errorParser = (err: any) => {
  console.log("Error ", { ...err, message: err?.message });

  let errorMessage = "";

  if (typeof err.data?.message == "string")
    errorMessage = err.data.message.split("revert ")[1].split('"')[0];
  else if (typeof err?.message == "string")
    errorMessage = err.message.split("revert ")[1].split('"')[0];

  return errorMessage;
};

interface Web3ContextType {
  web3: Web3;
  accounts: string[];
  contract: Contract<typeof ResidentRegistrationContract.abi>;
  selectedAccount: string;
  isInitialized: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  getMeResident: () => Promise<any>;
  isAdmin: boolean;
  isLoggedIn: boolean;

  profile: {
    name: string;
    address: { city: string; state: string; street: string; zip: number };
    age: number;
    taxDept: number;
    income: number;
  };

  registerResident: (
    name: string,
    city: string,
    state: string,
    street: string,
    zip: number,
    day: number,
    month: number,
    year: number
  ) => Promise<any>;
  getProfile: () => Promise<any>;
  declareIncome: (income: number) => Promise<any>;
  payTax: (taxDept: number) => Promise<any>;
  updateProfile: (
    name: string,
    city: string,
    state: string,
    street: string,
    zip: number,
    day: number,
    month: number,
    year: number
  ) => Promise<any>;
}

export const initialContext: Web3ContextType = {
  web3: new Web3(),
  accounts: [],
  contract: new Contract(
    ResidentRegistrationContract.abi,
    ResidentRegistrationContract.networks[5777].address
  ),
  selectedAccount: "",
  isInitialized: false,
  connect: async () => {},
  disconnect: () => {},
  getMeResident: async () => {},
  isAdmin: false,
  isLoggedIn: false,
  profile: {
    name: "",
    address: {
      state: "",
      city: "",
      street: "",
      zip: 1,
    },
    age: 0,
    taxDept: 0,
    income: 0,
  },
  registerResident: async (
    name: string,
    city: string,
    state: string,
    street: string,
    zip: number,
    day: number,
    month: number,
    year: number
  ) => {},
  getProfile: async () => {},
  declareIncome: async (income: number) => {},
  payTax: async (taxDept: number) => {},
  updateProfile: async (
    name: string,
    city: string,
    state: string,
    street: string,
    zip: number,
    day: number,
    month: number,
    year: number
  ) => {},
};

export const Web3Context = createContext<Web3ContextType>(initialContext);

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
        .catch((err: any) => {
          toast.error(err.message);
        });
      window.ethereum.on("accountsChanged", function (accounts: string[]) {
        newContext = {
          ...newContext,
          selectedAccount: accounts[0],
        };
        setContext(newContext);
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
              street: res.addr.street,
              city: res.addr.city,
              state: res.addr.state,
              zip: res.addr.zip,
            },
            income: parseFloat(res.income),
            name: res.name,
            age: parseInt(res.age),
            taxDept: parseInt(res.taxDept),
          },
        });
      })
      .catch((err: any) => {
        toast.error(errorParser(err));
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
      getOwner()
        .then((res: any) => {
          console.log(
            "is admin",
            (res as string).toLowerCase() ===
              context.selectedAccount.toLowerCase()
          );

          if (
            (res as string).toLowerCase() ===
            context.selectedAccount.toLowerCase()
          ) {
            setContext({
              ...context,
              isAdmin: true,
            });
            toast.success("Admin logged in!");
          }
        })
        .catch((err: any) => {
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
    context.contract.methods
      // @ts-ignore
      .registerResident(name, city, state, street, zip, day, month, year)
      .send({
        from: context.selectedAccount,
        gas: "1000000",
      })
      .then((res: any) => {
        toast.success("Registered! Loggin in automatically...");
        getProfile();
      })
      .catch((err: any) => {
        toast.error(errorParser(err));
      });
  };

  const disconnect = () => {
    setContext(initialContext);
  };

  const declareIncome = async (income: number) => {
    if (!context.isInitialized) {
      await connect();
    }
    context.contract.methods
      // @ts-ignore
      .declareIncome(income)
      .send({
        from: context.selectedAccount,
        gas: "1000000",
      })
      .then((res: any) => {
        toast.success("Income declared!");
        getProfile();
      })
      .catch((err: any) => {
        toast.error(errorParser(err));
      });
  };

  const payTax = async (price: number) => {
    //price as a wei
    const _price = context.web3.utils.toWei(price + "", "ether");
    if (!context.isInitialized) {
      await connect();
    }
    context.contract.methods
      .payTax()
      .send({
        from: context.selectedAccount,
        gas: "1000000",
        value: price + "",
      })
      .then((res: any) => {
        toast.success("Tax paid!");
        getProfile();
      })
      .catch((err: any) => {
        toast.error(errorParser(err));
      });
  };

  const updateProfile = async (
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
    context.contract.methods
      // @ts-ignore
      .updateResident(name, street, city, state, zip, day, month, year)
      .send({
        from: context.selectedAccount,
        gas: "1000000",
      })
      .then((res: any) => {
        toast.success("Profile updated!");
        getProfile();
      })
      .catch((err: any) => {
        toast.error(errorParser(err));
      });
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
        declareIncome,
        payTax,
        updateProfile,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;
