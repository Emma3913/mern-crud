const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  useremail: String,
  password: String,
  role: String,
});

module.exports = mongoose.model("User", UserSchema);
