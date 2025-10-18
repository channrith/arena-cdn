const express = require("express");
const { ENV } = require("./constant/envConstant");
const singleUploadAction = require("./controller/upload/singleUploadAction");
const multiUploadAction = require("./controller/upload/multiUploadAction");
const { upload } = require("./util/uploadUtil");
const accessMiddleware = require("./middleware/accessMiddleware");

const app = express();

// Upload endpoint
app.post(
  "/api/upload/single",
  accessMiddleware,
  upload.single("file"),
  singleUploadAction
);

// Multiple files upload
app.post(
  "/api/upload/multiple",
  accessMiddleware,
  upload.array("files", 10),
  multiUploadAction
);

app.listen(ENV.APP_PORT, () => {
  console.log(`Server running on port ${ENV.APP_PORT}`);
});
