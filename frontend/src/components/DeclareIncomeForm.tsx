import { useContext, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { Web3Context } from "@/app/Web3Context";

const DeclareIncomeForm = () => {
  const { profile, declareIncome } = useContext(Web3Context);
  const [income, setIncome] = useState(0);
  const handleChange = (e: any) => {
    setIncome(e.target.value);
  };
  return (
    <div className="w-full flex flex-col">
      <p className="font-bold text-[20px]"> Declare Income </p>
      <Input
        placeholder="Income"
        type="number"
        value={income as any}
        name="income"
        onChange={handleChange}
      />
      <Button
        onClick={() => {
          declareIncome(income);
        }}
      >
        {" "}
        Declare{" "}
      </Button>
    </div>
  );
};

export default DeclareIncomeForm;
