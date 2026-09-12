import axios from "axios";
import { apiUrl } from "../config/api";

export const scanImagesToPdf = async (files, settings) => {
  const formData = new FormData();

  files.forEach((file) => formData.append("images", file));
  Object.entries(settings).forEach(([key, value]) => formData.append(key, String(value)));

  const response = await axios.post(apiUrl("/api/scan"), formData, {
    responseType: "blob",
  });

  return response.data;
};
