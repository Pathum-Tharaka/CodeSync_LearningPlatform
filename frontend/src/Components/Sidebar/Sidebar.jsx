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
  const [showCreateDropdown, setShowCreateDropdown] = useState(false); // Manage dropdown visibility

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
    // For "Create", we don't navigate immediately (handled separately)
  };

  const handleSubMenuClick = (subTitle) => {
    if (subTitle === "Create Post") onOpen(); // Open Create Post Modal
    else if (subTitle === "Learn Tricks") setIsCreateReelModalOpen(true); // Open Create Reel Modal
    else if (subTitle === "Catchup") navigate("/create-story"); // Navigate to create story page
    setShowCreateDropdown(false); // Close dropdown after selection
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sticky top-0 h-screen w-64 bg-white border-r flex flex-col justify-between overflow-y-auto">
      {/* Top - Logo */}
      <div className="flex-1 flex flex-col">
        <div className="p-2 border-b">
          <img src={logo} alt="Logo" className="w-full max-w-[150px] mx-auto" />
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          {mainu.map((item, index) => (
            <div key={index} className="mb-1">
              <div
                onClick={() => {
                  if (item.title === "Create") {
                    setShowCreateDropdown(!showCreateDropdown); // Toggle dropdown visibility
                  } else {
                    handleTabClick(item.title);
                  }
                }}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
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

              {/* Show Submenu if available and active */}
              {item.subMenu && showCreateDropdown && item.title === "Create" && (
                <div className="ml-8 mt-1 space-y-2 pt-2 pb-3 bg-gray-50 rounded-lg shadow-lg">
                  {item.subMenu.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      onClick={() => handleSubMenuClick(subItem.title)}
                      className={`flex items-center ml-4  p-1 rounded-lg cursor-pointer transition-colors ${
                        activeTab === item.title
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}                    >
                      {subItem.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom - Logout */}
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
