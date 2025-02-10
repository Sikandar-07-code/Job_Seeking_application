import express from 'express';
import { login, register, logout, getUser } from '../controllers/userController.js';  // Ensure the correct path to your controller file
import { isAuthorized } from "../middlewares/auth.js";  // Ensure the correct path

const router = express.Router();

router.post('/register', register);  // Endpoint for registering new users
router.post('/login', login);        // Endpoint for logging in users
router.get('/logout', isAuthorized, logout);  // Endpoint for logging out users
router.get('/getuser', isAuthorized, getUser);

export default router;
