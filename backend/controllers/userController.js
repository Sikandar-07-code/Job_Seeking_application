import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtTokens.js";

// Register User
export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, phone, role, password } = req.body;

    if (!name || !email || !phone || !role || !password) {
        return next(new ErrorHandler("Please fill the full registration form!"));
    }

    const isEmail = await User.findOne({ email });
    if (isEmail) {
        return next(new ErrorHandler("Email already exists!"));
    }

    const user = new User({ name, email, phone, role, password });

    // Save the user to the database
    await user.save();

    sendToken(user, 200, res, "User registered successfully!");
});

// Login User
export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return next(new ErrorHandler("Please provide email, password, and role.", 400));
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    if (user.role !== role) {
        return next(new ErrorHandler("Invalid role", 400));
    }

    sendToken(user, 200, res, "User logged in successfully!");
});

// Logout User
export const logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now() + 3600000), // Cookie expires in 1 hour
        httpOnly: true,
        secure : true,
        sameSite: 'none',
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});

export const getUser = catchAsyncError(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});