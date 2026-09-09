import { FiArchive, FiCamera, FiColumns, FiCopy, FiFileText, FiGrid, FiImage, FiLayers, FiMaximize } from "react-icons/fi";

const icons = {
  word: FiFileText,
  pdfword: FiFileText,
  excel: FiGrid,
  pdfexcel: FiGrid,
  split: FiColumns,
  merge: FiLayers,
  pdfjpg: FiCopy,
  scan: FiCamera,
  zip: FiArchive,
  jpg: FiImage,
  jpeg: FiImage,
  png: FiImage,
  webp: FiImage,
  resize: FiMaximize,
};

export const iconForService = (key) => icons[key] || FiFileText;
