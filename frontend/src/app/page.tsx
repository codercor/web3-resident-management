"use client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Web3Context } from "./Web3Context";
import Web3ContextProvider from "./Web3Context";
import Input from "@/components/Input";
import Button from "@/components/Button";
import RegisterForm from "@/components/RegisterForm";

const NotConnected = () => {
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

const ResidentPanel = () => {
  const { selectedAccount, isInitialized, connect } = useContext(Web3Context);
  return (
    <div
      className="relative 
flex place-items-center animate-pulse text-black hover:text-red-500 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-400 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"
    >
      <h1
        onClick={() => connect()}
        className="text-[30px] font-bold underline underline-offset-[10px]"
      ></h1>
    </div>
  );
};

const AuthenticantionBox = () => {
  const { getProfile: login } = useContext(Web3Context);

  return (
    <div
      className="relative 
  flex place-items-center  flex-col "
    >
      <h1 className="text-[30px] font-bold underline underline-offset-[10px]">
        Auth
      </h1>
      <div className="min-w-[80vw] md:gap-0 gap-10 flex-col md:flex-row h-fit py-4 flex items-stretch justify-around">
        <div className="flex-1 md:py-0 py-10 gap-10 md:gap-4 md:border-r md:border-b-[0px] border-b border-black flex flex-col justify-center items-center">
          <p
            className="break-words first-letter:
            text-[#ea57b6] 
     text-[16px] w-[50%] text-center"
          >
            Do you have an account?
          </p>
          <Button className="px-4" onClick={() => login()}>
            Login
          </Button>
        </div>

        <h2 className=" flex-1 md:border-r md:border-b-[0px] border-b border-black leading-none md:py-0 py-4 items-center justify-center text-center  text-[20px] md:flex hidden md:text-[40px] font-semibold italic">
          {" "}
          OR{" "}
        </h2>
        <RegisterForm />
      </div>
    </div>
  );
};

function HomeContent() {
  const { selectedAccount, isInitialized, connect, disconnect, isLoggedIn } =
    useContext(Web3Context);
  useEffect(() => {}, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Resident
          <code className="font-mono font-bold">&nbsp;Dashboard Dapp</code>
        </p>
        <div className="fixed  bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <button
            onClick={() => {
              if (selectedAccount) {
                disconnect();
              } else connect();
            }}
            className="flex items-center  gap-3"
          >
            <Image
              alt="connect metamask button"
              src="/fox.svg"
              width={50}
              height={50}
            />
            <span>{selectedAccount ? selectedAccount : "Connect"}</span>
            {selectedAccount ? (
              <div className="h-[5px] w-[5px] bg-green-500 rounded-full"></div>
            ) : (
              <div className="h-[5px] w-[5px] bg-red-500 rounded-full"></div>
            )}
          </button>
        </div>
      </div>

      {selectedAccount ? (
        isLoggedIn ? (
          <ResidentPanel />
        ) : (
          <AuthenticantionBox />
        )
      ) : (
        <NotConnected />
      )}

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
      <ToastContainer />
    </main>
  );
}

export default function Home() {
  return (
    <Web3ContextProvider>
      <HomeContent />
    </Web3ContextProvider>
  );
}
