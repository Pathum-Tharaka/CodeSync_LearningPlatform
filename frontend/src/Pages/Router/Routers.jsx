import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";

import StoryPage from "../../Components/Demo/Demo";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { getUserProfileAction } from "../../Redux/User/Action";
import Auth from "../Auth/Auth";
import EditProfilePage from "../EditProfile/EditProfilePage";
import HomePage from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
import Story from "../Story/Story";
import ReelViewer from "../ReelViewer/ReelViewer";
import CreateStory from "../../Components/Story/CreateStory";
import Notification from "../../Components/Notification/Notification";
import LearningPlan from "../../Components/LearningPlan/LearningPlan";
import LearningProgress from "../../Components/LearningProgress/LearningProgress";
import AboutUs from "../AboutUs/AboutUs";
import OAuthSuccess from "../Auth/OAuthSuccess"; 




const Routers = () => {
  const location =useLocation();
  const reqUser = useSelector(store=>store.user.reqUser);
  const token=localStorage.getItem("token");
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getUserProfileAction(token));
 },[token])
  return (
    <div>
      {}

{(location.pathname !== "/login" && location.pathname !=="/signup")&& (
    <div className="flex">
      {location.pathname!=="/reels" && <div className="sidebarBox border border-l-slate-500 w-[20%]">
        <Sidebar />
      </div>}
      <div className="w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/p/:postId" element={<HomePage />} />
          <Route path="/p/:postId/edit" element={<HomePage />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/demo" element={<StoryPage />} />
          <Route path="/story/:userId" element={<Story />} />
          <Route path="/account/edit" element={<EditProfilePage />} />
          <Route path="/reels" element={<ReelViewer />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/create-story" element={<CreateStory />} />
          <Route path="/learning_plan" element={<LearningPlan />} />
          <Route path="/learning-progress" element={<LearningProgress />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
        </Routes>
      </div>
    </div>
  )}
  {(location.pathname === "/login" || location.pathname==="/signup") && (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Auth />} />
    </Routes>
  )}
    </div>
    
  );
};

export default Routers;
