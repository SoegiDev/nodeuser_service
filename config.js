const dotenv = require('dotenv');
dotenv.config();
let SECRET_KEY = ''
let SECRET_KEY_REFRESH=''
let jwtExpiration = 3600           // 1 hour
let jwtRefreshExpiration= 86400   // 24 hours
let verifyExpiration= 7200 // 2 hours
const {
    REDIS_HOST,
    REDIS_PORT,
    MONGODB_HOST,
    MONGODB_PORT,
    MONGODB_NAME,
    NODE_ENV
  } = process.env;

if (NODE_ENV === "development") {
    jwtExpiration = 7200
    jwtRefreshExpiration = 21600
    verifyExpiration = 3600
    SECRET_KEY_REFRESH = "x-secret-key_refresh"
    SECRET_KEY ="x-secret-key"
    console.log(process.env.NODE_ENV)
  }
if (NODE_ENV === "production") {
    jwtExpiration = 3600
    jwtRefreshExpiration = 21600
    verifyExpiration = 3600
    SECRET_KEY_REFRESH = "2022-secret-key_refresh"
    SECRET_KEY ="2022-secret-key"
    console.log(process.env.NODE_ENV)
  }
  module.exports = {
    REDIS_HOST,
    REDIS_PORT,
    MONGODB_HOST,
    MONGODB_PORT,
    MONGODB_NAME,
    SECRET_KEY,
    SECRET_KEY_REFRESH,
    jwtExpiration,
    jwtRefreshExpiration,
    verifyExpiration
  }