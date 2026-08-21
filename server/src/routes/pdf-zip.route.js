const express = require("express");
const pdfUpload = require("../middleware/pdf-upload.middleware");
const { zipPdfs } = require("../controllers/pdf-zip.controller");

const router = express.Router();
router.post("/", pdfUpload.array("pdfs", 20), zipPdfs);
module.exports = router;
