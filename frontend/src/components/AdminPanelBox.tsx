import { Web3Context } from "@/app/Web3Context";
import { useContext } from "react";
import UpdateProfileForm from "./UpdateProfileForm";
import ProfileBox from "./ProfileBox";
import DeclareInfcomeForm from "./DeclareIncomeForm";
import PayTaxDeptForm from "./PayTaxDeptForm";
import SetTaxRateForm from "./SetTaxRateForm";
import ResidentsList from "./ResidentsList";
import GetResidentByName from "./GetResidentByName";

const AdminPanelBox = () => {
  const { selectedAccount, isInitialized, connect } = useContext(Web3Context);
  return (
    <div
      className="relative 
  flex flex-col md:flex-row justify-center items-center gap-10
  w-[80vw] 
  "
    >
      <div className="md:w-[50%] scale-[60%] md:scale-100 rounded h-fit  border-gray-400">
        <ResidentsList />
      </div>
      <div className="md:w-[30%] h-fit  border-gray-400">
        <SetTaxRateForm />
        <GetResidentByName />
      </div>
    </div>
  );
};

export default AdminPanelBox;
