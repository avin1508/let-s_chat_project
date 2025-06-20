const jwt = require('jsonwebtoken');
const AppError = require('../errors/appError');
const statusCodes = require('../constants/statusCodes');
const errorMessages = require('../constants/errorMessages');

const authenticateUser = async (req, res, next) => {
  try {
    const rawToken = req.headers.authorization || req.headers.token;

    if (!rawToken) {
      return next(new AppError(errorMessages.UNAUTHORIZED, statusCodes.UNAUTHORIZED));
    }

    let token;

    if (rawToken.startsWith('Bearer ')) {
      token = rawToken.split(' ')[1];
    } else {
      token = rawToken;
    }

    if (!token) {
      return next(new AppError(errorMessages.UNAUTHORIZED, statusCodes.UNAUTHORIZED));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.ACESS_TOKEN);

    // Attach user ID to request
    req.user = {
      id: decoded.id,
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new AppError(errorMessages.TOKEN_EXPIRED, statusCodes.UNAUTHORIZED));
    }

    if (error.name === 'JsonWebTokenError') {
      return next(new AppError(errorMessages.TOKEN_INVALID, statusCodes.UNAUTHORIZED));
    }

    return next(
      new AppError(errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

module.exports = authenticateUser;
