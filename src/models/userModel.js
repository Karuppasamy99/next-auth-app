import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please enter a username"]
    },
    email: {
        type: String,
        required: [true,"Please enter a email address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true,"Please enter a password"]
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpiry: Date,
})

let UserDetails = mongoose.models.userdetails || mongoose.model('userdetails', userSchema);

export default UserDetails;