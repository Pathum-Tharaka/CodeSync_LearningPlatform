export const uploadMediaToCloudinary = async (media) => {
    if (media) {
      const data = new FormData();
      data.append("file", media);
      data.append("upload_preset", "cloud_video_preset");
      data.append("cloud_name", "dvawjogg8");
  
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dvawjogg8/video/upload",
        {
          method: "post",
          body: data,
        }
      );
      const fileData = await res.json();
      console.log("url : ", fileData);
      return fileData.url.toString();
    } else {
      console.log("error");
    }
  };
  