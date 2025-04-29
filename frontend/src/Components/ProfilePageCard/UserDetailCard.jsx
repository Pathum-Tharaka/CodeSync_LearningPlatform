import React, { useEffect, useState } from "react";
import { TbCircleDashed } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followUserAction, unFollowUserAction } from "../../Redux/User/Action";
import { FiMessageCircle, FiBell } from "react-icons/fi";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";

const UserDetailCard = ({ user, isRequser, isFollowing }) => {
  const token = localStorage.getItem("token");
  const { post } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFollow, setIsFollow] = useState(false);
  const [isHoveringFollow, setIsHoveringFollow] = useState(false);
  const [followerCount, setFollowerCount] = useState(user?.follower?.length || 0);

  const goToAccountEdit = () => {
    navigate("/account/edit");
  };

  const data = {
    jwt: token,
    userId: user?.id,
  };

  const handleFollowUser = () => {
    dispatch(followUserAction(data));
    setIsFollow(true);
    setFollowerCount(prev => prev + 1); // Increment follower count
  };

  const handleUnFollowUser = () => {
    dispatch(unFollowUserAction(data));
    setIsFollow(false);
    setFollowerCount(prev => prev - 1); // Decrement follower count
  };

  useEffect(() => {
    setIsFollow(isFollowing);
    setFollowerCount(user?.follower?.length || 0);
  }, [isFollowing, user]);

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover border-2 border-gray-200 shadow-sm"
            src={
              user?.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt={`${user?.username}'s profile`}
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 w-full space-y-4">
          {/* Username and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <h1 className="text-xl font-semibold">{user?.username}</h1>
            
            <div className="flex items-center gap-3">
              {isRequser ? (
                <button
                  onClick={goToAccountEdit}
                  className="px-4 py-1.5 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Edit Profile
                </button>
              ) : isFollow ? (
                <button
                  onMouseEnter={() => setIsHoveringFollow(true)}
                  onMouseLeave={() => setIsHoveringFollow(false)}
                  onClick={handleUnFollowUser}
                  className="px-4 py-1.5 text-sm font-medium bg-gray-100 hover:bg-red-50 hover:text-red-500 rounded-md transition-colors flex items-center gap-1"
                >
                  {isHoveringFollow ? (
                    <>
                      <RiUserUnfollowLine /> Unfollow
                    </>
                  ) : (
                    "Following"
                  )}
                </button>
              ) : (
                <button
                  onClick={handleFollowUser}
                  className="px-4 py-1.5 text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 rounded-md transition-colors flex items-center gap-1"
                >
                  <RiUserFollowLine /> Follow
                </button>
              )}

              <button
                className="p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={() => navigate(isRequser ? "/notifications" : "/direct/inbox")}
              >
                {isRequser ? (
                  <FiBell className="text-lg" />
                ) : (
                  <FiMessageCircle className="text-lg" />
                )}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-1">
              <span className="font-semibold">{post?.reqUserPost?.length || 0}</span>
              <span className="text-gray-600">posts</span>
            </div>
            <button 
              className="flex items-center gap-1 hover:underline cursor-pointer"
              onClick={() => navigate(`/${user?.username}/followers`)}
            >
              <span className="font-semibold">{followerCount}</span>
              <span className="text-gray-600">followers</span>
            </button>
            <button 
              className="flex items-center gap-1 hover:underline cursor-pointer"
              onClick={() => navigate(`/${user?.username}/following`)}
            >
              <span className="font-semibold">{user?.following?.length || 0}</span>
              <span className="text-gray-600">following</span>
            </button>
          </div>

          {/* Bio */}
          <div className="space-y-1">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-gray-800 text-sm">{user?.bio || "No bio yet"}</p>
            {user?.website && (
              <a
                href={user.website.startsWith('http') ? user.website : `https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                {user.website}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailCard;