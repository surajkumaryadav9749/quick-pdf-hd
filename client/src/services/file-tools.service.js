import axios from "axios";

const API_BASE = String(import.meta.env.VITE_API_URL || "")
  .trim()
  .replace(/\/+$/, "")
  .replace(/\/api$/i, "");

const filenameFromDisposition = (header = "") => {
  const quoted = String(header).match(/filename="([^"]+)"/i);
  if (quoted?.[1]) return quoted[1];
  const plain = String(header).match(/filename=([^;]+)/i);
  return plain?.[1]?.trim() || "";
};

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
  if (error.response?.data?.message) return error.response.data.message;
  if (!error.response) {
    return "Could not reach the conversion server. Check your connection and try again.";
  }
  return error.message || "The file could not be processed. Check the format and try again.";
};

const postFiles = async (path, fieldName, files, fields = {}) => {
  if (!API_BASE) {
    throw new Error("The conversion server URL is not configured.");
  }

  const formData = new FormData();
  files.forEach((file) => formData.append(fieldName, file));
  Object.entries(fields).forEach(([key, value]) => formData.append(key, String(value)));
  try {
    const response = await axios.post(`${API_BASE}${path}`, formData, {
      responseType: "blob",
    });
    const contentType = response.headers["content-type"] || response.data?.type || "";
    if (contentType.includes("application/json")) {
      const parsed = JSON.parse(await response.data.text());
      throw new Error(parsed.message || "The file could not be processed. Check the format and try again.");
    }
    return {
      blob: response.data,
      contentType,
      filename: filenameFromDisposition(response.headers["content-disposition"]),
    };
  } catch (error) {
    if (error.message && !error.response && error.name === "Error") throw error;
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

export const inspectPdfFile = async (file) => {
  if (!API_BASE) {
    throw new Error("The conversion server URL is not configured.");
  }
  const formData = new FormData();
  formData.append("files", file);
  const response = await axios.post(`${API_BASE}/api/pdf-tools/pdf-inspect`, formData);
  return response.data;
};

export const processPdfTool = (path, files, fields = {}) => postFiles(path, "files", files, fields);
