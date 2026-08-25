import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

const postFiles = async (path, fieldName, files, fields = {}) => {
  const formData = new FormData();
  files.forEach((file) => formData.append(fieldName, file));
  Object.entries(fields).forEach(([key, value]) => formData.append(key, String(value)));
  const response = await axios.post(`${API_BASE}${path}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    responseType: "blob",
  });
  return response.data;
};

export const createPdfZip = (files) => postFiles("/api/pdf-to-zip", "pdfs", files);
export const resizeImageFiles = (files, options) => postFiles("/api/resize-image", "images", files, options);
