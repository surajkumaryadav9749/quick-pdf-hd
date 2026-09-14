import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { convertImagesToPdf } from "../services/pdf.service";
import { downloadNameFromOriginal } from "../utils/download-filename";
import useImageUpload from "./useImageUpload";

const useConvertPdf = () => {
  const { images, clearImages } = useImageUpload();

  const [isConverting, setIsConverting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => () => {
    if (result?.url) URL.revokeObjectURL(result.url);
  }, [result]);

  const convertPdf = useCallback(async () => {
    if (!images.length) {
      toast.error("Please select at least one image.");
      return;
    }

    try {
      setIsConverting(true);

      const toastId = toast.loading("Creating your PDF...");

      // Backend API Call
      const { blob: pdfBlob, filename } = await convertImagesToPdf(images);

      // Create temporary browser URL
      const pdfUrl = URL.createObjectURL(pdfBlob);

      setResult({
        url: pdfUrl,
        size: pdfBlob.size,
        imageCount: images.length,
        filename: filename || downloadNameFromOriginal(images[0]?.file?.name, "application/pdf"),
      });

      toast.success("Your PDF is ready.", {
        id: toastId,
      });
    } catch (error) {
      console.error("PDF Conversion Error:", error);

      const message =
        error?.response?.data?.message ||
        "Failed to generate PDF. Please try again.";

      toast.error(message);
    } finally {
      setIsConverting(false);
    }
  }, [images]);

  const resetResult = useCallback(() => {
    setResult(null);
    clearImages();
  }, [clearImages]);

  return {
    convertPdf,
    isConverting,
    result,
    resetResult,
  };
};

export default useConvertPdf;
