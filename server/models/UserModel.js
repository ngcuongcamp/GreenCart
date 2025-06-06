import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // cartItems: { type: Object, default: {} }
}, {
    minimize: false,
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    }
})



const User = mongoose.model('user', userSchema)

export default User