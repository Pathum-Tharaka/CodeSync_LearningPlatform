import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeRight from "../../Components/HomeRight/HomeRight";
import PostCard from "../../Components/Post/PostCard/PostCard";
// import PostCard from "../../Components/PostCard/PostCard";
import StoryCircle from "../../Components/Story/StoryCircle/StoryCircle";

import { hasStory, suggetions, timeDifference } from "../../Config/Logic";
import { getAllPostsAction } from "../../Redux/Post/Action";
import { findByUserIdsAction, getUserProfileAction } from "../../Redux/User/Action";
import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const [userIds, setUserIds] = useState([]);
  const token = localStorage.getItem("token");
  const reqUser = useSelector(store => store.user.reqUser);
  const { user, post } = useSelector((store) => store);
  const [suggestedUser, setSuggestedUser] = useState([]);
  const navigate = useNavigate();

  // console.log("timestamp - :",timeDifference("2023-04-01T08:59:00.959826"))

  useEffect(() => {
    dispatch(getUserProfileAction(token));
  }, [token]);

  useEffect(() => {
    if (reqUser) {
      const newIds = reqUser?.following?.map((user) => user.id);
      setUserIds([reqUser?.id, ...newIds]);
      setSuggestedUser(suggetions(reqUser));
    }
  }, [reqUser]);

  useEffect(() => {
    if (token) {
      dispatch(getAllPostsAction({ jwt: token }));
    }
  }, [token, post.createdPost, post.deletedPost, post.updatedPost]);

  const storyUsers = hasStory(user.userByIds);

  // Sort posts by createdAt in descending order
  const sortedPosts = post.posts?.slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className=" ">
     

       <div className="mt-10 flex w-[100%] justify-center">
        <div className="flex flex-col w-[100%] px-10 items-center">
          
          <div className="space-y-10 postsBox w-full">
            {sortedPosts?.length>0 && sortedPosts?.map((item) => (
              <PostCard
                key={item.id}
                userProfileImage={
                  item.user.userImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                username={item?.user?.username}
                location={item?.location}
                postImage={item?.image}
                
                createdAt={timeDifference(item?.createdAt)}
                postId={item?.id}
                post={item}
              />
            ))}
          </div>
        </div>
        <div className="w-[50%] pr-10">
  <div className="sticky top-0 h-screen flex flex-col justify-between">
    <HomeRight suggestedUser={suggestedUser} />
  </div>
</div>

      </div> 
    </div>
  );
};

export default HomePage;
