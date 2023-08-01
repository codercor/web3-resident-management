import { useContext, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { Web3Context } from "@/app/Web3Context";

const SetTaxRateForm = () => {
  const {  setTaxRate } = useContext(Web3Context);
  const [_taxRate, _setTaxRate] = useState(0);
  const handleChange = (e: any) => {
    _setTaxRate(e.target.value);
  };
  return (
    <div className="w-full flex flex-col">
      <p className="font-bold text-[20px]"> Declare Tax Rate </p>
      <Input
        placeholder="TaxRate"
        type="number"
        value={_taxRate as any}
        name="income"
        onChange={handleChange}
      />
      <Button
        onClick={() => {
          setTaxRate(_taxRate);
        }}
      >
        {" "}
        Set{" "}
      </Button>
    </div>
  );
};

export default SetTaxRateForm;
