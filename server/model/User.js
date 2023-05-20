const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide name"],
    trim: true,
    minlength: 4,
    maxlength: 30,
  },
  surname: {
    type: String,
    required: [true, "please provide surname"],
    trim: true,
    minlength: 4,
    maxlength: 30,
  },
  email: {
    type: String,
    trim: true,
    required: [true, "please provide email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "email is invalid",
    ],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "please provide password"],
  },
  status: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
  },
  address: {
    type: String,
    minlength: 30,
    maxlength: 200,
  },
  experience: {
    type: String,
    minlength: 30,
    maxlength: 500,
  },
  expectedSalary: {
    type: Number,
    min: 10000,
    max: 200000,
  },
});

module.exports = mongoose.model("user", UserSchema);
