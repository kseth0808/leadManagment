import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ["Super Admin", "Sub-Admin", "Support Agent", "Lead"],
        default: "User"
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
