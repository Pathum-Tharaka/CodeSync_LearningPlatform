import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { isCommentLikedByUser, timeDifference } from "../../Config/Logic";
import { deleteComment, likeComment } from "../../Redux/Comment/Action";
import { BsEmojiSmile, BsPencil, BsThreeDots } from "react-icons/bs";
import EditCommentModal from "./EditCommentModal";
import { MdDelete } from "react-icons/md";
import { editComment } from "../../Redux/Comment/Action";


const CommentCard = ({ comment }) => {
  const [isCommentLiked, setIsCommentLike] = useState(false);
  const { user } = useSelector((store) => store);
  const [commentLikes, setCommentLikes] = useState(0);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("token");
  const [isEditCommentInputOpen, setIsEditCommentInputOpen] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    setCommentContent(comment?.content);
  }, [comment]);

  const handleLikeComment = () => {
    dispatch(likeComment({ jwt, commentId: comment.id }));
    setIsCommentLike(true);
    setCommentLikes(commentLikes + 1);
  };

  const handleUnLikeComment = () => {
    dispatch(likeComment({ jwt, commentId: comment.id }));
    setIsCommentLike(false);
    setCommentLikes(commentLikes - 1);
  };

  useEffect(() => {
    setCommentLikes(comment?.likedByUsers?.length);
  }, [comment]);

  useEffect(() => {
    setIsCommentLike(isCommentLikedByUser(comment, user.reqUser?.id));
  }, [comment, user.reqUser]);

  const handleClickOnEditComment = () => {
    setIsEditCommentInputOpen(!isEditCommentInputOpen);
  };
  const handleCommnetInputChange = (e) => {
    setCommentContent(e.target.value);
  };
  const handleDeleteComment = () => {
    dispatch(deleteComment({ commentId: comment.id, jwt }));
  };

  const handleEditComment = (e) => {
    if(e.key==="Enter"){
      dispatch(
      editComment({ data: { id: comment?.id, content: commentContent }, jwt })
     
    );
     setIsEditCommentInputOpen(false);
     setCommentContent("")
    }
    
  };
  return (
    <div>
      <div className="reqUser flex justify-between items-center py-5">
        <div className="flex items-center">
          <div className="">
            <img
              className="w-9 h-9 rounded-full"
              src={
                comment?.userDto.userImage ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt=""
            />
          </div>
          <div className="ml-3">
            <p>
              <span className="font-semibold"> {comment.userDto.username}</span>
              <span className="ml-2">{comment.content}</span>
            </p>
            <div className="flex items-center space-x-3 text-xs opacity-60 pt-2">
              <span>{timeDifference(comment?.createdAt)}</span>
              {commentLikes > 0 && <span>{commentLikes} like</span>}
              {user?.reqUser?.id === comment?.userDto?.id && (
                <>
                  <BsPencil
                    className="cursor-pointer"
                    onClick={handleClickOnEditComment}
                  />
                  <MdDelete
                    className="cursor-pointer "
                    onClick={handleDeleteComment}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        {isCommentLiked ? (
          <AiFillHeart
            onClick={handleUnLikeComment}
            className="text-xs hover:opacity-50 cursor-pointer text-red-600"
          />
        ) : (
          <AiOutlineHeart
            onClick={handleLikeComment}
            className="text-xs hover:opacity-50 cursor-pointer "
          />
        )}
      </div>
      {isEditCommentInputOpen && (
        <div>
          <input
            className=" outline-none border-b border-black text-sm"
            placeholder="Add Comment..."
            type="text"
            onKeyPress={handleEditComment}
            onChange={handleCommnetInputChange}
            value={commentContent}
          />
        </div>
      )}
    </div>
  );
};

export default CommentCard;
