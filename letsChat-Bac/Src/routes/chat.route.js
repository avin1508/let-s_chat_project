const express = require('express');
const chatRoutes = express.Router();
const chatController = require('../controller/chat.controller')
const authenticateUser = require('../middlewares/jwtMiddleware')
const upload = require('../middlewares/uploadProfilePhoto.middleware')


chatRoutes.get('/user-chats', authenticateUser, chatController.getUserChats);
chatRoutes.post('/create-and-access', authenticateUser, chatController.createAndAccessChat);
chatRoutes.post('/send-message', authenticateUser, chatController.sendMessage);
chatRoutes.post('/create-group-chat', authenticateUser, upload.single('groupPic'), chatController.createGroupChat);

module.exports = chatRoutes;
