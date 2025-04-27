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
    <div>
      <Modal
        size={"4xl"}
        finalFocusRef={React.useRef(null)}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalOverlay />
        <ModalContent fontSize={"sm"}>
          <div className="flex justify-between py-1 px-10 items-center">
            <p>Create New Post</p>
            <Button
              onClick={handleSubmit}
              className="inline-flex"
              colorScheme="blue"
              size={"sm"}
              variant="ghost"
              isDisabled={postData.mediaUrls.length === 0}
            >
              Share
            </Button>
          </div>

          <hr className="hrLine" />

          <ModalBody>
            <div className="modalBodyBox flex h-[70vh] justify-between">
              <div className="w-[50%] flex flex-col justify-center items-center relative">
                {uploadStatus === "" && (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`drag-drop h-full ${isDragOver ? "border-blue-500" : ""}`}
                  >
                    <div className="flex justify-center flex-col items-center">
                      <FaPhotoVideo className={`text-3xl ${isDragOver ? "text-blue-800" : ""}`} />
                      <p>Drag photos or videos here</p>
                    </div>

                    <label htmlFor="file-upload" className="custom-file-upload">
                      Select from computer
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      accept="image/*, video/*"
                      multiple
                      onChange={handleOnChange}
                    />
                  </div>
                )}

                {uploadStatus === "uploading" && <SpinnerCard />}

                {uploadStatus === "uploaded" && (
                  <div className="w-full h-full relative">
                    {postData.mediaUrls.map((url, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 flex items-center justify-center ${
                          index === currentMediaIndex ? "block" : "hidden"
                        }`}
                      >
                        {isVideo(url) ? (
                          <video
                            src={url}
                            controls
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <img
                            src={url}
                            alt={`Media ${index + 1}`}
                            className="max-h-full max-w-full object-contain"
                          />
                        )}
                      </div>
                    ))}

                    {postData.mediaUrls.length > 1 && (
                      <>
                        {}
                        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                          {postData.mediaUrls.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentMediaIndex(index)}
                              className={`w-2 h-2 rounded-full ${
                                index === currentMediaIndex ? "bg-blue-500" : "bg-gray-300"
                              }`}
                              aria-label={`Go to media ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
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
                    placeholder="Write a description..."
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
                    placeholder="Add Location"
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
    </div>
  );
};

export default CreatePostModal;