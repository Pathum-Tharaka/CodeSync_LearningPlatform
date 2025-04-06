import React, { useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { Button, Tab, Tabs, Box } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TweetCard from "../HomeSection/TweetCard";
import ProfileModal from "./ProfileModel";

const Profile = () => {
  const [tabValue, setTabValue] = useState("1");
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const handleOpenProfileModal = () => setOpenProfileModal(true);
  const handleClose = () => setOpenProfileModal(false);
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleFollowUser = () => {
    console.log("follow user");
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === "4") {
      console.log("likes tweets");
    } else if (newValue === "1") {
      console.log("users tweets");
    }
  };
  
  return (
    <div>
      <section className={"z-50 flex items-center sticky top-0 bg-opacity-95"}>
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
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            alt="code with jahan"
            className="transform -translate-y-24"
            src="https://avatars.githubusercontent.com/u/183508853?s=200&v=4"
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />
          {true ? (
            <Button
              onClick={handleOpenProfileModal}
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
          <div className="flex items-center">
            <h1 className="font-bold text-lg">Soft Wizards</h1>
            {true && (
              <img
                className="w-4 h-4 ml-2 mr-2 mt-2"
                src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
                alt="verified"
              />
            )}
          </div>
          <p className="text-gray-500">@softwizards</p>
        </div>
        <div className="mt-2 space-y-3">
          <p>
            Hello, If you want to learn programming with CodeSync, you will find
            coding learning material on our website.
          </p>
          <div className="flex items-center text-gray-500">
            <BusinessCenterIcon />
            <p className="ml-2">Education</p>
          </div>
          <div className="flex items-center text-gray-500">
            <LocationOnIcon />
            <p className="ml-2">Sri Lanka</p>
          </div>
          <div className="flex items-center text-gray-500">
            <CalendarMonthIcon />
            <p className="ml-2">Joined Jun 2022</p>
          </div>

          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-1 font-semibold">
              <span>590</span>
              <span className="text-gray-500">Following</span>
            </div>
            <div className="flex items-center space-x-1 font-semibold">
              <span>590</span>
              <span className="text-gray-500">Followers</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Tweets" value="1" />
                <Tab label="Replies" value="2" />
                <Tab label="Media" value="3" />
                <Tab label="Likes" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {[1, 1, 1, 1].map((item, index) => (
                <TweetCard key={index} />
              ))}
            </TabPanel>
            <TabPanel value="2">users replies</TabPanel>
            <TabPanel value="3">Media</TabPanel>
            <TabPanel value="4">Likes</TabPanel>
          </TabContext>
        </Box>
      </section>
      <section>
      <ProfileModal open={openProfileModal} handleClose={handleClose} />
      </section>
      
    </div>
  );
};

export default Profile;