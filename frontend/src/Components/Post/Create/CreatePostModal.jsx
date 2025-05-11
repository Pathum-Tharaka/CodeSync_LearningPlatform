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
    mediaTypes: [],
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
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      
      if (!isImage && !isVideo) {
        alert("Please select only image or video files.");
        return false;
      }
      
      if (isVideo && file.size > 100 * 1024 * 1024) { // 100MB limit for videos
        alert("Video size should be less than 100MB");
        return false;
      }
      
      return true;
    });
    
    if (validFiles.length === 0) return;

    setUploadStatus("uploading");
    try {
      const uploadPromises = validFiles.map(async file => {
        const url = await uploadToCloudinary(file);
        const type = file.type.startsWith("image/") ? "image" : "video";
        return { url, type };
      });
      
      const results = await Promise.all(uploadPromises);
      const validResults = results.filter(result => result.url);
      
      setPostData(prev => ({
        ...prev,
        mediaUrls: [...prev.mediaUrls, ...validResults.map(r => r.url)],
        mediaTypes: [...prev.mediaTypes, ...validResults.map(r => r.type)]
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
    
    // Validate that we have at least one photo and one video
    const hasPhoto = postData.mediaTypes.includes("image");
    const hasVideo = postData.mediaTypes.includes("video");
    
    if (!hasPhoto || !hasVideo) {
      alert("Please include at least one photo and one video in your post.");
      return;
    }
    
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
    setPostData({ mediaUrls: [], mediaTypes: [], caption: '', location: "" });
    setUploadStatus("");
    setCurrentMediaIndex(0);
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
                <p className="text-gray-500 mb-3">Drag and drop photos and videos here</p>
                <p className="text-sm text-gray-400 mb-3">Include at least one photo and one video</p>
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

            {uploadStatus === "uploading" && (
              <div className="text-center">
                <SpinnerCard />
                <p className="mt-2">Uploading media...</p>
              </div>
            )}

            {uploadStatus === "uploaded" && postData.mediaUrls.length > 0 && (
              <div className="relative w-full h-full">
                {renderMedia(postData.mediaUrls[currentMediaIndex], postData.mediaTypes[currentMediaIndex])}
                
                {/* Add Media Button */}
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
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
                    onChange={handleOnChange}
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
                  {postData.mediaUrls.length} {postData.mediaUrls.length === 1 ? 'item' : 'items'}
                </div>

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