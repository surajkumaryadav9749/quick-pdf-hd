const express = require("express");
const upload = require("../middleware/upload.middleware");
const { scanImagesToPdf, scanImagesToFiles } = require("../controllers/scan.controller");

const router = express.Router();

router.post("/", upload.array("images", 20), scanImagesToPdf);
router.post("/images", upload.array("images", 20), scanImagesToFiles);

module.exports = router;
