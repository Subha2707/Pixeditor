const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  convertImage,
  imageToPdf,
  compressImage
} = require("../controllers/convertController");

const auth = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post(
  "/convert-image", 
  auth, 
  upload.single("file"), 
  convertImage
);
router.post(
  "/image-to-pdf", 
  auth, 
  upload.single("file"), 
  imageToPdf
);
router.post(
  "/compress-image",
  auth,
  upload.single("file"),
  compressImage
);

module.exports = router;