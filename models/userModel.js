import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: Array,
        // required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    usertype: {
        type: String,
        required: true,
        default: 'client',
        enum: ['client', 'admin', 'driver']
    },
    profile: {
        type: String,
        default: "data:image/png;base64,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"
    },
    answer: {
        type: String,
        required: true
    }
}, { timestamps: true })

const userModel = mongoose.model('user', userSchema)

export default userModel