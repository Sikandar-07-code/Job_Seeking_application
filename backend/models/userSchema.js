import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name."],
        minlength: [3, "Name should be at least 3 characters long."],
        maxlength: [30, "Name should not exceed 30 characters!"],
    },
    email: {
        type: String,
        required: [true, "Please enter an email."],
        validate: [validator.isEmail, "Please enter a valid email."],
    },
    phone: {
        type: String,
        required: [true, "Please enter a phone number."],
    },
    password: {
        type: String,
        required: [true, "Please enter a password."],
        minlength: [8, "Password should be at least 8 characters long."],
        maxlength: [32, "Password should not exceed 32 characters!"],
        select: false,
    },
    role: {
        type: String,
        required: [true, "Please select a role."],
        enum: ["Job Seeker", "Employer"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT method
userSchema.methods.getJWTToken = function () {  // Ensure this method name matches the one used in sendToken
    return jwt.sign(
        {
            id: this._id,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE }  // Ensure JWT_EXPIRE is defined in your environment variables
    );
};

export const User = mongoose.model("User", userSchema);
