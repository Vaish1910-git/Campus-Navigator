const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const router = express.Router();
const ImageSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  data: Buffer,
});

const Image = mongoose.model("Image", ImageSchema);
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage: storage });
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const imgPath = path.join(__dirname, "..", "uploads", req.file.filename);
    const imgData = fs.readFileSync(imgPath);
    const newImage = new Image({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      data: imgData,
    });

    await newImage.save();
    res.status(200).json({ message: "Image uploaded to MongoDB!" });
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
