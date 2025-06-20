const AppError = require('./appError');
const statusCodes = require('../constants/statusCodes');
const errorMessages = require('../constants/errorMessages');

const sendErrorDev = (err, res) => {
    res.status(err.statusCodes).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err
    });
}

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCodes).json({
            status: err.status,
            message: err.message
        });
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        });
    }
}

const errorHandler = (err, req, res, next) => {
    err.statusCodes = err.statusCodes || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        error.message = err.message;  // <--- Added this line
        error.name = err.name;        // <--- Added this line

        if (error.name === 'CastError') {
            const message = `Invalid ${error.path}: ${error.value}`;
            error = new AppError(message, statusCodes.BAD_REQUEST);
        }

        if (error.code === 11000) {
            const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];
            const message = `Duplicate field value: ${value}. Please use another value!`;
            error = new AppError(message, statusCodes.BAD_REQUEST);
        }

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(el => el.message);
            const message = `Invalid input data. ${errors.join('. ')}`;
            error = new AppError(message, statusCodes.BAD_REQUEST);
        }

        if (error.name === 'JsonWebTokenError') {
            const message = 'Invalid token. Please log in again!';
            error = new AppError(message, statusCodes.UNAUTHORIZED);
        }

        if (error.name === 'TokenExpiredError') {
            const message = 'Your token has expired! Please log in again.';
            error = new AppError(message, statusCodes.UNAUTHORIZED);
        }

        sendErrorProd(error, res);
    }
}

module.exports = errorHandler;
