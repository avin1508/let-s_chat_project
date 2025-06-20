const STATUS_CODES = require('../constants/statusCodes');
const ERROR_MESSAGES = require('../constants/errorMessages');
const AppError = require('../errors/appError');
const Chat = require('../models/Chat.model');
const User = require('../models/User.model');
const Message = require('../models/Message.model');

const chatService = {};


chatService.getUserChats = async (loggedInUserId) => {
  try {
    const chats = await Chat.find({ participants: loggedInUserId })
      .populate('participants', 'name profilePic phoneNumber')
      .populate('groupAdmin', 'name profilePic phoneNumber email about')
      .populate({
        path: 'lastMessage',
        select: 'content messageType createdAt',
        populate: {
          path: 'sender',
          select: 'name profilePic',
        }
      })
      .sort({ updatedAt: -1 }); // latest chats first

    const formattedChats = chats.map(chat => ({
      _id: chat._id,
      chatName: chat.isGroupChat ? chat.chatName : null,
      isGroupChat: chat.isGroupChat,
      groupPic: chat.isGroupChat ? chat.groupPic : null,
      groupAdmin: chat.isGroupChat ? {
        _id: chat.groupAdmin?._id,
        name: chat.groupAdmin?.name,
        profilePic: chat.groupAdmin?.profilePic,
        phoneNumber: chat.groupAdmin?.phoneNumber,
        email: chat.groupAdmin?.email,
        about: chat.groupAdmin?.about
      } : null,
      participants: chat.participants.map(user => ({
        _id: user._id,
        name: user.name,
        profilePic: user.profilePic,
        phoneNumber: user.phoneNumber
      })),
      lastMessage: chat.lastMessage ? {
        _id: chat.lastMessage._id,
        content: chat.lastMessage.content,
        messageType: chat.lastMessage.messageType,
        createdAt: chat.lastMessage.createdAt,
        sender: {
          _id: chat.lastMessage.sender._id,
          name: chat.lastMessage.sender.name,
          profilePic: chat.lastMessage.sender.profilePic,
        }
      } : null,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt
    }));

    return {
      statusCode: STATUS_CODES.SUCCESS,
      message: "Chat list fetched successfully",
      data: formattedChats
    };
  } catch (error) {
    throw new AppError(
      error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};


chatService.createAndAccessChat = async (loggedInUserId, chatPartnerId) => {
  try {
    const existingChat = await Chat.findOne({
      isGroupChat: false,
      participants: {
        $all: [loggedInUserId, chatPartnerId],
        $size: 2
      }
    })
    .populate('participants', 'name profilePic phoneNumber')
    .populate({
      path: 'lastMessage',
      select: 'content messageType createdAt',
      populate: {
        path: 'sender',
        select: 'name profilePic'
      }
    });

    if (existingChat) {
      return {
        message: "Chat already exists",
        statusCode: STATUS_CODES.SUCCESS,
        data: {
          _id: existingChat._id,
          isGroupChat: false,
          participants: existingChat.participants,
          lastMessage: existingChat.lastMessage
            ? {
                _id: existingChat.lastMessage._id,
                content: existingChat.lastMessage.content,
                messageType: existingChat.lastMessage.messageType,
                createdAt: existingChat.lastMessage.createdAt,
                sender: existingChat.lastMessage.sender
              }
            : null,
          createdAt: existingChat.createdAt,
          updatedAt: existingChat.updatedAt
        }
      };
    }

    // Create new 1-to-1 chat
    const newChat = await Chat.create({
      isGroupChat: false,
      participants: [loggedInUserId, chatPartnerId]
    });

    const populatedChat = await Chat.findById(newChat._id)
      .populate('participants', 'name profilePic phoneNumber');

    return {
      message: "Chat created successfully",
      statusCode: STATUS_CODES.SUCCESS,
      data: {
        _id: populatedChat._id,
        isGroupChat: false,
        participants: populatedChat.participants,
        lastMessage: null,
        createdAt: populatedChat.createdAt,
        updatedAt: populatedChat.updatedAt
      }
    };

  } catch (error) {
    throw new AppError(
      error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

chatService.sendMessage = async (loggedInUserId, chatId, message, messageType) => {
  try {
    const messageData = {
      sender: loggedInUserId,
      chat: chatId,
      content: message,
    };

    if (messageType) {
      messageData.messageType = messageType;
    }

    const newMessage = await Message.create(messageData);

    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: newMessage._id
    });

    const fullMessage = await Message.findById(newMessage._id)
      .populate('sender', 'name profilePic phoneNumber about')
      .populate({
        path: 'chat',
        populate: {
          path: 'participants',
          model: 'User',
          select: 'name profilePic phoneNumber about'
        }
      });

    return {
      message: "Message sent successfully",
      statusCode: STATUS_CODES.SUCCESS,
      data: fullMessage
    };

  } catch (error) {
    throw new AppError(error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
};

chatService.createGroupChat = async (groupData) => {
  try {
    const { groupName, participants, loggedInUserId, groupPic } = groupData;

    let parsedParticipants;
    try {
      parsedParticipants = typeof participants === 'string' ? JSON.parse(participants) : participants;
    } catch {
      throw new AppError('Invalid participants format', STATUS_CODES.BAD_REQUEST);
    }

    if (!Array.isArray(parsedParticipants) || parsedParticipants.length < 2) {
      throw new AppError("Minimum 2 participants required to create a group", STATUS_CODES.BAD_REQUEST);
    }

    const allParticipants = parsedParticipants.includes(loggedInUserId)
      ? parsedParticipants
      : [loggedInUserId, ...parsedParticipants];

    const newGroupChat = await Chat.create({
      isGroupChat: true,
      chatName: groupName,
      participants: allParticipants,
      groupAdmin: loggedInUserId,
      groupPic
    });

    const populatedGroupChat = await Chat.findById(newGroupChat._id)
      .populate('participants', 'name phoneNumber profilePic')
      .populate('groupAdmin', 'name phoneNumber profilePic about email');

    return {
      message: "Group chat created successfully",
      statusCode: STATUS_CODES.SUCCESS,
      data: {
        _id: populatedGroupChat._id,
        chatName: populatedGroupChat.chatName,
        isGroupChat: populatedGroupChat.isGroupChat,
        groupPic: populatedGroupChat.groupPic,
        groupAdmin: {
          _id: populatedGroupChat.groupAdmin._id,
          name: populatedGroupChat.groupAdmin.name,
          phoneNumber: populatedGroupChat.groupAdmin.phoneNumber,
          profilePic: populatedGroupChat.groupAdmin.profilePic,
          about: populatedGroupChat.groupAdmin.about,
          email: populatedGroupChat.groupAdmin.email
        },
        participants: populatedGroupChat.participants.map(user => ({
          _id: user._id,
          name: user.name,
          phoneNumber: user.phoneNumber,
          profilePic: user.profilePic
        })),
        lastMessage: null, // At creation, no message
        createdAt: populatedGroupChat.createdAt,
        updatedAt: populatedGroupChat.updatedAt
      }
    };
  } catch (error) {
    throw new AppError(
      error.message || "Something went wrong while creating group chat",
      error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = chatService;
