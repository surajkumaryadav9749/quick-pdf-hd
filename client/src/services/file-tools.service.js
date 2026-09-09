import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

const readErrorMessage = async (error) => {
  const data = error.response?.data;
  if (data instanceof Blob) {
    try {
      const parsed = JSON.parse(await data.text());
      if (parsed.message) return parsed.message;
    } catch {
      return "The file could not be processed. Check the format and try again.";
    }
  }
  return error.message || "The file could not be processed. Check the format and try again.";
};

const postFiles = async (path, fieldName, files, fields = {}) => {
  const formData = new FormData();
  files.forEach((file) => formData.append(fieldName, file));
  Object.entries(fields).forEach(([key, value]) => formData.append(key, String(value)));
  try {
    const response = await axios.post(`${API_BASE}${path}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      responseType: "blob",
    });
    return { blob: response.data, contentType: response.headers["content-type"] || "" };
  } catch (error) {
    throw new Error(await readErrorMessage(error), { cause: error });
  }
};

export const createPdfZip = async (files) => {
  const { blob } = await postFiles("/api/pdf-to-zip", "pdfs", files);
  return blob;
};

export const resizeImageFiles = async (files, options) => {
  const { blob } = await postFiles("/api/resize-image", "images", files, options);
  return blob;
};

export const processPdfTool = (path, files, fields = {}) => postFiles(path, "files", files, fields);
