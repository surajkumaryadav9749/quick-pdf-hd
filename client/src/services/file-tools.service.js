import axios from "axios";
import { API_BASE, apiUrl } from "../config/api";
import { parseImageFileResponse } from "../utils/parse-image-response";

const filenameFromDisposition = (header = "") => {
  const quoted = String(header).match(/filename="([^"]+)"/i);
  if (quoted?.[1]) return quoted[1];
  const plain = String(header).match(/filename=([^;]+)/i);
  return plain?.[1]?.trim() || "";
};

const fallbackForStatus = (status, serverMessage) => {
  if (serverMessage) return serverMessage;
  if (status === 413) return "The uploaded file exceeds the size limit.";
  if (status === 415 || status === 422) return "That file is not a valid PDF for this tool.";
  if (status === 400) return "The file could not be processed. Check the format and try again.";
  if (status === 404 || status === 405) return "The conversion service is not available at this address.";
  if (status === 502 || status === 503 || status === 504) {
    return "The conversion service is temporarily unavailable. Please try again in a moment.";
  }
  if (status >= 500) return "The conversion server could not process this PDF. Please try again.";
  return "The file could not be processed. Check the format and try again.";
};

const readErrorMessage = async (error) => {
  const status = error.response?.status;
  const data = error.response?.data;

  if (data instanceof Blob) {
    try {
      const parsed = JSON.parse(await data.text());
      if (parsed.message) return fallbackForStatus(status, parsed.message);
    } catch {
      return fallbackForStatus(status);
    }
  }

  if (error.response?.data?.message) {
    return fallbackForStatus(status, error.response.data.message);
  }

  if (error.response) {
    return fallbackForStatus(status, error.message);
  }

  return "Could not reach the conversion server. Check your connection and try again.";
};

const postFiles = async (path, fieldName, files, fields = {}) => {
  const formData = new FormData();
  files.forEach((file) => formData.append(fieldName, file));
  Object.entries(fields).forEach(([key, value]) => formData.append(key, String(value)));
  try {
    const response = await axios.post(apiUrl(path), formData, {
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
    const status = error.response?.status;
    const data = error.response?.data;
    let serverMessage = "";
    if (data instanceof Blob) {
      try {
        const parsed = JSON.parse(await data.clone().text());
        if (parsed.message) serverMessage = String(parsed.message);
      } catch {
        serverMessage = "";
      }
    } else if (data?.message) {
      serverMessage = String(data.message);
    }
    if (status) {
      console.warn("[QuickPDFHD] conversion request failed", {
        path,
        status,
        message: serverMessage || error.message || "no message",
      });
    } else {
      console.warn("[QuickPDFHD] conversion request failed", { path, status: null, reason: "network" });
    }
    if (error.message && !error.response && error.name === "Error") throw error;
    throw new Error(await readErrorMessage(error), { cause: error });
  }
};

export const createPdfZip = async (files) => {
  const { blob } = await postFiles("/api/pdf-to-zip", "pdfs", files);
  return blob;
};

export const resizeImageFiles = async (files, options) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));
  Object.entries(options).forEach(([key, value]) => formData.append(key, String(value)));
  try {
    const response = await axios.post(apiUrl("/api/resize-image"), formData, {
      responseType: "blob",
    });
    return parseImageFileResponse(response, "resized.jpg");
  } catch (error) {
    throw new Error(await readErrorMessage(error), { cause: error });
  }
};

export const inspectPdfFile = async (file) => {
  const formData = new FormData();
  formData.append("files", file);
  try {
    const response = await axios.post(apiUrl("/api/pdf-tools/pdf-inspect"), formData);
    return response.data;
  } catch (error) {
    throw new Error(await readErrorMessage(error), { cause: error });
  }
};

export const processPdfTool = (path, files, fields = {}) => postFiles(path, "files", files, fields);

export { API_BASE };
