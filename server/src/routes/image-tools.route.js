const express = require("express");
const upload = require("../middleware/upload.middleware");
const handleUploadError = require("../middleware/upload-error.middleware");
const { convertImages } = require("../controllers/image-tools.controller");

const router = express.Router();

router.post("/convert", upload.array("images", 20), handleUploadError, convertImages);

module.exports = router;
