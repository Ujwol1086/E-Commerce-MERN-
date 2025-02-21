import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // to check whether the user is admin or not
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user"
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
