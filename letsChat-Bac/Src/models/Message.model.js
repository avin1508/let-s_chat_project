const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        chat:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat", 
        },
        content: {
            type: String
        },
        messageType: {
            type: String,
            enum: ['text', 'image', 'video', 'audio', 'file'],
            default: 'text',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ['sent', 'delivered', 'read'],
            default: 'sent',
        },
    },
    {
        timestamps: true
    }
)


const Message = mongoose.model('Message', messageSchema);
module.exports = Message