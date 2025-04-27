export const uploadToCloudinary = async (file) => {
  if (!file) return null;

  try {
    const data = new FormData();
    data.append("file", file);
    

    if (file.type.startsWith("video/")) {
      data.append("upload_preset", "cloud_video_preset");
    } else {
      data.append("upload_preset", "cloud_upload_img");
    }
    
    data.append("cloud_name", "dvawjogg8");

    const res = await fetch("https://api.cloudinary.com/v1_1/dvawjogg8/upload", {
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