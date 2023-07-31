import { useContext } from "react";
import { Web3Context } from "../app/Web3Context";
import Button from "@/components/Button";
import RegisterForm from "@/components/RegisterForm";

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

export default AuthenticantionBox;
