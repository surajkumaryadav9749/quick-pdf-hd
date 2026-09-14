import axios from "axios";
import { apiUrl } from "../config/api";

const filenameFromDisposition = (header = "") => {
  const utf = String(header).match(/filename\*=UTF-8''([^;]+)/i);
  if (utf?.[1]) return decodeURIComponent(utf[1]);
  const quoted = String(header).match(/filename="([^"]+)"/i);
  if (quoted?.[1]) return quoted[1];
  const plain = String(header).match(/filename=([^;]+)/i);
  return plain?.[1]?.trim() || "";
};

export const convertImagesToPdf = async (images) => {
  const formData = new FormData();

  images.forEach((image) => {
    formData.append("images", image.file);
  });

  const response = await axios.post(apiUrl("/api/convert"), formData, {
    responseType: "blob",
  });

  return {
    blob: response.data,
    filename: filenameFromDisposition(response.headers["content-disposition"]),
  };
};
