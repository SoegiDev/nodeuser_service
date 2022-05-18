const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    first_name: String,
    last_name: String,
    email: String,
    unique_id: String,
    public_id: String,
    password: String,
    job: String,
    bio: String,
    phone : String,
    avatar: String,
    identity_card: String,
    email_confirmed: Boolean,
    deleted: Boolean,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  },{
    timestamps: true
})
);
module.exports = User;