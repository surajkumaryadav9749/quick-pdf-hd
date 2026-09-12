import axios from "axios";
import { apiUrl } from "../config/api";

export const convertImagesToPdf = async (images) => {
  const formData = new FormData();

  images.forEach((image) => {
    formData.append("images", image.file);
  });

  const response = await axios.post(apiUrl("/api/convert"), formData, {
    responseType: "blob",
  });

  return response.data;
};
