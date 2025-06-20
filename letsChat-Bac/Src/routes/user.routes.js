const express = require('express');
const userRoutes = express.Router();
const userController = require('../controller/user.controller');
const authenticateUser = require('../middlewares/jwtMiddleware');


userRoutes.get('/profile', authenticateUser, userController.userProfileController);
// userRoutes.get('/chats', authenticateUser, userController.getUserChatListController);

module.exports = userRoutes;
