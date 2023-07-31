import { Web3Context } from "@/app/Web3Context";
import { useContext } from "react";

const NotConnectedBox = () => {
  const { selectedAccount, isInitialized, connect } = useContext(Web3Context);
  return (
    <div
      className="relative 
      flex place-items-center animate-pulse text-black hover:text-red-500 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-400 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"
    >
      <h1
        onClick={() => connect()}
        className="text-[30px] font-bold underline underline-offset-[10px]"
      >
        Connect your wallet to reach resident dashboard
      </h1>
    </div>
  );
};

export default NotConnectedBox;
