import React from "react";
import { BsDot } from "react-icons/bs";
import { useSelector } from "react-redux";
import SuggestionsUserCard from "./SuggestionsUserCard";

const HomeRight = ({ suggestedUser }) => {
  const { user } = useSelector((store) => store);

  return (
    <div className="p-4">
      {/* Profile Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={
              user.reqUser?.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="Profile"
          />
          <div className="ml-3">
            <p className="font-semibold">{user.reqUser?.username}</p>
            <p className="text-gray-500 text-sm">{user.reqUser?.username}</p>
          </div>
        </div>
        <button className="text-blue-600 font-semibold text-sm hover:underline">
          Switch
        </button>
      </div>

      {/* Suggestions Header */}
      <div className="flex justify-between items-center mb-4">
        <p className="font-semibold text-gray-600 text-sm">
          Suggestions for you
        </p>
        <button className="text-xs font-semibold text-gray-800 hover:underline">
          View All
        </button>
      </div>

      {/* Suggested Users */}
      <div className="space-y-5">
        {suggestedUser.map((item, index) => (
          <SuggestionsUserCard
            key={index}
            image={
              item.userImage ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            username={item.username}
            description={"Follows you"}
          />
        ))}
      </div>

      {/* Footer Links */}
      <div className="opacity-60 text-xs flex flex-wrap items-center mt-10 leading-5">
        {[
          "About",
          "Help",
          "Press",
          "API",
          "Jobs",
          "Privacy",
          "Terms",
          "Locations",
          "Language",
          "English",
          "Meta",
          "Verified",
        ].map((item, index) => (
          <React.Fragment key={index}>
            <span className="hover:underline cursor-pointer">{item}</span>
            {index !== 11 && <BsDot />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default HomeRight;
