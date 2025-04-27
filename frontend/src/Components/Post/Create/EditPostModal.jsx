import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";

import React, { useEffect, useState, useRef } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import "./CreatePostModal.css";
import { GoLocation } from "react-icons/go";
import { GrEmoji } from "react-icons/gr";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { createPost, findPostByIdAction } from "../../../Redux/Post/Action";
import { uploadToCloudinary } from "../../../Config/UploadToCloudinary";
import CommentModal from "../../Comment/CommentModal";
import SpinnerCard from "../../Spinner/Spinner";
import { useParams } from "react-router-dom";
import { editPOst } from "../../../Redux/Post/Action";
import { useToast } from "@chakra-ui/react";


const EditPostModal = ({ isOpen, onClose, post }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const fileInputRef = useRef(null);

  const [postData, setPostData] = useState({
    caption: "",
    location: "",
    mediaUrls: [],
    id: null
  });

  useEffect(() => {
    if (post) {
      setPostData({
        caption: post.caption || "",
        location: post.location || "",
        mediaUrls: post.mediaUrls || [],
        id: post.id
      });
    }
  }, [post]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setLoading(true);
        try {
          const imageUrl = await uploadToCloudinary(file);
          if (imageUrl) {
            setPostData(prev => ({
              ...prev,
              mediaUrls: [imageUrl]
            }));
            toast({
              title: "Image uploaded successfully",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          } else {
            throw new Error("Failed to get image URL");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          toast({
            title: "Failed to upload image",
            description: "Please try again",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } finally {
          setLoading(false);
        }
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleSubmit = () => {
    if (!postData.id) return;

    const data = {
      jwt: token,
      data: {
        id: postData.id,
        caption: postData.caption,
        location: postData.location,
        mediaUrls: postData.mediaUrls
      }
    };

    dispatch(editPOst(data));
    onClose();
  };

  return (
    <Modal size={"4xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <div className="flex justify-between py-1 px-10 items-center">
          <p className="font-semibold">Edit Post</p>
          <Button
            onClick={handleSubmit}
            colorScheme="blue"
            size={"sm"}
            isLoading={loading}
            loadingText="Updating..."
          >
            Update
          </Button>
        </div>

        <hr className="hrLine" />

        <ModalBody>
          <div className="modalBodyBox flex h-[70vh] justify-between">
            <div className="w-[50%] flex flex-col justify-center items-center relative">
              <div 
                className="w-full h-full flex items-center justify-center relative group cursor-pointer"
                onClick={handleImageClick}
              >
                {postData.mediaUrls?.length > 0 ? (
                  <>
                    <img
                      className="max-h-[70vh] object-contain"
                      src={postData.mediaUrls[0]}
                      alt="post"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <p className="text-white text-center">Click to change image</p>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    <FaPhotoVideo className="text-3xl mb-2" />
                    <p>Click here to upload photo</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden"
                />
              </div>
            </div>
            <div className="w-[1px] border h-full"></div>
            <div className="w-[50%]">
              <div className="flex items-center px-2">
                <img
                  className="w-7 h-7 rounded-full"
                  src={user?.reqUser?.image || "https://cdn.pixabay.com/photo/2023/02/28/03/42/ibex-7819817_640.jpg"}
                  alt=""
                />
                <p className="font-semibold ml-4">{user?.reqUser?.username}</p>
              </div>
              <div className="px-2">
                <textarea
                  className="captionInput"
                  placeholder="Write a caption..."
                  name="caption"
                  rows="8"
                  value={postData.caption}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between px-2">
                <GrEmoji />
                <p className="opacity-70">{postData.caption?.length}/2,200</p>
              </div>
              <hr />
              <div className="p-2 flex justify-between items-center">
                <input
                  className="locationInput"
                  type="text"
                  placeholder="Add location"
                  name="location"
                  value={postData.location}
                  onChange={handleInputChange}
                />
                <GoLocation />
              </div>
              <hr />
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditPostModal;
