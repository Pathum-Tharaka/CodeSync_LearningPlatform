export const uploadToCloudinary = async (file) => {
  if (!file) return null;

  try {
    const data = new FormData();
    data.append("file", file);
    

    if (file.type.startsWith("video/")) {
      data.append("upload_preset", "codesync lerning platform video-upload");
    } else {
      data.append("upload_preset", "codesync lerning platform image-upload");
    }
    
    data.append("cloud_name", "dplnxifrx");

    const res = await fetch("https://api.cloudinary.com/v1_1/dplnxifrx/upload", {
      method: "POST",
      body: data,
    });

    const fileData = await res.json();
    return fileData.url;
  } catch (error) {
    console.error("Error uploading to cloudinary:", error);
    return null;
  }
};