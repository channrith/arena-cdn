const fs = require("fs");
const path = require("path");

const accessMiddleware = async (req, res, next) => {
  const configPath = path.join(path.resolve("config/values.json"));

  let CONFIG_VALUE = {};

  try {
    const rawData = fs.readFileSync(configPath, "utf-8");
    CONFIG_VALUE = JSON.parse(rawData);
  } catch (error) {
    console.error("Failed to load config file:", error);
  }

  const token = req.headers.authorization;
  const configService = CONFIG_VALUE[`${token}`];

  if (!token || !configService) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const serviceCode = req.headers[`${configService.toLowerCase()}`];
  if (CONFIG_VALUE.SECRET_KEY[`${configService}`] !== serviceCode) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

module.exports = accessMiddleware;
