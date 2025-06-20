const transPorter = require('./emailTransPorter');
const renderTemplets = require('./emailTempletService')
const AppError = require('../errors/appError')
const statusCodes = require('../constants/statusCodes')

const sentOtpEmail = async (to, sub, otp) => {
    const htmlContent = await renderTemplets('otpVerification', { otp });

    const mailOption = {
        from: process.env.SMTP_FROM,
        to,
        subject: sub,
        html: htmlContent,
    }
    try {
        await transPorter.sendMail(mailOption); 
        console.log('Email sent successfully');
    } catch (error) {
        throw new AppError(error.message, statusCodes.INTERNAL_SERVER_ERROR);
    }
}

const onBoardingEmail = async (to, sub) => {
    const htmlContent = await renderTemplets('welcomeEmail');

    const mailOption = {
        from: process.env.SMTP_FROM,
        to,
        subject: sub,
        html: htmlContent,
    }
    try {
        await transPorter.sendMail(mailOption); 
        console.log('Email sent successfully');
    } catch (error) {
        throw new AppError(error.message, statusCodes.INTERNAL_SERVER_ERROR);
    }
}

const forgetPasswordOtp = async (to, sub, otp) => {
    const htmlContent = await renderTemplets('forgetPAssword', { otp });

    const mailOption = {
        from: process.env.SMTP_FROM,
        to,
        subject: sub,
        html: htmlContent,
    }
    try {
        await transPorter.sendMail(mailOption); 
        console.log('Email sent successfully');
    } catch (error) {
        throw new AppError(error.message, statusCodes.INTERNAL_SERVER_ERROR);
    }
}



const resetPasswordSucess = async (to, sub) => {
    const htmlContent = await renderTemplets('forgetPAsswordSucess');

    const mailOption = {
        from: process.env.SMTP_FROM,
        to,
        subject: sub,
        html: htmlContent,
    }
    try {
        await transPorter.sendMail(mailOption); 
        console.log('Email sent successfully');
    } catch (error) {
        throw new AppError(error.message, statusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = { sentOtpEmail }