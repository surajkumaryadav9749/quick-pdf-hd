import axios from "axios";

const API = "http://localhost:5000/api/convert";

export const convertImagesToPdf = async (images) => {
  const formData = new FormData();

  images.forEach((image) => {
    formData.append("images", image.file);
  });

  const response = await axios.post(API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },

    responseType: "blob",
  });

  return response.data;
};
