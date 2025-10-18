const fs = require("fs");
const path = require("path");

const singleUploadAction = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Load JSON configuration
  const configPath = path.join(path.resolve("config/values.json"));

  let CONFIG_VALUE = {};

  try {
    const rawData = fs.readFileSync(configPath, "utf-8");
    CONFIG_VALUE = JSON.parse(rawData);
  } catch (error) {
    console.error("Failed to load config file:", error);
  }

  const fileUrl = `${CONFIG_VALUE.CDN_BASE_URL}/${req.file.filename}`;
  res.json({
    success: true,
    filename: req.file.filename,
    url: fileUrl,
  });
};

module.exports = singleUploadAction;
