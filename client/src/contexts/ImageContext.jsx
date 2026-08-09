import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import toast from "react-hot-toast";
import { arrayMove } from "@dnd-kit/sortable";
import { MAX_IMAGES, MAX_FILE_SIZE, ALLOWED_TYPES } from "../constants/upload";

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  // Add Images
  const addImages = useCallback(
    (files) => {
      const incomingFiles = Array.from(files);

      // Maximum Image Count
      if (images.length + incomingFiles.length > MAX_IMAGES) {
        toast.error(`Maximum ${MAX_IMAGES} images allowed.`);
        return;
      }

      const validImages = [];

      incomingFiles.forEach((file) => {
        // File Type
        if (!ALLOWED_TYPES.includes(file.type)) {
          toast.error(`${file.name} is not a supported image.`);
          return;
        }

        // File Size
        if (file.size > MAX_FILE_SIZE) {
          toast.error(`${file.name} exceeds 10 MB.`);
          return;
        }

        // Duplicate Check
        const duplicate = images.find(
          (img) =>
            img.file.name === file.name &&
            img.file.size === file.size &&
            img.file.lastModified === file.lastModified,
        );

        if (duplicate) {
          toast.error(`${file.name} already added.`);
          return;
        }

        validImages.push({
          id: crypto.randomUUID(),
          file,
        });
      });

      if (!validImages.length) return;

      setImages((prev) => [...prev, ...validImages]);

      toast.success(
        `${validImages.length} image${
          validImages.length > 1 ? "s" : ""
        } added successfully.`,
      );
    },
    [images],
  );

  // Reorder Images
  const reorderImages = useCallback((activeId, overId) => {
    if (activeId === overId) return;

    setImages((prev) => {
      const oldIndex = prev.findIndex((image) => image.id === activeId);

      const newIndex = prev.findIndex((image) => image.id === overId);

      return arrayMove(prev, oldIndex, newIndex);
    });
  }, []);

  // Remove Single Image
  const removeImage = useCallback((id) => {
    setImages((prev) => prev.filter((image) => image.id !== id));

    toast.success("Image removed.");
  }, []);

  // Clear All Images
  const clearImages = useCallback(() => {
    setImages([]);

    toast.success("All images removed.");
  }, []);

  const value = useMemo(
    () => ({
      images,
      addImages,
      removeImage,
      clearImages,
      reorderImages, //
    }),
    [images, addImages, removeImage, clearImages, reorderImages],
  );

  return (
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  );
};

export const useImage = () => {
  const context = useContext(ImageContext);

  if (!context) {
    throw new Error("useImage must be used inside ImageProvider");
  }

  return context;
};
