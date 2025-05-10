import { useDisclosure } from "@chakra-ui/hooks";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { mainu } from "./SidebarConfig";
import { useSelector } from "react-redux";
import SearchComponent from "../SearchComponent/SearchComponent";
import CreatePostModal from "../Post/Create/CreatePostModal";
import CreateReelModal from "../Create/CreateReel";
import logo from "../../Assets/logo1.png";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Home");
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSelector((store) => store);
  const [isCreateReelModalOpen, setIsCreateReelModalOpen] = useState(false);
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsSearchBoxVisible(tab === "Search");

    if (tab === "Profile") navigate(`/${user.reqUser?.username}`);
    else if (tab === "Home") navigate("/");
    else if (tab === "About Us") navigate("/about");
    else if (tab === "Tricks") navigate("/reels");
    else if (tab === "Notifications") navigate("/notifications");
    else if (tab === "Course Plan") navigate("/learning_plan");
    else if (tab === "Learning Progress") navigate("/learning-progress");
  };

  const handleSubMenuClick = (subTitle) => {
    if (subTitle === "Create Post") onOpen();
    else if (subTitle === "Learn Tricks") setIsCreateReelModalOpen(true);
    else if (subTitle === "Catchup") navigate("/create-story");
    setShowCreateDropdown(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-72 bg-white border-r border-gray-100 flex flex-col shadow-sm">
      {/* Top - Logo */}
      <div className="p-6 border-b border-gray-100">
        <img src={logo} alt="Logo" className="w-full max-w-[180px] mx-auto" />
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-2 px-4">
        {mainu.map((item, index) => (
          <div key={index} >
            <div
              onClick={() => {
                if (item.title === "Create") {
                  setShowCreateDropdown(!showCreateDropdown);
                } else {
                  handleTabClick(item.title);
                }
              }}
              className={`flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                activeTab === item.title
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <div className="text-2xl">
                {activeTab === item.title ? item.activeIcon : item.icon}
              </div>
              <span className="text-[15px]">{item.title}</span>
            </div>

            {/* Show Submenu if available and active */}
            {item.subMenu && showCreateDropdown && item.title === "Create" && (
              <div className="ml-12 mt-2 space-y-2 py-2 bg-gray-50 rounded-xl shadow-sm">
                {item.subMenu.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    onClick={() => handleSubMenuClick(subItem.title)}
                    className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                      activeTab === item.title
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {subItem.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom - Logout */}
      <div className="p-2 border-t border-gray-100 mt-auto">
        <div
          onClick={handleLogout}
          className="flex items-center gap-4 p-1 rounded-xl cursor-pointer bg-red-50 hover:bg-red-100 text-red-600 transition-all duration-200"
        >
          <div className="text-2xl">🚪</div>
          <span className="text-[15px] font-semibold">Log Out</span>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchBoxVisible && (
        <div className="absolute inset-0 bg-white z-10">
          <SearchComponent setIsSearchVisible={setIsSearchBoxVisible} />
        </div>
      )}

      {/* Create Post Modal */}
      <CreatePostModal onClose={onClose} isOpen={isOpen} />

      {/* Create Reel Modal */}
      <CreateReelModal
        onClose={() => setIsCreateReelModalOpen(false)}
        isOpen={isCreateReelModalOpen}
      />
    </div>
  );
};

export default Sidebar;
