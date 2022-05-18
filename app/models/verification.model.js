const mongoose = require("mongoose");
const verify = mongoose.model(
  "Verification",
  new mongoose.Schema({
    user_id: String,
    verify_number: String,
    expire_time: String
  },{
    timestamps: true
})
);
module.exports = verify;