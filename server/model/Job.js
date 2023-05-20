const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please provide job title"],
  },
  available: {
    type: Number,
    required: [true, "please provide how many employees needed?"],
  },
  description: {
    type: String,
    required: [true, "please provide job description"],
  },
  requirement: {
    type: String,
    required: [true, "please provide requirement"],
  },
});

module.exports = mongoose.model("job", JobSchema);
