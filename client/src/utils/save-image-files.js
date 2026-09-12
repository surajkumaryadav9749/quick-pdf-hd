export const canPickDirectory = () =>
  typeof window !== "undefined" && typeof window.showDirectoryPicker === "function";

export const uniqueFilename = (filename, used) => {
  const trimmed = String(filename || "file").replace(/[\\/]+/g, "_");
  const dot = trimmed.lastIndexOf(".");
  const base = (dot > 0 ? trimmed.slice(0, dot) : trimmed) || "file";
  const ext = dot > 0 ? trimmed.slice(dot) : "";
  let name = `${base}${ext}`;
  let suffix = 1;
  while (used.has(name.toLowerCase())) {
    name = `${base}-${suffix}${ext}`;
    suffix += 1;
  }
  used.add(name.toLowerCase());
  return name;
};

export const resizedFallbackName = (filename) => {
  const trimmed = String(filename || "image").replace(/[\\/]+/g, "_");
  const dot = trimmed.lastIndexOf(".");
  const base = (dot > 0 ? trimmed.slice(0, dot) : trimmed) || "image";
  const ext = dot > 0 ? trimmed.slice(dot) : "";
  return `${base}-resized${ext}`;
};

export const downloadBlobAsFile = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
};

const writeFilesToDirectory = async (directory, files, subfolderName) => {
  const folder = subfolderName
    ? await directory.getDirectoryHandle(subfolderName, { create: true })
    : directory;
  const used = new Set();
  for (const file of files) {
    const name = uniqueFilename(file.filename, used);
    const handle = await folder.getFileHandle(name, { create: true });
    const writable = await handle.createWritable();
    try {
      await writable.write(file.blob);
    } finally {
      await writable.close();
    }
  }
};

export const saveImageFiles = async (files, { subfolderName = "Resized" } = {}) => {
  if (!files?.length) throw new Error("No files to save.");

  if (files.length === 1) {
    downloadBlobAsFile(files[0].blob, files[0].filename);
    return { mode: "single" };
  }

  if (canPickDirectory()) {
    try {
      const directory = await window.showDirectoryPicker({ mode: "readwrite" });
      await writeFilesToDirectory(directory, files, subfolderName);
      return { mode: "folder" };
    } catch (error) {
      if (error?.name === "AbortError") {
        const cancelled = new Error("Folder selection was cancelled.");
        cancelled.code = "CANCELLED";
        throw cancelled;
      }
    }
  }

  const used = new Set();
  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    const name = uniqueFilename(file.fallbackName || resizedFallbackName(file.filename), used);
    downloadBlobAsFile(file.blob, name);
    if (index < files.length - 1) {
      await new Promise((resolve) => window.setTimeout(resolve, 450));
    }
  }
  return { mode: "sequential" };
};
