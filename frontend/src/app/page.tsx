"use client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Web3Context } from "./Web3Context";
import Web3ContextProvider from "./Web3Context";
import AuthenticantionBox from "../components/AuthenticationBox";
import NotConnectedBox from "@/components/NotConnectedBox";
import ResidentPanelBox from "@/components/ResidentPanelBox";
import AdminPanelBox from "@/components/AdminPanelBox";

function HomeContent() {
  const { selectedAccount, isInitialized, connect, disconnect, isLoggedIn, isAdmin } =
    useContext(Web3Context);
  useEffect(() => { }, []);
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
          isAdmin ? <AdminPanelBox /> : <ResidentPanelBox />
        ) : (
          <AuthenticantionBox />
        )
      ) : (
        <NotConnectedBox />
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
