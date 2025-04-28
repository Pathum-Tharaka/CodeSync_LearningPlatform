import { useDisclosure } from "@chakra-ui/hooks";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { mainu } from "./SidebarConfig";
import { useSelector } from "react-redux";
import SearchComponent from "../SearchComponent/SearchComponent";
import CreatePostModal from "../Post/Create/CreatePostModal";
import CreateReelModal from "../Create/CreateReel";
import logo from "../../Assets/logo.png";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Home");
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSelector((store) => store);
  const [isCreateReelModalOpen, setIsCreateReelModalOpen] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "Profile") navigate(`/${user.reqUser?.username}`);
    else if (tab === "Home") navigate("/");
    else if (tab === "Create Post") onOpen();
    else if (tab === "About Us") navigate("/about");
    else if (tab === "Reels") navigate("/reels");
    else if (tab === "Create Reels") setIsCreateReelModalOpen(true);
    else if (tab === "Notifications") navigate("/notifications");
    else if (tab === "Create Story") navigate("/create-story");
    else if (tab === "Learning Plan") navigate("/learning_plan");
    else if (tab === "Learning Progress") navigate("/learning-progress");
    setIsSearchBoxVisible(tab === "Search");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sticky top-0 h-screen w-64 bg-white border-r flex flex-col justify-between overflow-y-auto">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b">
          <img src={logo} alt="Logo" className="w-full max-w-[160px] mx-auto" />
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-2 px-3">
          {mainu.map((item, index) => (
            <div
              key={index}
              onClick={() => handleTabClick(item.title)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer mb-1 transition-colors ${
                activeTab === item.title
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="text-xl">
                {activeTab === item.title ? item.activeIcon : item.icon}
              </div>
              <span className="text-sm font-medium">{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section - Logout */}
      <div className="p-3 border-t">
        <div
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <div className="text-xl">🚪</div>
          <span className="text-sm font-medium">Log Out</span>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchBoxVisible && (
        <div className="absolute inset-0 bg-white z-10">
          <SearchComponent setIsSearchVisible={setIsSearchBoxVisible} />
        </div>
      )}

      {/* Other Modals */}
      <CreatePostModal onClose={onClose} isOpen={isOpen} />
      <CreateReelModal
        onClose={() => setIsCreateReelModalOpen(false)}
        isOpen={isCreateReelModalOpen}
      />
    </div>
  );
};

export default Sidebar;