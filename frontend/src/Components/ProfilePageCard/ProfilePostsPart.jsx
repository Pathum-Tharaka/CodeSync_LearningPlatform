import React, { useEffect, useState } from "react";
import { BsBookmark } from "react-icons/bs";
import { GrTable } from "react-icons/gr";
import { RiVideoFill, RiVideoLine } from "react-icons/ri";
import { BiBookmark, BiUserPin } from "react-icons/bi";
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import ReqUserPostCard from "./ReqUserPostCard";
import { useDispatch, useSelector } from "react-redux";
import { reqUserPostAction, savePostAction } from "../../Redux/Post/Action";

const ProfilePostsPart = ({user}) => {
  const [activeTab, setActiveTab] = useState("Post");
  const { post} = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const tabs = [
    {
      tab: "Post",
      icon: <AiOutlineTable className="text-xs" />,
      activeTab: "",
    },
    { tab: "Reels", icon: <RiVideoLine className="text-xs" />, activeTab: "" },
    { tab: "Saved", icon: <BiBookmark className="text-xs" />, activeTab: "" },
    {
      tab: "Tagged",
      icon: <AiOutlineUser className="text-xs" />,
      activeTab: "",
    },
  ];

  useEffect(() => {
    const data = {
      jwt: token,
      userId: user?.id,
    };
    dispatch(reqUserPostAction(data));
  }, [user,post.createdPost]);

  return (
    <div className="w-full">
      <div className="flex space-x-14 border-t relative">
        {tabs.map((item) => (
          <div
            key={item.tab}
            onClick={() => setActiveTab(item.tab)}
            className={`${
              item.tab === activeTab ? "border-t border-black" : "opacity-60"
            } flex items-center cursor-pointer py-2 text-sm`}
          >
            <p>{item.icon}</p>
            <p className="ml-1 text-xs">{item.tab}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-4">
        {activeTab === "Post" && post.reqUserPost?.length > 0 && (
          <div className="grid grid-cols-3 gap-1">
            {post.reqUserPost.map((item, index) => (
              <div key={index} className="aspect-square">
                <ReqUserPostCard post={item} />
              </div>
            ))}
          </div>
        )}
        
        {activeTab === "Saved" && user?.savedPost?.length > 0 && (
          <div className="grid grid-cols-3 gap-1">
            {user.savedPost.map((item, index) => (
              <div key={index} className="aspect-square">
                <ReqUserPostCard post={item} />
              </div>
            ))}
          </div>
        )}
        
        {activeTab === "Reels" && (
          <div className="text-center py-10 text-gray-500">
            No reels available
          </div>
        )}
        
        {activeTab === "Tagged" && (
          <div className="text-center py-10 text-gray-500">
            No tagged posts available
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePostsPart;
