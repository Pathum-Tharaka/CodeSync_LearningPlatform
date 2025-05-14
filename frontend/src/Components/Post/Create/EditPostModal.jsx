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
import { Button, IconButton } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { createPost, findPostByIdAction } from "../../../Redux/Post/Action";
import { uploadToCloudinary } from "../../../Config/UploadToCloudinary";
import CommentModal from "../../Comment/CommentModal";
import SpinnerCard from "../../Spinner/Spinner";
import { useParams } from "react-router-dom";
import { editPOst } from "../../../Redux/Post/Action";
import { useToast } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const EditPostModal = ({ isOpen, onClose, post }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const fileInputRef = useRef(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const [postData, setPostData] = useState({
    caption: "",
    location: "",
    mediaUrls: [],
    mediaTypes: [],
    id: null
  });

  useEffect(() => {
    if (post) {
      setPostData({
        caption: post.caption || "",
        location: post.location || "",
        mediaUrls: post.mediaUrls || [],
        mediaTypes: post.mediaTypes || [],
        id: post.id
      });
    }
  }, [post]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMediaClick = () => {
    fileInputRef.current?.click();
  };

  const handleMediaChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setLoading(true);
    try {
      const uploadPromises = files.map(async file => {
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');
        
        if (!isImage && !isVideo) {
          throw new Error("Please select only image or video files");
        }
        
        if (isVideo && file.size > 100 * 1024 * 1024) {
          throw new Error("Video size should be less than 100MB");
        }

        const url = await uploadToCloudinary(file);
        const type = isImage ? "image" : "video";
        return { url, type };
      });

      const results = await Promise.all(uploadPromises);
      const validResults = results.filter(result => result.url);

      setPostData(prev => ({
        ...prev,
        mediaUrls: [...prev.mediaUrls, ...validResults.map(r => r.url)],
        mediaTypes: [...prev.mediaTypes, ...validResults.map(r => r.type)]
      }));

      toast({
        title: "Media uploaded successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error uploading media:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNextMedia = () => {
    setCurrentMediaIndex(prev => 
      prev === postData.mediaUrls.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevMedia = () => {
    setCurrentMediaIndex(prev => 
      prev === 0 ? postData.mediaUrls.length - 1 : prev - 1
    );
  };

  const handleSubmit = () => {
    if (!postData.id) return;

    const data = {
      jwt: token,
      data: {
        id: postData.id,
        caption: postData.caption,
        location: postData.location,
        mediaUrls: postData.mediaUrls,
        mediaTypes: postData.mediaTypes
      }
    };

    dispatch(editPOst(data));
    onClose();
  };

  const renderMedia = (url, type) => {
    if (type === "video") {
      return (
        <video
          src={url}
          controls
          className="max-h-[70vh] w-full object-contain"
        />
      );
    }
    return (
      <img
        src={url}
        alt="post"
        className="max-h-[70vh] w-full object-contain"
      />
    );
  };

  return (
    <Modal size={"5xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="rounded-xl shadow-xl overflow-hidden">
        <div className="flex justify-between py-4 px-6 border-b">
          <h2 className="text-xl font-bold">Edit Post</h2>
          <Button
            onClick={handleSubmit}
            colorScheme="blue"
            size="md"
            isLoading={loading}
            loadingText="Updating..."
          >
            Update
          </Button>
        </div>

        <ModalBody className="p-0">
          <div className="flex h-[70vh]">
            {/* Left Side: Media Preview */}
            <div className="w-2/3 relative bg-gray-50">
              {postData.mediaUrls?.length > 0 ? (
                <div className="relative w-full h-full">
                  {renderMedia(
                    postData.mediaUrls[currentMediaIndex],
                    postData.mediaTypes[currentMediaIndex]
                  )}

                  {/* Add Media Button */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer inline-block bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition"
                    >
                      Add More Media
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      accept="image/*,video/*"
                      multiple
                      onChange={handleMediaChange}
                      ref={fileInputRef}
                      className="hidden"
                    />
                  </div>

                  {postData.mediaUrls.length > 1 && (
                    <>
                      <IconButton
                        icon={<ChevronLeftIcon />}
                        position="absolute"
                        left="2"
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={handlePrevMedia}
                        aria-label="Previous media"
                      />
                      <IconButton
                        icon={<ChevronRightIcon />}
                        position="absolute"
                        right="2"
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={handleNextMedia}
                        aria-label="Next media"
                      />
                    </>
                  )}

                  {/* Media type indicator */}
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    {postData.mediaTypes[currentMediaIndex] === "video" ? "Video" : "Photo"}
                  </div>

                  {/* Media count indicator */}
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    {currentMediaIndex + 1}/{postData.mediaUrls.length}
                  </div>

                  {/* Dots for slide indicator */}
                  <div className="absolute bottom-2 w-full flex justify-center space-x-2">
                    {postData.mediaUrls.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentMediaIndex(index)}
                        className={`w-2 h-2 rounded-full cursor-pointer ${
                          index === currentMediaIndex ? "bg-blue-500" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center cursor-pointer"
                  onClick={handleMediaClick}
                >
                  <div className="text-center">
                    <FaPhotoVideo className="text-4xl mx-auto mb-2 text-gray-500" />
                    <p className="text-gray-500">Click to add photos or videos</p>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      onChange={handleMediaChange}
                      ref={fileInputRef}
                      className="hidden"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Side: Post Details */}
            <div className="w-1/3 border-l p-4 flex flex-col">
              <div className="flex items-center mb-4">
                <img
                  className="w-8 h-8 rounded-full mr-2"
                  src={user?.reqUser?.image || "https://cdn.pixabay.com/photo/2023/02/28/03/42/ibex-7819817_640.jpg"}
                  alt="user"
                />
                <span className="font-semibold">{user?.reqUser?.username}</span>
              </div>

              <textarea
                name="caption"
                placeholder="Write a caption..."
                rows={6}
                className="w-full p-3 rounded-md border resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={postData.caption}
                onChange={handleInputChange}
              />

              <div className="flex justify-between mt-1 text-sm text-gray-500">
                <GrEmoji />
                <span>{postData.caption?.length}/2,200</span>
              </div>

              <div className="mt-4">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    name="location"
                    placeholder="Add location"
                    className="w-full pr-8 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    value={postData.location}
                    onChange={handleInputChange}
                  />
                  <GoLocation className="absolute right-2 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditPostModal;
