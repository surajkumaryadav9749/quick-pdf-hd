const express = require("express");
const upload = require("../middleware/upload.middleware");
const { resizeImages } = require("../controllers/resize.controller");

const router = express.Router();
router.post("/", upload.array("images", 20), resizeImages);
module.exports = router;
