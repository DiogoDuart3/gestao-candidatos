const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  encryptedPassword: { type: String, required: true },
  role: { type: String, enum: ["admin", "restricted"], required: true },
});

module.exports = mongoose.model("User", UserSchema);
