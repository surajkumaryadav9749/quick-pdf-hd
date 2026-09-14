const DEFAULT_STEM = "file";

const basename = (name) => String(name || "").split(/[/\\]/).pop() || "";

const sanitizeFilename = (name, fallback = DEFAULT_STEM) => {
  const cleaned = basename(name)
    .replace(/[\u0000-\u001f<>:"|?*]+/g, "_")
    .replace(/"/g, "")
    .replace(/^\.+/, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);
  return cleaned || fallback;
};

const splitName = (name) => {
  const safe = sanitizeFilename(name);
  const dot = safe.lastIndexOf(".");
  if (dot <= 0) return { stem: safe || DEFAULT_STEM, ext: "" };
  return {
    stem: safe.slice(0, dot) || DEFAULT_STEM,
    ext: safe.slice(dot),
  };
};

const normalizeExt = (extension) => {
  const raw = String(extension || "").trim().toLowerCase().replace(/^\./, "");
  if (raw === "jpeg") return ".jpg";
  return raw ? `.${raw}` : "";
};

const jpegExtFromOriginal = (originalName) => {
  const { ext } = splitName(originalName);
  return ext.toLowerCase() === ".jpeg" ? ".jpeg" : ".jpg";
};

const withExtension = (originalName, extension, fallbackStem = DEFAULT_STEM) => {
  const { stem } = splitName(originalName);
  return `${stem || fallbackStem}${normalizeExt(extension)}`;
};

const keepOrReplaceExt = (originalName, extension, fallbackStem = DEFAULT_STEM) => {
  const { stem, ext } = splitName(originalName);
  const next = normalizeExt(extension);
  const current = ext.toLowerCase();
  if (!next) return `${stem || fallbackStem}${ext}`;
  if (current === next) return `${stem || fallbackStem}${ext}`;
  if (next === ".jpg" && current === ".jpeg") return `${stem || fallbackStem}${ext}`;
  return `${stem || fallbackStem}${next}`;
};

const uniqueFilename = (filename, usedNames) => {
  const { stem, ext } = splitName(filename);
  const used = usedNames || new Set();
  let candidate = `${stem}${ext}`;
  let suffix = 1;
  while (used.has(candidate.toLowerCase())) {
    candidate = `${stem}-${suffix}${ext}`;
    suffix += 1;
  }
  used.add(candidate.toLowerCase());
  return candidate;
};

const numberedFromOriginal = (originalName, extension, index, total, usedNames) => {
  const { stem } = splitName(originalName);
  const ext = normalizeExt(extension);
  if (total <= 1) return uniqueFilename(`${stem}${ext}`, usedNames);
  return uniqueFilename(`${stem}-${index}${ext}`, usedNames);
};

const archiveNameFrom = (originalName, fallbackStem = "files") => withExtension(originalName || fallbackStem, ".zip", fallbackStem);

const contentDisposition = (filename) => {
  const safe = sanitizeFilename(filename);
  return `attachment; filename="${safe}"; filename*=UTF-8''${encodeURIComponent(safe)}`;
};

module.exports = {
  sanitizeFilename,
  splitName,
  withExtension,
  keepOrReplaceExt,
  uniqueFilename,
  numberedFromOriginal,
  archiveNameFrom,
  jpegExtFromOriginal,
  contentDisposition,
};
