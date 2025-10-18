require("dotenv").config();

const { APP_PORT, UPLOAD_PATH } = process.env;

const ENV = {
  APP_PORT: APP_PORT ? parseInt(APP_PORT) : 3003,
  UPLOAD_PATH: UPLOAD_PATH || 'public',
};

module.exports = { ENV };
