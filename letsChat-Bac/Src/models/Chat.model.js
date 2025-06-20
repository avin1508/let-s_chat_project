const mongoose = require('mongoose');

//this is the chat model which handle one to one and group chat

const chatSchema = new mongoose.Schema(
  {
    isGroupChat: {
        type: Boolean,
        default: false,
    },
    chatName: {
        type: String,
        trim: true,
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    groupPic: {
        type: String,
        default: "",
    }
  }, {
    timestamps: true,
  }
);

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;