const { ENV } = require("../../constant/envConstant");

const multiUploadAction = async (req, res) => {
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
};

module.exports = multiUploadAction;
