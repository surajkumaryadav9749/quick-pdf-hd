import { useImage } from "../contexts/ImageContext";

const useImageUpload = () => {
  const { images, addImages, removeImage, clearImages, reorderImages } =
    useImage();
  return {
    images,
    addImages,
    removeImage,
    clearImages,
    reorderImages,
  };
};

export default useImageUpload;
