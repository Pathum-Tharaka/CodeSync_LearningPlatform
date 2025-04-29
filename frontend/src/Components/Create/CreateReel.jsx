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
import { GoLocation } from "react-icons/go";
import { GrEmoji } from "react-icons/gr";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { uploadMediaToCloudinary } from "../../Config/UploadVideoToCloudnary";
import SpinnerCard from "../Spinner/Spinner";
import { createReel } from "../../Redux/Reel/Action";

const CreateReelModal = ({ onOpen, isOpen, onClose }) => {
  const finalRef = React.useRef(null);
  const [file, setFile] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState("");
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);
  const [videoUrl, setVideoUrl] = useState();
  const [postData, setPostData] = useState({
    video: "",
    caption: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleOnChange = async (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type.startsWith("image/") || file.type.startsWith("video/"))
    ) {
      setFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        setVideoUrl(reader.result);
      };

      setIsImageUploaded("uploading");
      const url = await uploadMediaToCloudinary(file);
      setPostData((prevValues) => ({ ...prevValues, video: url }));
      setIsImageUploaded("uploaded");
    } else {
      setFile(null);
      alert("Please select a valid image or video file.");
    }
  };

  const handleSubmit = async () => {
    const data = { jwt: token, reelData: postData };
    if (token && postData.video) {
      dispatch(createReel(data));
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    setFile(null);
    setPostData({ video: "", caption: "", location: "" });
    setIsImageUploaded("");
  };

  return (
    <Modal size="4xl" finalFocusRef={finalRef} isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent className="rounded-xl overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center py-3 px-6 bg-gray-100 border-b">
          <h2 className="text-lg font-semibold text-gray-700">Create New Post</h2>
          <Button
            onClick={handleSubmit}
            colorScheme="blue"
            size="sm"
            variant="solid"
            className="font-medium rounded-md"
            isDisabled={isImageUploaded !== "uploaded"}
          >
            Share
          </Button>
        </div>
        <ModalBody className="bg-white">
          <div className="flex flex-col md:flex-row gap-6 py-6">
            {/* Media Upload */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 border rounded-lg p-4 relative">
              {isImageUploaded === "" && (
                <div className="flex flex-col items-center gap-3 text-center">
                  <FaPhotoVideo className="text-4xl text-blue-500" />
                  <p className="text-gray-600">Drag & drop media or</p>
                  <label
                    htmlFor="file-upload"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition"
                  >
                    Select from computer
                  </label>
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleOnChange}
                  />
                </div>
              )}
              {isImageUploaded === "uploading" && <SpinnerCard />}
              {postData.video && (
                <video
                  width="100%"
                  height="auto"
                  controls
                  className="rounded-lg"
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>
              )}
            </div>

            {/* Post Info */}
            <div className="w-full md:w-1/2 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={
                    user?.reqUser?.image ||
                    "https://cdn.pixabay.com/photo/2023/02/28/03/42/ibex-7819817_640.jpg"
                  }
                  alt="user"
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-medium">{user?.reqUser?.username}</span>
              </div>

              <textarea
                name="caption"
                rows="5"
                onChange={handleInputChange}
                placeholder="Write a caption..."
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              />

              <div className="flex justify-between text-gray-500 items-center px-1">
                <GrEmoji />
                <span>{postData.caption?.length}/2,200</span>
              </div>

              <div className="flex items-center gap-3 border-t pt-4">
                <input
                  type="text"
                  name="location"
                  placeholder="Add Location"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <GoLocation className="text-xl text-gray-500" />
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateReelModal;
