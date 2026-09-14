import { FiArchive, FiCamera, FiColumns, FiFileText, FiGrid, FiImage, FiLayers, FiMaximize } from "react-icons/fi";

const icons = {
  word: FiFileText,
  pdfword: FiFileText,
  excel: FiGrid,
  pdfexcel: FiGrid,
  split: FiColumns,
  merge: FiLayers,
  scan: FiCamera,
  zip: FiArchive,
  jpg: FiImage,
  png: FiImage,
  webp: FiImage,
  resize: FiMaximize,
};

export const iconForService = (key) => icons[key] || FiFileText;
