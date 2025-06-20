const statusCodes = require('../constants/statusCodes');
const errorMessages = require('../constants/errorMessages'); 
const AppError = require('../errors/appError');
const User = require('../models/User.model');
const Chat = require('../models/Chat.model');
const Message = require('../models/Message.model')

const userService = {};

userService.getProfileService = async (userId) => {
  try {
    const user = await User.findById(userId, {
      _id: 0,
      password: 0,
      otp: 0,
      otpExpiry: 0,
      isVerified: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0
    });

    if (!user) {
      throw new AppError(errorMessages.USER_NOT_FOUND, statusCodes.BAD_REQUEST);
    }

    return {
      message: 'Profile fetched successfully',
      statusCode: statusCodes.SUCCESS,
      data: user
    };
  } catch (error) {
    console.error('Error in getProfileService:', error);

    throw new AppError(
      error.message || errorMessages.INTERNAL_SERVER_ERROR,
      error.statusCode || statusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// userService.getUserChatListService = async (userId) => {
//   try {

//     const user = await User.findById(userId);
//     if (!user) {
//       throw new AppError(errorMessages.USER_NOT_FOUND, statusCodes.BAD_REQUEST);
//     }

//     const chats = await Chat.find({ participants: { $in: [userId] } })
//     .populate('participants', 'name, profilePic, phoneNumber, about')
//     .populate('lastMessage')
//     .populate('groupAdmin', 'name, profilePic, phoneNumber, about')
//     .sort({ updatedAt: -1 });

//     console.log(chats);

//     const chatList = await Promise.all(
//       chats.map(async (chat) => {
//         let chatDisplayName  = "";
//         let chatPic = "";
//         let participantProfile = "";

//         // one to one chat
//         if(!chat.isGroupChat){
//           const otherUser = chat.participants.find((p) => p._id.toString() !== userId.toString());
//           if(otherUser){
//             chatDisplayName = otherUser.name;
//             chatPic = otherUser.profilePic;
//             participantProfile = otherUser;
//           }
//         }

//         // Count unread messages for this chat (not sent by current user)
//         const unreadCount = await Message.countDocuments({
//           chat: chat._id,
//           sender: { $ne: userId },
//           status: { $ne: "read" }
//         });

//         const lastMessage = chat.lastMessage;
//         const isSender = lastMessage.sender.toString() === userId.toString();

//         // Populate lastMessage sender details
//         let senderData = null;
//         if(lastMessage?.sender){
//           const senderUser  = await User.findById(lastMessage.sender).select(
//             "name profilePic"
//           );
//           if(senderUser){
//             senderData = {
//               _id: senderUser._id,
//               name: senderUser.name,
//               profilePic: senderUser.profilePic,
//             }
//           }
//         }

//         return {
//           _id: chat._id,
//           isGroupChat: chat.isGroupChat,
//           ...(chat.isGroupChat ? {
//             chatName: chat.chatName,
//             groupPic: chat.groupPic,
//             groupAdmin: chat.groupAdmin,
//             participants: chat.participants,
//           } : {
//             chatDisplayName,
//             chatPic,
//             participantProfile,   
//           }
//         ),
//         lastMessage: lastMessage
//          ? {
//             _id: lastMessage._id,
//             content: lastMessage.content,
//             messageType: lastMessage.messageType,
//             status: isSender ? lastMessage.status : undefined,
//             isSender,
//             sender: senderData,
//             createdAt: lastMessage.createdAt,
//          }
//          : 
//          null,
//          unreadCount,
//          updatedAt: chat.updatedAt
//         }

//       })
//     )

//     return {
//       message: 'Chat list fetched successfully',
//       statusCode: statusCodes.SUCCESS,
//       data: {
//         chatList: chats
//       }
//     };

//   } catch (error) {
//     console.error('Error in getUserChatListService:', error);
//   }
// }



module.exports = userService;




