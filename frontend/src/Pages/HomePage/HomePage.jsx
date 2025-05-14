import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeRight from "../../Components/HomeRight/HomeRight";
import PostCard from "../../Components/Post/PostCard/PostCard";
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

  // Sort posts by createdAt in descending order
  const sortedPosts = post.posts?.slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Feed */}
          <div className="lg:w-2/3">
            {/* Posts Feed */}
            <div className="space-y-6">
              {sortedPosts?.length > 0 ? (
                sortedPosts?.map((item) => (
                  <div key={item.id} className="transform transition-all duration-200 hover:scale-[1.01]">
                    <PostCard
                      userProfileImage={
                        item.user.userImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      username={item?.user?.username}
                      location={item?.location}
                      mediaUrls={item?.mediaUrls || [item?.image]}
                      mediaTypes={item?.mediaTypes || ['image']}
                      createdAt={timeDifference(item?.createdAt)}
                      postId={item?.id}
                      post={item}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-600">No posts yet</h3>
                  <p className="text-gray-500 mt-2">Follow some users to see their posts here</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Suggestions */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <HomeRight suggestedUser={suggestedUser} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
