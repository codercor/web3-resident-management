import { useContext, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { Web3Context } from "@/app/Web3Context";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const { registerResident, getProfile: login } = useContext(Web3Context);
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    DoBDay: "",
    DoBMonth: "",
    DoBYear: "",
  });

  const handleChangeRegisterForm = (e: any) => {
    const { name, value } = e.target;
    setRegisterFormData({ ...registerFormData, [name]: value });
  };

  return (
    <div className="flex-1 px-5  gap-4   h-full flex flex-col">
      <p
        className="break-words first-letter:
      text-[#ea57b6] 
  text-[24px] text-center"
      >
        Register
      </p>
      <Input
        placeholder="Name"
        type="text"
        value={registerFormData.name}
        name="name"
        onChange={handleChangeRegisterForm}
        key="name"
      />
      <Input
        placeholder="City"
        type="text"
        value={registerFormData.city}
        name="city"
        onChange={handleChangeRegisterForm}
        key="city"
      />
      <Input
        placeholder="State"
        type="text"
        value={registerFormData.state}
        name="state"
        onChange={handleChangeRegisterForm}
      />
      <Input
        placeholder="Zip"
        type="text"
        value={registerFormData.zip}
        name="zip"
        onChange={handleChangeRegisterForm}
        key={"zip"}
      />
      <Input
        placeholder="Day"
        min={1}
        max={
          registerFormData.DoBMonth === "2"
            ? 28
            : [4, 6, 9, 11].includes(Number(registerFormData.DoBMonth))
            ? 30
            : 31
        }
        type="number"
        value={registerFormData.DoBDay}
        name="DoBDay"
        onChange={handleChangeRegisterForm}
        key={"DoBDay"}
      />
      <Input
        placeholder="Month"
        type="number"
        min={1}
        max={12}
        value={registerFormData.DoBMonth}
        name="DoBMonth"
        onChange={handleChangeRegisterForm}
      />
      <Input
        placeholder="Year"
        type="number"
        value={registerFormData.DoBYear}
        min={1950}
        max={2050}
        name="DoBYear"
        onChange={handleChangeRegisterForm}
        key={"DoBYear"}
      />
      <Button
        disabled={
          !registerFormData.name ||
          !registerFormData.city ||
          !registerFormData.state ||
          !registerFormData.zip ||
          !registerFormData.DoBDay ||
          !registerFormData.DoBMonth ||
          !registerFormData.DoBYear
        }
        onClick={() => {
          registerResident(
            registerFormData.name,
            registerFormData.street,
            registerFormData.city,
            registerFormData.state,
            Number(registerFormData.zip),
            Number(registerFormData.DoBDay),
            Number(registerFormData.DoBMonth),
            Number(registerFormData.DoBYear)
          )
        }}
      >
        Register
      </Button>
    </div>
  );
};

export default RegisterForm;
