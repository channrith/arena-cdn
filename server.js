const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { ENV } = require("./constant/envConstant");

const app = express();

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "public");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

// Upload endpoint
app.post("/api/upload/single", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileUrl = `${ENV.CDN_BASE_URL}/${req.file.filename}`;
  res.json({
    success: true,
    filename: req.file.filename,
    url: fileUrl,
  });
});

// Multiple files upload
app.post("/api/upload-multiple", upload.array("files", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const fileUrls = req.files.map((file) => ({
    filename: file.filename,
    url: `${ENV.CDN_BASE_URL}/${file.filename}`,
  }));

  res.json({
    success: true,
    files: fileUrls,
  });
});

app.listen(ENV.APP_PORT, () => {
  console.log(`Server running on port ${ENV.APP_PORT}`);
});
