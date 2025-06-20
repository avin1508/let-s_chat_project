const statusCodes = require('../constants/statusCodes');
const errorMessages = require('../constants/errorMessages');
const AppError = require('../errors/appError');
const { sentOtpEmail, onBoardingEmail, resetPasswordSucess, forgetPasswordOtp } = require('../helper/emailService');
const User = require('../models/User.model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');


const AuthServices = {};

AuthServices.emailVerification = async (email) => {
  try {
    const existingUser = await User.findOne({ email });

    // If user exists and is verified → block registration
    if (existingUser && existingUser.isVerified) {
      throw new AppError(errorMessages.EMAIL_ALREADY_REGISTERED, statusCodes.BAD_REQUEST);
    }

    // Generate OTP and expiry
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // ensure string
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    if (existingUser) {
      // Case 2: Exists but not verified → Update OTP & resend
      existingUser.otp = otp;
      existingUser.otpExpiry = otpExpiry;
      await existingUser.save({ validateBeforeSave: false });
    } else {
      // Case 1: New user → Create and set OTP
      const newUser = new User({
        email,
        otp,
        otpExpiry,
        isVerified: false,
      });
      await newUser.save();
    }

    // Send OTP Email (common to both new and unverified)
    await sentOtpEmail(email, `OTP Verification - Let's Chat`, otp);

    // console.log(`OTP for ${email}: ${otp}`); // 🔧 Uncomment for dev/debug

    return {
      message: 'OTP sent successfully',
      statusCode: statusCodes.SUCCESS,
    };

  } catch (error) {
    throw new AppError(
      error.message || errorMessages.INTERNAL_SERVER_ERROR,
      error.statusCode || statusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

AuthServices.resendOtpService = async (email) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(errorMessages.USER_NOT_FOUND, statusCodes.BAD_REQUEST);
    }

    if (user.isVerified) {
      throw new AppError(errorMessages.EMAIL_ALREADY_REGISTERED, statusCodes.BAD_REQUEST);
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save({ validateBeforeSave: false });

    await sentOtpEmail(email, `OTP Verification - Let's Chat`, otp);

    // console.log(`Resent OTP for ${email}: ${otp}`); // 🔧 Uncomment for dev/debug

    return {
      message: 'OTP resend successfully',
      statusCode: statusCodes.SUCCESS,
    };
  } catch (error) {
    throw new AppError(
      error.message || errorMessages.INTERNAL_SERVER_ERROR,
      error.statusCode || statusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

AuthServices.verifyOtpService = async (email, otp) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(errorMessages.USER_NOT_FOUND, statusCodes.BAD_REQUEST);
    }

    if (user.isVerified) {
      throw new AppError(errorMessages.EMAIL_ALREADY_REGISTERED, statusCodes.BAD_REQUEST);
    }

    if (user.otp !== otp) {
      throw new AppError(errorMessages.INVALID_OTP, statusCodes.BAD_REQUEST);
    }

    if (user.otpExpiry < new Date()) {
      throw new AppError(errorMessages.OTP_EXPIRED, statusCodes.BAD_REQUEST);
    }

    user.otp = null;
    await user.save({ validateBeforeSave: false });

    // sent token to complete theprofile jwt token
    const token = jwt.sign({ id: user._id },
      process.env.ACESS_TOKEN,
      {
        expiresIn: '10m' 
      }
    );

    return {
      message: 'OTP verified successfully',
      statusCode: statusCodes.SUCCESS,
      token: token
    };

  } catch (error) {
    throw new AppError(
      error.message || errorMessages.INTERNAL_SERVER_ERROR,
      error.statusCode || statusCodes.INTERNAL_SERVER_ERROR
    );
  }
};


AuthServices.completeRegistration = async (userData, userId) => {
  try {

    const user = await User.findById({ _id: userId });

    if (!user) {
      throw new AppError(errorMessages.USER_NOT_FOUND, statusCodes.BAD_REQUEST);
    }

    if(user.isVerified) {
      throw new AppError(errorMessages.EMAIL_ALREADY_REGISTERED, statusCodes.BAD_REQUEST);
    }

    const existUser = await User.findOne({ phoneNumber: userData.phoneNumber });

    if (existUser) {
      throw new AppError(errorMessages.PHONE_NUMBER_ALREADY_REGISTERED, statusCodes.BAD_REQUEST);
    }

    const { name, phoneNumber, profilePic, password } = userData;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    user.name = name;
    user.phoneNumber = phoneNumber;
    user.password = hashPassword;
    user.isVerified = true;

    if(profilePic) {
      user.profilePic = profilePic;
    }
    await user.save();

    const token = jwt.sign({ id: user._id },
      process.env.ACESS_TOKEN,
      {
        expiresIn: '7d'
      }
    );

    return {
      message: 'Registration completed successfully',
      statusCode: statusCodes.SUCCESS,
      data:{
        userId: user._id,
        token
      }
    };
  } catch (error) {
    throw new AppError(
      error.message || errorMessages.INTERNAL_SERVER_ERROR,
      error.statusCode || statusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

AuthServices.getProfileService = async (userId) => {
  try {
    const user = await User.findById(
      { _id: userId },
      {
        password: 0,
        otp: 0,
        otpExpiry: 0,
        isVerified: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0
      }
    );

    if (!user) {
      throw new AppError(errorMessages.USER_NOT_FOUND, statusCodes.BAD_REQUEST);
    }

    return {
      message: 'Profile fetched successfully',
      statusCode: statusCodes.SUCCESS,
      data: user
    };
  } catch (error) {
    throw new AppError(
      error.message || errorMessages.INTERNAL_SERVER_ERROR,
      error.statusCode || statusCodes.INTERNAL_SERVER_ERROR
    );
  }
};


AuthServices.loginService = async (email, password) => {
  try {
    const user = await User.findOne({ email: email }).select('+password');

    if(!user){
      throw new AppError(errorMessages.INVALID_CREDENTIALS, statusCodes.BAD_REQUEST);
    }

    if(!user.isVerified){
      throw new AppError(errorMessages.EMAIL_NOT_VERIFIED, statusCodes.BAD_REQUEST);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      throw new AppError(errorMessages.INVALID_CREDENTIALS, statusCodes.BAD_REQUEST);
    }

    const token = jwt.sign({ id: user._id },
      process.env.ACESS_TOKEN,
      {
        expiresIn: '7d'
      }
    )

    return {
      message: 'Login successful',
      statusCode: statusCodes.SUCCESS,
      data: {
        userId: user._id,
        token
      }
    }
  } catch (error) {
    throw new AppError(
      error.message || errorMessages.INTERNAL_SERVER_ERROR,
      error.statusCode || statusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

AuthServices.forgetPasswordRequestOtpService = async (email) => {
  try {
    const user = await User.findOne({ email: email });

    if(!user){
      throw new AppError(errorMessages.USER_NOT_FOUND, statusCodes.BAD_REQUEST);
    }

    if(!user.isVerified){
      throw new AppError(errorMessages.EMAIL_NOT_VERIFIED, statusCodes.BAD_REQUEST);
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    await sentOtpEmail(email, 'Forget Password', otp);

    return {
      message: 'OTP sent successfully',
      statusCode: statusCodes.SUCCESS,
    }

  } catch (error) {
    throw new AppError(
      error.message || errorMessages.INTERNAL_SERVER_ERROR,
      error.statusCode || statusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

AuthServices.forgetPasswordResentOtpService = async (email) => {
  try {
    //what should i do here
    const user = await User.findOne({ email: email });

    if(!user){
      throw new AppError(errorMessages.USER_NOT_FOUND, statusCodes.BAD_REQUEST);
    }

    if(!user.isVerified){
      throw new AppError(errorMessages.EMAIL_NOT_VERIFIED, statusCodes.BAD_REQUEST);
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    await sentOtpEmail(email, 'Forget Password', otp);

    return {
      message: 'OTP sent successfully',
      statusCode: statusCodes.SUCCESS,
    }
  } catch (error) {
    throw new AppError(
      error.message || errorMessages.INTERNAL_SERVER_ERROR,
      error.statusCode || statusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

AuthServices.forgetPasswordVerifyOtpService = async (email, otp) => {
  try {
    const user = await User.findOne({ email: email });

    if(!user){
      throw new AppError(errorMessages.USER_NOT_FOUND, statusCodes.BAD_REQUEST);
    }

    if(!user.isVerified){
      throw new AppError(errorMessages.EMAIL_NOT_VERIFIED, statusCodes.BAD_REQUEST);
    }

    if(user.otp !== otp){
      throw new AppError(errorMessages.INVALID_OTP, statusCodes.BAD_REQUEST);
    }

    if(user.otpExpiry < Date.now()){
      throw new AppError(errorMessages.OTP_EXPIRED, statusCodes.BAD_REQUEST);
    }

    const tempToken = jwt.sign({ id: user._id },
      process.env.ACESS_TOKEN,
      {
        expiresIn: '2m'
      }
    )
    return {
      message: 'OTP verified successfully',
      statusCode: statusCodes.SUCCESS,
      token: tempToken
    }
  } catch (error) {
    throw new AppError(
      error.message || errorMessages.INTERNAL_SERVER_ERROR,
      error.statusCode || statusCodes.INTERNAL_SERVER_ERROR
    );
  }
}


AuthServices.resetPasswordService = async (userId, password, confirmPassword) => {
  try {
    const user = await User.findOne({ _id: userId });

    if(!user){
      throw new AppError(errorMessages.USER_NOT_FOUND, statusCodes.BAD_REQUEST);
    }

    if(!user.isVerified){
      throw new AppError(errorMessages.EMAIL_NOT_VERIFIED, statusCodes.BAD_REQUEST);
    }

    if(password !== confirmPassword){
      throw new AppError(errorMessages.PASSWORD_MISMATCH, statusCodes.BAD_REQUEST);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    user.password = hashPassword;
    await user.save();

    return {
      message: 'Password reset successfully',
      statusCode: statusCodes.SUCCESS
    }
  } catch (error) {
    throw new AppError(
      error.message || errorMessages.INTERNAL_SERVER_ERROR,
      error.statusCode || statusCodes.INTERNAL_SERVER_ERROR
    );
  }
}


module.exports = AuthServices;
