const userService = require('../services/user.service');
const AppError = require('../errors/appError');
const statusCodes = require('../constants/statusCodes');

const userController = {};

userController.userProfileController = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(new AppError('User ID is required', statusCodes.BAD_REQUEST));
    }

    const result = await userService.getProfileService(userId);

    return res.status(result.statusCode).json({
      status: 'success',
      message: result.message,
      data: result.data
    });
  } catch (error) {
    next(error); 
  }
};

// userController.getUserChatListController = async (req, res, next) => {
//   try {
    
//     const userId = req.user?.id;

//     if (!userId) {
//       return next(new AppError('User ID is required', statusCodes.BAD_REQUEST));
//     }

//     const result = await userService.getUserChatListService(userId);

//     return res.status(result.statusCode).json({
//       status: 'success',
//       message: result.message,
//       data: result.data
//     });

//   } catch (error) {
//     next(error);
//   }
// }

module.exports = userController;
