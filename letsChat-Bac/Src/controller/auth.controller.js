const AuthServices = require('../services/auth.service');
const AppError = require('../errors/appError');
const statusCodes = require('../constants/statusCodes');
const { token } = require('morgan');

const AuthControllers = {};

// @desc Send OTP to email (Initial verification)
AuthControllers.emailVerification = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new AppError('Email is required', statusCodes.BAD_REQUEST));
    }

    const result = await AuthServices.emailVerification(email);

    return res.status(result.statusCode).json({
      status: 'success',
      message: result.message,
    });

  } catch (error) {
    next(error); // Pass to centralized error handler
  }
};

// @desc Resend OTP to unverified user
AuthControllers.resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new AppError('Email is required', statusCodes.BAD_REQUEST));
    }

    const result = await AuthServices.resendOtpService(email);

    return res.status(result.statusCode).json({
      status: 'success',
      message: result.message,
    });

  } catch (error) {
    next(error);
  }
};

// @desc Verify OTP for email
AuthControllers.verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return next(new AppError('Email and OTP are required', statusCodes.BAD_REQUEST));
    }

    const result = await AuthServices.verifyOtpService(email, otp);

    return res.status(result.statusCode).json({
      status: 'success',
      message: result.message,
      token: result.token,
    });

  } catch (error) {
    next(error); 
  }
};

// @desc Complete registration
AuthControllers.completeRegister = async (req, res, next) => {
  try {
    const userId = req.user.id; 
    const { name, phoneNumber, password } = req.body;

    if(!userId){
      return next(new AppError('User Id is required', statusCodes.BAD_REQUEST));
    }

    if(!name || !phoneNumber || !password ){
      return next(new AppError('All fields are required', statusCodes.BAD_REQUEST));
    }

    let profilePic = null;

    if(req.file && req.file.filename){
      profilePic = req.file.filename;
      const relativePath = `/uploads/profile_photos/${profilePic}`;
      profilePic = `${req.protocol}://${req.get('host')}${relativePath}`;
    }

    const userData = {
      name,
      phoneNumber,
      profilePic,
      password
    }

    const result = await AuthServices.completeRegistration(userData, userId);

    return res.status(result.statusCode).json({
      status: 'success',
      message: result.message,
      data: result.data
    });

  } catch (error) {
    next(error);
  }
};

// @desc Get profile
AuthControllers.getProfile = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    if(!userId){
      return next(new AppError('User Id is required', statusCodes.BAD_REQUEST));
    }

    const result = await AuthServices.getProfileService(userId);

    return res.status(result.statusCode).json({
      status: 'success',
      message: result.message,
      data: result.data
    });
  } catch (error) {
    next(error);
  }
};

// @desc Login
AuthControllers.loginController = async ( req, res, next ) =>{
  try {
    console.log("Request body:", req.body);

    const { email, password } = req.body;
    
    if(!email || !password){
      return next(new AppError('Email and Password are required', statusCodes.BAD_REQUEST));
    }

    const result = await AuthServices.loginService(email, password);
    
    return res.status(result.statusCode).json({
      status: 'success',
      message: result.message,
      data: result.data
    });
  } catch (error) {
    next(error);
  }
};

// @desc Forgot password - request OTP
AuthControllers.forgotPasswordRequestOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    if(!email){
      return next(new AppError('Email is required', statusCodes.BAD_REQUEST))
    }

    const result = await AuthServices.forgetPasswordRequestOtpService(email);

    return res.status(result.statusCode).json({
      status: 'success',
      message: result.message
    })
  } catch (error) {
    next(error);
  }
};

// @desc Forgot password - resend OTP
AuthControllers.forgotPasswordResendOtp  = async (req, res, next) => {
  try {
    const { email } = req.body;

    if(!email){
      return next(new AppError('Email is required', statusCodes.BAD_REQUEST))
    }

    const result = await AuthServices.forgetPasswordResentOtpService(email);

    return res.status(result.statusCode).json({
      status: 'success',
      message: result.message
    })
  } catch (error) {
    next(error);
  }
};

// @desc Forgot password - verify OTP
AuthControllers.forgotPasswordVerifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if(!email){
      return next(new AppError('Email is required', statusCodes.BAD_REQUEST))
    }

    if(!otp){
      return next(new AppError('OTP is required', statusCodes.BAD_REQUEST))
    }

    const result = await AuthServices.forgetPasswordVerifyOtpService(email, otp);

    return res.status(result.statusCode).json({
      status: 'success',
      message: result.message,
      token: result.token
    })
  } catch (error){
    next(error);
  }
};

// @desc Forgot password - reset password
AuthControllers.resetPassword = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { password, confirmPassword } = req.body;

    if(!password || !confirmPassword){
      return next(new AppError('Password and Confirm Password are required', statusCodes.BAD_REQUEST));
    }

    const result = await AuthServices.resetPasswordService(userId, password, confirmPassword);

    return res.status(result.statusCode).json({
      status: 'success',
      message: result.message
    })
  } catch (error) {
    next(error);
  }
};

module.exports = AuthControllers;
