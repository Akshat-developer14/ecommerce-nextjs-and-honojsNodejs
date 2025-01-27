import mongoose, { Schema, Document, Model } from "mongoose";


export interface UserInterface extends Document {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    avatar: {
        public_id: string;
        url: string;
    }
    role: string;
    isVerified: boolean;
    otp: string;
    otpExpires: Date;
}


const userSchema: Schema<UserInterface> = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter your username"],
        trim: true,
        unique: true
    },
    firstname: {
        type: String,
        required: [true, "Please enter your name"]
    },
    lastname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        trim: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please fill a valid email address",
          ],
    },
    password: {
        type: String,
        minlength: [8, "Password must be at least 8 characters"],
        select: false
    },
    avatar: {
        public_id: String,
        url: String
    },
    role: {
        type: String,
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        default: null
    },
    otpExpires: { 
        type: Date,
        default: null
    }
},{timestamps: true})

const UserModel: Model<UserInterface> = mongoose.model("User", userSchema);

export default UserModel;
