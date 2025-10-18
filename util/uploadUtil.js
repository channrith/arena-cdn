const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { ENV } = require("../constant/envConstant");

const dynamicStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Dynamic folder based on query parameter
    const folderName = req.query.folder || "default";

    const uploadPath = path.join(path.resolve(ENV.UPLOAD_PATH), folderName);

    // Create the directory if it doesn’t exist
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: dynamicStorage,
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

module.exports = { upload };
