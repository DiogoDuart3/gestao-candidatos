const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  company: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  active: {
    type: Boolean,
    default: false,
  },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", JobSchema);
