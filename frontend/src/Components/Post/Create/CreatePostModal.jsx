import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";

import React, { useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import "./CreatePostModal.css";
import { GoLocation } from "react-icons/go";
import { GrEmoji } from "react-icons/gr";
import { Button, IconButton } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../Redux/Post/Action";
import { uploadToCloudinary } from "../../../Config/UploadToCloudinary";
import SpinnerCard from "../../Spinner/Spinner";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const CreatePostModal = ({ onOpen, isOpen, onClose }) => {
  const [files, setFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector(store => store);

  const [postData, setPostData] = useState({ 
    mediaUrls: [], 
    caption: '', 
    location: "" 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData(prev => ({ ...prev, [name]: value }));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    handleFiles(droppedFiles);
    setIsDragOver(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleOnChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = async (files) => {
    const validFiles = files.filter(file => 
      file.type.startsWith("image/") || file.type.startsWith("video/")
    );
    
    if (validFiles.length === 0) {
      alert("Please select image or video files.");
      return;
    }

    setUploadStatus("uploading");
    try {
      const uploadPromises = validFiles.map(file => uploadToCloudinary(file));
      const urls = await Promise.all(uploadPromises);
      
      setPostData(prev => ({
        ...prev,
        mediaUrls: [...prev.mediaUrls, ...urls.filter(url => url)]
      }));
      setUploadStatus("uploaded");
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("error");
      alert("Failed to upload files. Please try again.");
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

  const handleSubmit = async () => {
    if (!token || postData.mediaUrls.length === 0) return;
    
    const data = {
      jwt: token,
      data: postData,
    };
    
    dispatch(createPost(data));
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setFiles([]);
    setIsDragOver(false);
    setPostData({ mediaUrls: [], caption: '', location: "" });
    setUploadStatus("");
    setCurrentMediaIndex(0);
  };

  const isVideo = (url) => {
    return url.match(/\.(mp4|webm|ogg)$/i);
  };

  return (
    <Modal size={"5xl"} isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent className="rounded-xl shadow-xl overflow-hidden">
        <ModalHeader className="flex justify-between items-center px-6 pt-4 pb-2 border-b">
          <h2 className="text-lg font-bold">Create New Post</h2>
          <Button
            onClick={handleSubmit}
            colorScheme="blue"
            size="sm"
            isDisabled={postData.mediaUrls.length === 0}
          >
            Share
          </Button>
        </ModalHeader>
        <ModalBody className="flex flex-col md:flex-row p-0">
          {/* Left Side: Media Upload / Preview */}
          <div className="w-full md:w-1/2 h-[70vh] relative flex justify-center items-center bg-gray-50">
            {uploadStatus === "" && (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`border-2 border-dashed rounded-lg w-11/12 h-5/6 p-6 text-center transition ${
                  isDragOver ? "border-blue-400 bg-blue-50" : "border-gray-300"
                }`}
              >
                <FaPhotoVideo className="text-4xl mx-auto mb-2 text-gray-500" />
                <p className="text-gray-500 mb-3">Drag and drop photos or videos here</p>
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-block bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition"
                >
                  Select from Computer
                </label>
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleOnChange}
                  className="hidden"
                />
              </div>
            )}
  
            {uploadStatus === "uploading" && <SpinnerCard />}
  
            {uploadStatus === "uploaded" && (
              <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                {postData.mediaUrls.map((url, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      index === currentMediaIndex ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {isVideo(url) ? (
                      <video src={url} controls className="w-full h-full object-contain" />
                    ) : (
                      <img src={url} className="w-full h-full object-contain" alt="media" />
                    )}
                  </div>
                ))}
  
                {/* Media Nav Arrows */}
                {postData.mediaUrls.length > 1 && (
                  <>
                    <IconButton
                      icon={<ChevronLeftIcon />}
                      onClick={handlePrevMedia}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2"
                      size="sm"
                    />
                    <IconButton
                      icon={<ChevronRightIcon />}
                      onClick={handleNextMedia}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      size="sm"
                    />
                  </>
                )}
  
                {/* Dots for slide indicator */}
                <div className="absolute bottom-2 w-full flex justify-center space-x-2">
                  {postData.mediaUrls.map((_, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentMediaIndex(index)}
                      className={`w-2 h-2 rounded-full cursor-pointer ${
                        currentMediaIndex === index ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            )}
          </div>
  
          {/* Right Side: Post Details */}
          <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
            <div>
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
                placeholder="Write a description..."
                rows={6}
                className="w-full p-3 rounded-md border resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={postData.caption}
                onChange={handleInputChange}
              />
  
              <div className="flex justify-between mt-1 text-sm text-gray-500">
                <GrEmoji />
                <span>{postData.caption?.length}/2,200</span>
              </div>
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreatePostModal;