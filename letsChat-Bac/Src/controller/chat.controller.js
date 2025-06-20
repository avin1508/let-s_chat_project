const chatService = require('../services/chat.service');
const AppError = require('../errors/appError');
const STATUS_CODES = require('../constants/statusCodes');
const ERROR_MESSAGES = require('../constants/errorMessages');

const chatController = {};


chatController.getUserChats = async (req, res, next) => {
  try {

    const loggedInUserId = req.user.id;
    if(!loggedInUserId){
      return next(new AppError('User ID is required', STATUS_CODES.BAD_REQUEST));
    }

    const result = await chatService.getUserChats(loggedInUserId);

    return res.status(result.statusCode).json({
      status: 'success',
      message: result.message,
      data: result.data,
    });

  } catch (error) {
    next(error);
  }
}

chatController.createAndAccessChat = async (req, res, next) => {
  try {
    const loggedInUserId = req.user.id;
    const { chatPartnerId } = req.body;

    if (!loggedInUserId || !chatPartnerId) {
      return next(
        new AppError('User ID and Chat Partner ID are required.', STATUS_CODES.BAD_REQUEST)
      );
    }

    const result = await chatService.createAndAccessChat(loggedInUserId, chatPartnerId);

    return res.status(result.statusCode).json({
      status: 'success',
      message: result.message,
      data: result.data,
    });

  } catch (error) {
    next(error);
  }
};

chatController.sendMessage = async (req, res, next) => {
  try {
    const loggedInUserId = req.user.id;
    const { chatId, message, messageType } = req.body;

    if (!loggedInUserId || !chatId || !message) {
      return next(new AppError('Required fields are missing.', STATUS_CODES.BAD_REQUEST));
    }

    const result = await chatService.sendMessage(loggedInUserId, chatId, message, messageType);

    return res.status(result.statusCode).json({
      status: 'success',
      message: result.message,
      data: result.data,
    });

  } catch (error) {
    next(error);
  }
};

chatController.createGroupChat = async (req, res, next) => {
  try {
    const loggedInUserId = req.user.id;
    const { groupName, participants } = req.body;

    if (!groupName || !participants) {
      return next(new AppError('Group name and participants are required', STATUS_CODES.BAD_REQUEST));
    }

    let groupPic = '';
    if (req.file && req.file.filename) {
      const relativePath = `/uploads/group_photos/${req.file.filename}`;
      groupPic = `${req.protocol}://${req.get('host')}${relativePath}`;
    }

    const groupData = {
      groupName,
      participants,
      loggedInUserId,
      groupPic
    };

    const result = await chatService.createGroupChat(groupData);

    return res.status(result.statusCode).json({
      status: 'success',
      message: result.message,
      data: result.data
    });
  } catch (error) {
    next(error);
  }
};


module.exports = chatController;
