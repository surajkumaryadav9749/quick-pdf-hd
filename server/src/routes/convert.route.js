const express = require("express");

const upload = require("../middleware/upload.middleware");

const { convertImagesToPdf } = require("../controllers/convert.controller");

const router = express.Router();

router.post("/", upload.array("images", 50), convertImagesToPdf);

module.exports = router;
