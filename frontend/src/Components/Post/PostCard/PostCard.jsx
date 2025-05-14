import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { createNotificationAction } from "../../../Redux/Notification/Action"; 
import {
  BsBookmark,
  BsBookmarkFill,
  BsDot,
  BsEmojiSmile,
  BsThreeDots,
} from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  isPostLikedByUser,
  isReqUserPost,
  isSavedPost,
  timeDifference,
} from "../../../Config/Logic";
import { createComment } from "../../../Redux/Comment/Action";
import {
  deletePostAction,
  likePostAction,
  savePostAction,
  unLikePostAction,
  unSavePostAction,
} from "../../../Redux/Post/Action";
import CommentModal from "../../Comment/CommentModal";
import "./PostCard.css";
import EditPostModal from "../Create/EditPostModal";
import { IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const PostCard = ({
  userProfileImage,
  username,
  location,
  post,
  createdAt,
}) => {
  const [commentContent, setCommentContent] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);
  const [isSaved, setIsSaved] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openEditPostModal, setOpenEditPostModal] = useState(false);

  const handleCommentInputChange = (e) => {
    setCommentContent(e.target.value);
  };

  const [numberOfLikes, setNumberOfLike] = useState(0);

  const data = {
    jwt: token,
    postId: post.id,
  };

  const handleAddComment = () => {
    const data = {
      jwt: token,
      postId: post.id,
      data: {
        content: commentContent,
      },
    };
    dispatch(createComment(data));
    setCommentContent("");
    
    // Create notification for comment
    if (post.user.id !== user.reqUser.id) { // Only create notification if not own post
      const notification = {
        message: `${user.reqUser.username} commented: ${commentContent}`,
        type: "COMMENT",
        postId: post.id
      };
      dispatch(createNotificationAction(notification, token));
    }
  };

  const handleOnEnterPress = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    }
  };

  const handleLikePost = () => {
    dispatch(likePostAction(data));
    setIsPostLiked(true);
    setNumberOfLike(numberOfLikes + 1);
    
  
    if (post.user.id !== user.reqUser.id) { 
      const notification = {
        message: `${user.reqUser.username} liked your post`,
        type: "LIKE",
        postId: post.id
      };
      dispatch(createNotificationAction(notification, token));
    }
  };

  const handleUnLikePost = () => {
    dispatch(unLikePostAction(data));
    setIsPostLiked(false);
    setNumberOfLike(numberOfLikes - 1);
  };

  const handleSavePost = () => {
    dispatch(savePostAction(data));
    setIsSaved(true);
  };

  const handleUnSavePost = () => {
    dispatch(unSavePostAction(data));
    setIsSaved(false);
  };

  const handleNavigate = (username) => {
    navigate(`/${username}`);
  };

  const handleNextMedia = () => {
    setCurrentMediaIndex(prev => 
      prev === post.mediaUrls.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevMedia = () => {
    setCurrentMediaIndex(prev => 
      prev === 0 ? post.mediaUrls.length - 1 : prev - 1
    );
  };

  const isVideo = (url) => {
    return url.match(/\.(mp4|webm|ogg)$/i);
  };

  useEffect(() => {
    setIsSaved(isSavedPost(user.reqUser, post.id));
    setIsPostLiked(isPostLikedByUser(post, user.reqUser?.id));
    setNumberOfLike(post?.likedByUsers?.length);
  }, [user.reqUser, post]);

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleWindowClick = (event) => {
    if (!event.target.matches(".dots")) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  const handleDeletePost = (postId) => {
    const data = {
      jwt: token,
      postId,
    };
    dispatch(deletePostAction(data));
  };

  const isOwnPost = isReqUserPost(post, user.reqUser);

  const handleOpenCommentModal = () => {
    navigate(`/p/${post.id}`);
    onOpen();
  };

  const handleCloseEditPostModal = () => {
    setOpenEditPostModal(false);
  };

  const handleOpenEditPostModal = () => {
    setOpenEditPostModal(true);
  };

  // Media Slider Section
  const renderMedia = (url, type) => {
    if (type === "video") {
      return (
        <video
          src={url}
          controls
          className="w-full"
          playsInline
        />
      );
    }
    return (
      <img
        src={url}
        alt={`Post media ${currentMediaIndex + 1}`}
        className="w-full"
      />
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Post Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center space-x-3">
          <img
            className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500"
            src={
              post.user.userImage ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt=""
          />
          <div>
            <p className="font-semibold text-sm flex items-center">
              <span
                onClick={() => handleNavigate(username)}
                className="cursor-pointer hover:text-blue-500 transition-colors"
              >
                {post?.user?.username}
              </span>
              <span className="opacity-50 flex items-center">
                <BsDot />
                {timeDifference(post?.createdAt)}
              </span>
            </p>
            <p className="text-sm text-gray-500">{location}</p>
          </div>
        </div>
        <div className="relative">
          <BsThreeDots 
            onClick={handleClick} 
            className="dots text-xl cursor-pointer hover:text-blue-500 transition-colors" 
          />
          {isOwnPost && (
            <div className="dropdown-content">
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={handleOpenEditPostModal}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Media Section */}
      <div className="relative">
        {post.mediaUrls?.map((url, index) => (
          <div
            key={index}
            className={`${index === currentMediaIndex ? "block" : "hidden"}`}
          >
            {renderMedia(url, post.mediaTypes?.[index])}
          </div>
        ))}

        {post.mediaUrls?.length > 1 && (
          <>
            <button
              onClick={handlePrevMedia}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={handleNextMedia}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
            >
              <ChevronRightIcon />
            </button>
            <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
              {post.mediaUrls?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMediaIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentMediaIndex ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  aria-label={`Go to media ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Actions Section */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            {isPostLiked ? (
              <AiFillHeart
                onClick={handleUnLikePost}
                className="text-2xl cursor-pointer text-red-500 hover:text-red-600 transition-colors"
              />
            ) : (
              <AiOutlineHeart
                onClick={handleLikePost}
                className="text-2xl cursor-pointer hover:text-red-500 transition-colors"
              />
            )}
            <FaRegComment
              onClick={handleOpenCommentModal}
              className="text-xl cursor-pointer hover:text-[#3B82F6] transition-colors"
            />
            <RiSendPlaneLine className="text-xl cursor-pointer hover:text-[#3B82F6] transition-colors" />
          </div>
          <div>
            {isSaved ? (
              <BsBookmarkFill
                onClick={handleUnSavePost}
                className="text-xl cursor-pointer text-[#3B82F6] hover:text-[#2563EB] transition-colors"
              />
            ) : (
              <BsBookmark
                onClick={handleSavePost}
                className="text-xl cursor-pointer hover:text-[#3B82F6] transition-colors"
              />
            )}
          </div>
        </div>

        {/* Likes Count */}
        {numberOfLikes > 0 && (
          <p className="font-semibold text-sm mb-2">{numberOfLikes} likes</p>
        )}

        {/* Caption */}
        <p className="text-sm mb-2">
          <span className="font-semibold mr-2">{post?.user?.username}</span>
          {post.caption}
        </p>

        {/* Comments Preview */}
        {post?.comments?.length > 0 && (
          <button
            onClick={handleOpenCommentModal}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            View all {post?.comments?.length} comments
          </button>
        )}

        {/* Comment Input */}
        <div className="mt-4 flex items-center space-x-2">
          <BsEmojiSmile className="text-gray-500" />
          <input
            onKeyPress={handleOnEnterPress}
            onChange={handleCommentInputChange}
            value={commentContent}
            className="flex-1 border-none focus:ring-0 text-sm"
            type="text"
            placeholder="Add a comment..."
          />
          {commentContent && (
            <button
              onClick={handleAddComment}
              className="text-[#3B82F6] font-semibold text-sm hover:text-[#2563EB] transition-colors"
            >
              Post
            </button>
          )}
        </div>
      </div>

      <EditPostModal
        onClose={handleCloseEditPostModal}
        isOpen={openEditPostModal}
        onOpen={handleOpenEditPostModal}
        post={post}
      />

      <CommentModal
        handleLikePost={handleLikePost}
        handleSavePost={handleSavePost}
        handleUnSavePost={handleUnSavePost}
        handleUnLikePost={handleUnLikePost}
        isPostLiked={isPostLiked}
        isSaved={isSaved}
        postData={post}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </div>
  );
};

export default PostCard;