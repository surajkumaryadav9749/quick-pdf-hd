const express = require("express");
const upload = require("../middleware/upload.middleware");
const { scanImagesToPdf } = require("../controllers/scan.controller");

const router = express.Router();

router.post("/", upload.array("images", 20), scanImagesToPdf);

module.exports = router;
