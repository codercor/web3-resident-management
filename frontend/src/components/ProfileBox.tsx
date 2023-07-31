import { Web3Context } from "@/app/Web3Context";
import { useContext } from "react";
import Button from "./Button";

const ProfileInfo = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex bg-blue-50 rounded shadow-lg flex-col border border-black   w-[300px] items-center justify center">
      <h3 className="font-bold">{title} </h3>
      <p className="text-[24px] font-light"> {value} </p>
    </div>
  );
};

const ProfileBox = () => {
  const { profile, getProfile } = useContext(Web3Context);
  return (
    <div className="w-full flex flex-wrap">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <p className="font-bold text-[20px]"> Info </p>
          <button
            onClick={() => {
              getProfile();
            }}
          >
            {" "}
            Refresh 🔄{" "}
          </button>
        </div>
        <div className="flex gap-2 flex-wrap justify-center items-center">
          <ProfileInfo title="Name" value={profile.name} />
          <ProfileInfo title="Age" value={profile.age + ""} />
          <ProfileInfo title="Income" value={profile.income + ""} />
          <ProfileInfo title="Tax Dept" value={profile.taxDept + ""} />
        </div>
      </div>
      <div className="flex flex-col">
        <p className="font-bold text-[20px]"> Address </p>
        <div className="flex gap-2 flex-wrap justify-center items-center">
          <ProfileInfo title="Street" value={profile.address.street} />
          <ProfileInfo title="City" value={profile.address.city} />
          <ProfileInfo title="State" value={profile.address.state} />
          <ProfileInfo title="Zip" value={profile.address.zip + ""} />
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
