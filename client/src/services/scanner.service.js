import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/scan`;

export const scanImagesToPdf = async (files, settings) => {
  const formData = new FormData();

  files.forEach((file) => formData.append("images", file));
  Object.entries(settings).forEach(([key, value]) => formData.append(key, String(value)));

  const response = await axios.post(API, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    responseType: "blob",
  });

  return response.data;
};
