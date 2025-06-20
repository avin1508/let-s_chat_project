const express = require('express');
const authRoutes = express.Router();
const upload = require('../middlewares/uploadProfilePhoto.middleware');
const AuthControllers = require('../controller/auth.controller');
const authenticateUser = require('../middlewares/jwtMiddleware');

// 🔐 Registration Flow (Email OTP Based)
authRoutes.post('/register/request-otp', AuthControllers.emailVerification);        // Send OTP for new registration
authRoutes.post('/register/resend-otp', AuthControllers.resendOtp);                // Resend OTP for registration
authRoutes.post('/register/verify-otp', AuthControllers.verifyOtp);                // Verify OTP for registration
authRoutes.post('/register/complete', authenticateUser, upload.single('profilePic'), AuthControllers.completeRegister); // Final step to save user profile

// 🔑 Login and Profile
authRoutes.post('/auth/login', AuthControllers.loginController);                   // Login
authRoutes.get('/auth/profile/:userId', AuthControllers.getProfile);               // Get user profile

// 🔒 Forgot Password Flow (Separate & Clear)
authRoutes.post('/forgot-password/request-otp', AuthControllers.forgotPasswordRequestOtp);
authRoutes.post('/forgot-password/resend-otp', AuthControllers.forgotPasswordResendOtp);
authRoutes.post('/forgot-password/verify-otp', AuthControllers.forgotPasswordVerifyOtp);
authRoutes.post('/forgot-password/reset', authenticateUser, AuthControllers.resetPassword); 

module.exports = authRoutes;
