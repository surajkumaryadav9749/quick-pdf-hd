const filenameFromDisposition = (header = "") => {
  const quoted = String(header).match(/filename="([^"]+)"/i);
  if (quoted?.[1]) return quoted[1];
  const plain = String(header).match(/filename=([^;]+)/i);
  return plain?.[1]?.trim() || "";
};

const extensionFromType = (contentType = "") => {
  if (contentType.includes("png")) return "png";
  if (contentType.includes("webp")) return "webp";
  return "jpg";
};

const base64ToBlob = (data, contentType) => {
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return new Blob([bytes], { type: contentType });
};

export const parseImageFileResponse = async (response, fallbackName = "download.jpg") => {
  const contentType = response.headers["content-type"] || response.data?.type || "";
  if (contentType.includes("application/zip") || contentType.includes("application/x-zip")) {
    throw new Error("The server returned a ZIP archive instead of image files.");
  }

  if (contentType.includes("application/json")) {
    const parsed = JSON.parse(await response.data.text());
    if (!parsed.files?.length) {
      throw new Error(parsed.message || "The images could not be processed. Please try again.");
    }
    return parsed.files.map((file) => {
      const type = file.contentType || "image/jpeg";
      return {
        blob: base64ToBlob(file.data, type),
        filename: file.name || fallbackName,
        contentType: type,
      };
    });
  }

  if (!String(contentType).startsWith("image/")) {
    throw new Error("The server did not return an image file.");
  }

  const filename = filenameFromDisposition(response.headers["content-disposition"])
    || `${fallbackName.replace(/\.[^.]+$/, "")}.${extensionFromType(contentType)}`;

  return [{
    blob: response.data,
    filename,
    contentType,
  }];
};
