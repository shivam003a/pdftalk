import { deletePineconeNamespace } from "../config/pinecone.config.js"
import Chat from "../models/chat.model.js"
import { v2 as cloudinary } from 'cloudinary'

export const getAllChats = async (req, res) => {
    try {
        const { _id } = req.user
        const chats = await Chat.find({ userId: _id })
            .select('_id chatName createdAt updatedAt')
            .sort({ updatedAt: -1 })

        return res.success("Chat Fetched", chats, 200)

    } catch (e) {
        console.error(e)
        return res.error(e?.message || "Internal Server Error", null, 500)
    }
}

export const getChatById = async (req, res) => {
    try {
        const { _id } = req.user
        const { chatId } = req.params

        if (!chatId) {
            return res.error("chatId is required", null, 400)
        }

        const chat = await Chat.findOne({
            _id: chatId,
            userId: _id
        })
        if (!chat) {
            return res.error("Chat Not Found", null, 404)
        }

        return res.success("Chat Fetched", chat, 200)
    } catch (e) {
        console.error(e)
        return res.error(e?.message || "Internal Server Error", null, 500)
    }
}

export const deleteChatById = async (req, res) => {
    try {
        const { _id } = req.user
        const { chatId } = req.params

        if (!chatId) {
            return res.error("chatId is required", null, 400)
        }

        const chat = await Chat.findOneAndDelete({
            _id: chatId,
            userId: _id
        })
        if (!chat) {
            return res.error("Chat Not Found", null, 404)
        }

        // delete pdf from cloudinary
        await cloudinary.uploader.destroy(chat?.cloudinaryPublicId)

        // delete vectors from pinecone
        await deletePineconeNamespace(chat?.namespace)

        return res.success("CHat Deleted", null, 200)

    } catch (e) {
        console.error(e)
        return res.error(e?.message || "Internal Server Error", null, 500)
    }
}