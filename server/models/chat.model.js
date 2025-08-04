import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'ai'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
})

const chatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chatName: {
        type: String,
        required: true
    },
    pdfUrl: {
        type: String,
        required: true
    },
    cloudinaryPublicId: {
        type: String,
        required: true
    },
    namespace: {
        type: String,
        required: true,
        unique: true
    },
    fileHash: {
        type: String,
    },
    messages: [messageSchema]
}, { timestamps: true })

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;