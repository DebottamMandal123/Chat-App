import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    fullName: {
        type: String,
        required: [true, "Username is required"],
        minlength: [3, "Username must be at least 3 characters"]
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters"]
    },
    profilePic: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema);

export default User