import { useContext, useState } from "react";
import Input from "./Input";
import { Web3Context } from "@/app/Web3Context";
import Button from "./Button";

const UpdateProfileForm = () => {
    const { profile, updateProfile } = useContext(Web3Context);
    const [updateProfileFormData, setUpdateProfileFormData] = useState({
      name: profile.name,
      street: profile.address.street,
      city: profile.address.city,
      state: profile.address.state,
      zip: profile.address.zip,
      day:"",
      month: "",
      year: "",
    });
  
    const handleChangeUpdateForm = (e: any) => {
      const { name, value } = e.target;
      setUpdateProfileFormData({ ...updateProfileFormData, [name]: value });
    };
  
    return (
      <div className="flex-1 px-5  gap-4   h-full flex flex-col">
        <p
          className="break-words first-letter:
    font-bold
  text-[24px] text-left"
        >
          Update Profile Details
        </p>
        <p className="font-medium">Update Name</p>
        <Input
          placeholder="Full Name"
          type="text"
          value={updateProfileFormData.name}
          name="name"
          onChange={handleChangeUpdateForm}
          key="name"
        />
        <p className="font-medium">Update Address</p>
        <Input
          placeholder="Street"
          type="text"
          value={updateProfileFormData.street}
          name="street"
          onChange={handleChangeUpdateForm}
          key="street"
        />
        <Input
          placeholder="City"
          type="text"
          value={updateProfileFormData.city}
          name="city"
          onChange={handleChangeUpdateForm}
          key="city"
        />
        <Input
          placeholder="State"
          type="text"
          value={updateProfileFormData.state}
          name="state"
          onChange={handleChangeUpdateForm}
        />
        <Input
          placeholder="Zip"
          type="text"
          value={updateProfileFormData.zip+""}
          name="zip"
          onChange={handleChangeUpdateForm}
          key={"zip"}
        />
        <p className="font-medium">Date of birth (you can update your age) </p>
        <Input
          placeholder="Day"
          min={1}
          max={
            updateProfileFormData.month === "2"
              ? 28
              : [4, 6, 9, 11].includes(Number(updateProfileFormData.month))
              ? 30
              : 31
          }
          type="number"
          value={updateProfileFormData.day+""}
          name="day"
          onChange={handleChangeUpdateForm}
          key={"day"}
        />
        <Input
          placeholder="Month"
          type="number"
          min={1}
          max={12}
          value={updateProfileFormData.month}
          name="month"
          onChange={handleChangeUpdateForm}
        />
        <Input
          placeholder="Year"
          type="number"
          value={updateProfileFormData.year}
          min={1950}
          max={2050}
          name="year"
          onChange={handleChangeUpdateForm}
          key={"year"}
        />
        <Button
          disabled={
            !updateProfileFormData.name ||
            !updateProfileFormData.street ||
            !updateProfileFormData.city ||
            !updateProfileFormData.state ||
            !updateProfileFormData.zip ||
            !updateProfileFormData.day ||
            !updateProfileFormData.month ||
            !updateProfileFormData.year
          }
          onClick={() => {
            updateProfile(
              updateProfileFormData.name,
              updateProfileFormData.city,
              updateProfileFormData.state,
              updateProfileFormData.street,
              Number(updateProfileFormData.zip),
              Number(updateProfileFormData.day),
              Number(updateProfileFormData.month),
              Number(updateProfileFormData.year)
            );
          }}
        >
          Update
        </Button>
      </div>
    );
  };

  
export default UpdateProfileForm;