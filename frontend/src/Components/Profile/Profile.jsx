import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
const Profile = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <section className={"z-50- flex items-center sticky top-0 bg-opacity-95"}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onclick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">Profile</h1>
      </section>

      <section>
        <img
          className="w-[100%] h-[15rem] object-cover"
          src="https://cdn.pixabay.com/photo/2021/02/15/13/08/twitter-6017758_960_720.png"
          alt=""
        />
      </section>

      <section className="pl-6">
        <div className="flex justfy-between items-start mt-5 h-[5rem]">
          <Avatar
            alt="code with jahan"
            className="trasnform -translate-y-24"
            src="https://avatars.githubusercontent.com/u/183508853?s=200&v=4"
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />
        </div>
      </section>
    </div>
  );
};
export default Profile;
