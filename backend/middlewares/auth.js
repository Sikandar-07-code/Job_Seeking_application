import jwt from 'jsonwebtoken';
import { User } from '../models/userSchema.js';
import ErrorHandler from './error.js';

export const isAuthorized = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("User not authorized", 401));
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decodedData.id);

        if (!req.user) {
            return next(new ErrorHandler("User not authorized", 401));
        }

        next();
    } catch (error) {
        return next(new ErrorHandler("User not authorized", 401));
    }
};
