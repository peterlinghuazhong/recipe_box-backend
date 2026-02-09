const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "_" + file.originalname.replace(/\s+/g, "_")),
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  try {
    const image_url = `/api/uploads/${req.file.filename}`;
    res.status(200).json({ image_url });
  } catch (error) {
    res.status(400).json({ message: "Upload failed" });
  }
});

module.exports = router;
