import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  BsBookmark,
  BsBookmarkFill,
  BsEmojiSmile,
  BsPencil,
  BsThreeDots,
} from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { timeDifference } from "../../Config/Logic";
import { createComment, getAllComments } from "../../Redux/Comment/Action";
import { findPostByIdAction } from "../../Redux/Post/Action";
import CommentCard from "./CommentCard";
import "./CommentModal.css";

const CommentModal = ({
  isOpen,
  onClose,
  onOpen,
  postData,
  handleLikePost,
  handleUnLikePost,
  handleSavePost,
  handleUnSavePost,
  isPostLiked,
  isSaved,
}) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("token");
  const { post, comments, user } = useSelector((store) => store);
  const [commentContent, setCommentContent] = useState("");
  const { postId } = useParams();
  const navigate = useNavigate();
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // console.log("coments ---- ",comments)

  useEffect(() => {
    if (postId) {
      dispatch(
        findPostByIdAction({
          jwt,
          postId,
        })
      );
      dispatch(getAllComments({jwt,postId}))
    }
  }, [postId, comments?.createdComment, comments?.deletedComment, comments?. updatedComment]);

  const handleAddComment = () => {
    const data = {
      jwt,
      postId,
      data: {
        content: commentContent,
      },
    };
    console.log("comment content ", commentContent);
    dispatch(createComment(data));
    setCommentContent("");
  };

  const handleCommnetInputChange = (e) => {
    setCommentContent(e.target.value);
  };
  const handleOnEnterPress = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    } else return;
  };

  const handleClose = () => {
    onClose();
    navigate("/");
  };

  
  return (
    <div>
      <Modal size={"4xl"} onClose={handleClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <div className="flex h-[75vh]">
              <div className="w-[45%] flex flex-col justify-center relative bg-black">
                {post.singlePost?.mediaUrls?.map((url, index) => (
                  <div 
                    key={index} 
                    className={`${index === currentMediaIndex ? "block" : "hidden"} h-full flex items-center justify-center`}
                  >
                    {post.singlePost?.mediaTypes?.[index] === "video" ? (
                      <video
                        src={url}
                        controls
                        className="max-h-[75vh] w-full object-contain"
                        playsInline
                      />
                    ) : (
                      <img
                        className="max-h-[75vh] w-full object-contain"
                        src={url}
                        alt={`Post media ${index + 1}`}
                      />
                    )}
                  </div>
                ))}
                {post.singlePost?.mediaUrls?.length > 1 && (
                  <>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                      {post.singlePost.mediaUrls.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentMediaIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                            index === currentMediaIndex ? "bg-white" : "bg-gray-500"
                          }`}
                          aria-label={`Go to media ${index + 1}`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentMediaIndex(prev => 
                        prev === 0 ? post.singlePost.mediaUrls.length - 1 : prev - 1
                      )}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setCurrentMediaIndex(prev => 
                        prev === post.singlePost.mediaUrls.length - 1 ? 0 : prev + 1
                      )}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                    >
                      →
                    </button>
                  </>
                )}
              </div>
              <div className="w-[55%] pl-10 relative">
                <div className="reqUser flex justify-between items-center py-5">
                  <div className="flex items-center">
                    <div className="">
                      <img
                        className="w-9 h-9 rounded-full"
                        src={
                          user.reqUser?.image ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p>{post?.singlePost?.user?.name}</p>
                      <p>{post?.singlePost?.user?.username}</p>
                    </div>
                  </div>
                  <BsThreeDots/>
                </div>
                <hr />

                <div className="comments ">
                  {comments.comments?.length > 0 &&
                    comments.comments?.map((item) => (
                      <CommentCard comment={item} />
                    ))}
                </div>

                <div className=" absolute bottom-0 w-[90%]">
                  <div className="flex justify-between items-center w-full mt-5">
                    <div className="flex items-center space-x-2 ">
                      {isPostLiked ? (
                        <AiFillHeart
                          onClick={handleUnLikePost}
                          className="text-2xl hover:opacity-50 cursor-pointer text-red-600"
                        />
                      ) : (
                        <AiOutlineHeart
                          onClick={handleLikePost}
                          className="text-2xl hover:opacity-50 cursor-pointer "
                        />
                      )}

                      <FaRegComment className="text-xl hover:opacity-50 cursor-pointer" />
                      <RiSendPlaneLine className="text-xl hover:opacity-50 cursor-pointer" />
                    </div>
                    <div className="cursor-pointer">
                      {isSaved ? (
                        <BsBookmarkFill
                          onClick={() => handleUnSavePost(post.singlePost?.id)}
                          className="text-xl"
                        />
                      ) : (
                        <BsBookmark
                          onClick={() => handleSavePost(post.singlePost?.id)}
                          className="text-xl hover:opacity-50 cursor-pointer"
                        />
                      )}
                    </div>
                  </div>
                  {post.singlePost?.likedByUsers?.length > 0 && (
                    <p className="text-sm font-semibold py-2">
                      {post.singlePost?.likedByUsers?.length} likes{" "}
                    </p>
                  )}
                  <p className="opacity-70 pb-5">
                    {timeDifference(post?.singlePost?.createdAt)}
                  </p>
                  <div className=" flex items-center ">
                    <BsEmojiSmile className="mr-3 text-xl" />
                    <input
                      className="commentInput w-[70%]"
                      placeholder="Add Comment..."
                      type="text"
                      onKeyPress={handleOnEnterPress}
                      onChange={handleCommnetInputChange}
                      value={commentContent}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CommentModal;
