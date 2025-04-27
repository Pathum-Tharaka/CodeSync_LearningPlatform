import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createStory } from "../../Redux/Story/Action";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { uploadToCloudinary } from "../../Config/UploadToCloudinary";

const CreateStory = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleFilePick = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewImage(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (!selectedFile) {
        alert("Please select an image");
        setLoading(false);
        return;
      }

      // Upload image to Cloudinary
      const imageUrl = await uploadToCloudinary(selectedFile);
      
      if (!imageUrl) {
        alert("Failed to upload image");
        setLoading(false);
        return;
      }

      const storyData = {
        image: imageUrl,
        captions: caption
      };

      await dispatch(createStory({ story: storyData, jwt: token }));
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Error creating story:", error);
      setLoading(false);
      alert("Failed to create story");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Create Story</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer" onClick={() => document.getElementById('fileInput').click()}>
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="max-h-60 object-contain mb-4" />
              ) : (
                <>
                  <AiOutlineCloudUpload className="text-4xl text-gray-400 mb-2" />
                  <p className="text-gray-500">Click to upload image</p>
                </>
              )}
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleFilePick}
                className="hidden"
              />
            </div>
          </div>
          <div className="mb-6">
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a caption..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white ${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {loading ? 'Creating Story...' : 'Create Story'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStory; 