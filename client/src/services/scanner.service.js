import axios from "axios";
import { apiUrl } from "../config/api";
import { parseImageFileResponse } from "../utils/parse-image-response";

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

  return response.data;
};

export const scanImagesToFiles = async (files, settings) => {
  const formData = new FormData();

  files.forEach((file) => formData.append("images", file));
  Object.entries(settings).forEach(([key, value]) => formData.append(key, String(value)));

  const response = await axios.post(apiUrl("/api/scan/images"), formData, {
    responseType: "blob",
  });

  return parseImageFileResponse(response, "scanned-result.jpg");
};
