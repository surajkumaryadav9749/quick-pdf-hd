import axios from "axios";
import { apiUrl } from "../config/api";
import { parseImageFileResponse } from "../utils/parse-image-response";

const filenameFromDisposition = (header = "") => {
  const utf = String(header).match(/filename\*=UTF-8''([^;]+)/i);
  if (utf?.[1]) {
    try {
      return decodeURIComponent(utf[1]);
    } catch {
      return utf[1];
    }
  }
  const quoted = String(header).match(/filename="([^"]+)"/i);
  if (quoted?.[1]) return quoted[1];
  const plain = String(header).match(/filename=([^;]+)/i);
  return plain?.[1]?.trim() || "";
};

export const scanImagesToPdf = async (files, settings) => {
  const formData = new FormData();

  files.forEach((file) => formData.append("images", file));
  Object.entries(settings).forEach(([key, value]) => formData.append(key, String(value)));

  const response = await axios.post(apiUrl("/api/scan"), formData, {
    responseType: "blob",
  });

  const contentType = response.headers["content-type"] || response.data?.type || "";
  if (contentType.includes("application/json")) {
    const parsed = JSON.parse(await response.data.text());
    throw new Error(parsed.message || "Could not create the PDF. Please try again.");
  }

  return {
    blob: response.data,
    filename: filenameFromDisposition(response.headers["content-disposition"]),
  };
};

export const scanImagesToFiles = async (files, settings) => {
  const formData = new FormData();

  files.forEach((file) => formData.append("images", file));
  Object.entries(settings).forEach(([key, value]) => formData.append(key, String(value)));

  const response = await axios.post(apiUrl("/api/scan/images"), formData, {
    responseType: "blob",
  });

  return parseImageFileResponse(response, files[0]?.name || "scanned.jpg");
};
