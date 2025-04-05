import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";

const Profile = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const handleOpenProfileModel = () => {
    console.log("open profile model");
  };
  const handleFollowUser = () => {
    console.log("follow user");
  };
  return (
    <div>
      <section className={"z-50- flex items-center sticky top-0 bg-opacity-95"}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
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
          {true ? (
            <Button
              onClick={handleOpenProfileModel}
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handleFollowUser}
              sx={{ borderRadius: "20px" }}
              variant="contained"
            >
              {true ? "Follow" : "Following"}
            </Button>
          )}
        </div>
        <div>
          <div className="flex item-center">
            <h1 className="font-bold text-lg">Soft Wizards</h1>
            {true && (
              <img
                className="w-4 h-4 ml-2"
                src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
                alt="verified"
              />
            )}
          </div>
          <p className="text-gray-500">@softwizards</p>
        </div>
        <div className="mt-2 spacy-y-3">
          <p>Hello, If you want to learn programming with CodeSync, you will find coding learning material on our website.</p>
        </div>
      </section>
    </div>
  );
};
export default Profile;
