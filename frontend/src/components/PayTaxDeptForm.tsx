import { Web3Context } from "@/app/Web3Context";
import Button from "./Button";
import { useContext } from "react";

const PayTaxDeptForm = () => {
    const { profile,payTax } = useContext(Web3Context);
  return <div className="flex flex-col w-full">
    <p className="font-bold text-[20px]">Pay Tax Dept  
    <span className="text-[14px] font-medium"> 🔥 Tax dept : {profile.taxDept} </span>
    </p>
    <Button onClick={()=>{
        payTax(profile.taxDept);
    }}  > Pay Now </Button>
  </div>;
};

export default PayTaxDeptForm;
