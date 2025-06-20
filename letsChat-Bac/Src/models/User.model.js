const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      trim: true,
      default: '', 
    },
    phoneNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    profilePic: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      select: false, 
    },
    about: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
