import { useCallback, useState } from "react";
import toast from "react-hot-toast";

import { convertImagesToPdf } from "../services/pdf.service";
import useImageUpload from "./useImageUpload";

const useConvertPdf = () => {
  const { images, clearImages } = useImageUpload();

  const [isConverting, setIsConverting] = useState(false);

  const convertPdf = useCallback(async () => {
    if (!images.length) {
      toast.error("Please select at least one image.");
      return;
    }

    try {
      setIsConverting(true);

      const toastId = toast.loading("Creating your PDF...");

      // Backend API Call
      const pdfBlob = await convertImagesToPdf(images);

      // Create temporary browser URL
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Create download link
      const link = document.createElement("a");

      link.href = pdfUrl;
      link.download = "QuickPDFHD.pdf";

      // Add link temporarily
      document.body.appendChild(link);

      // Start download
      link.click();

      // Remove temporary link
      document.body.removeChild(link);

      // Free browser memory
      URL.revokeObjectURL(pdfUrl);

      // Success Toast
      toast.success("PDF downloaded successfully!", {
        id: toastId,
      });

      // Wait a little, then clear uploaded images
      setTimeout(() => {
        clearImages();
      }, 300);
    } catch (error) {
      console.error("PDF Conversion Error:", error);

      const message =
        error?.response?.data?.message ||
        "Failed to generate PDF. Please try again.";

      toast.error(message);
    } finally {
      setIsConverting(false);
    }
  }, [images, clearImages]);

  return {
    convertPdf,
    isConverting,
  };
};

export default useConvertPdf;
