require("dotenv").config();

const {
  APP_PORT,
  API_KEY,
  CDN_BASE_URL,
} = process.env;

const ENV = {
  APP_PORT: APP_PORT ? parseInt(APP_PORT) : 3003,
  API_KEY,
  CDN_BASE_URL,
};

module.exports = { ENV };
