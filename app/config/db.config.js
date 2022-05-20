const dotenv = require('dotenv');
dotenv.config();
const {
    MONGODB_HOST,
    MONGODB_PORT,
    MONGODB_NAME
  } = process.env;

module.exports = {
    HOST: MONGODB_HOST,
    PORT: MONGODB_PORT,
    DB: MONGODB_NAME
  };