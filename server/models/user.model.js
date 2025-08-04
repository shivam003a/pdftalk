import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required field']
    },
    email: {
        type: String,
        required: [true, 'Email is required field'],
        unique: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    },
    lastLoginAt: Date

}, { timestamps: true })

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User;