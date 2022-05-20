const {MONGODB_HOST,MONGODB_NAME,MONGODB_PORT} = require("../../config");
module.exports = {
    HOST: MONGODB_HOST,
    PORT: MONGODB_PORT,
    DB: MONGODB_NAME
  };