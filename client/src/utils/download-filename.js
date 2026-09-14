const DEFAULT_STEM = "file";

const basename = (name) => String(name || "").split(/[/\\]/).pop() || "";

export const sanitizeFilename = (name, fallback = DEFAULT_STEM) => {
  const cleaned = basename(name)
    .split("")
    .map((char) => (char.charCodeAt(0) < 32 || /[<>:"|?*]/.test(char) ? "_" : char))
    .join("")
    .replace(/"/g, "")
    .replace(/^\.+/, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);
  return cleaned || fallback;
};

export const splitName = (name) => {
  const safe = sanitizeFilename(name);
  const dot = safe.lastIndexOf(".");
  if (dot <= 0) return { stem: safe || DEFAULT_STEM, ext: "" };
  return { stem: safe.slice(0, dot) || DEFAULT_STEM, ext: safe.slice(dot) };
};

const normalizeExt = (extension) => {
  const raw = String(extension || "").trim().toLowerCase().replace(/^\./, "");
  if (raw === "jpeg") return ".jpg";
  return raw ? `.${raw}` : "";
};

export const withExtension = (originalName, extension, fallbackStem = DEFAULT_STEM) => {
  const { stem } = splitName(originalName);
  return `${stem || fallbackStem}${normalizeExt(extension)}`;
};

export const extensionFromContentType = (contentType = "") => {
  const type = String(contentType).toLowerCase();
  if (type.includes("zip")) return ".zip";
  if (type.includes("png")) return ".png";
  if (type.includes("webp")) return ".webp";
  if (type.includes("jpeg") || type.includes("jpg")) return ".jpg";
  if (type.includes("wordprocessingml") || type.includes("msword")) return ".docx";
  if (type.includes("spreadsheetml") || type.includes("excel")) return ".xlsx";
  if (type.includes("pdf")) return ".pdf";
  return "";
};

export const downloadNameFromOriginal = (originalName, contentType, fallback = "file") => {
  const ext = extensionFromContentType(contentType);
  if (!ext) return sanitizeFilename(originalName, fallback);
  return withExtension(originalName || fallback, ext, fallback);
};
