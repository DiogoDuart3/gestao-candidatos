const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "restricted"], required: true },
});

module.exports = mongoose.model("User", UserSchema);
