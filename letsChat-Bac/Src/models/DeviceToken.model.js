const mongoose = require('mongoose');

const deviceTokenSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        deviceToken:{
            type: string,
            required: true
        },
        platform: {
            type: string,
            enum: ['ios', 'android', "web"],
            required: true
        }
    }
)