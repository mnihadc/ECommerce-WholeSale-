const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      match: /^(?:968)?(9|8|7)\d{7}$/, // Allows 8-digit Oman numbers or with country code (968)
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    otp: {
      type: String,
      minlength: 6,
      maxlength: 6,
    },
    otpExpire: {
      type: Date,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const User = mongoose.model("User", userSchema);

module.exports = User;
