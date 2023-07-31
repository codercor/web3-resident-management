import { Web3Context } from "@/app/Web3Context";
import { useContext } from "react";
import UpdateProfileForm from "./UpdateProfileForm";
import ProfileBox from "./ProfileBox";
import DeclareInfcomeForm from "./DeclareIncomeForm";
import PayTaxDeptForm from "./PayTaxDeptForm";

const ResidentPanelBox = () => {
  const { selectedAccount, isInitialized, connect } = useContext(Web3Context);
  return (
    <div
      className="relative 
  flex flex-col md:flex-row justify-center items-center gap-10
  border border-red-500
  w-[80vw] 
  "
    >
      <div className="md:w-[30%] rounded h-fit   border-gray-400">
        <UpdateProfileForm />
      </div>
      <div className="md:w-[30%] h-fit   border-gray-400">
        <ProfileBox />
        <DeclareInfcomeForm />
        <PayTaxDeptForm/>
      </div>
    </div>
  );
};

export default ResidentPanelBox;
