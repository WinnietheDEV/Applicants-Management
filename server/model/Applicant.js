const mongoose = require("mongoose");
const Job = require("./Job");
const Schema = mongoose.Schema;
const Applicant = new mongoose.Schema({
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "rejected", "accepted"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "Job",
  },
});

module.exports = mongoose.model("applicant", Applicant);
