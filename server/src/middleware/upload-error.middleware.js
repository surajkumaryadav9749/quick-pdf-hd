const multer = require("multer");

const handleUploadError = (error, req, res, next) => {
  if (!error) return next();

  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ success: false, message: "The uploaded file exceeds the size limit." });
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({ success: false, message: "Too many files were uploaded." });
    }
    return res.status(400).json({ success: false, message: "The upload could not be processed." });
  }

  return res.status(400).json({
    success: false,
    message: error.message || "The upload could not be processed.",
  });
};

module.exports = handleUploadError;
