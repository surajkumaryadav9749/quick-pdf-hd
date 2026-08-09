import { useCallback, useRef, useState } from "react";
import useImageUpload from "./useImageUpload";

const useDragDrop = () => {
  const { addImages } = useImageUpload();

  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  // Handle Selected Files
  const handleFiles = useCallback(
    (files) => {
      if (!files || files.length === 0) return;

      addImages(Array.from(files));
    },
    [addImages],
  );

  // Open File Picker
  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  // Drag Enter
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
  }, []);

  // Drag Over
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
  }, []);

  // Drag Leave
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  // Drop
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      setIsDragging(false);

      handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  return {
    isDragging,

    fileInputRef,

    openFilePicker,

    dragProps: {
      onDragEnter: handleDragEnter,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,

      onFilesSelected: handleFiles,
    },
  };
};

export default useDragDrop;
