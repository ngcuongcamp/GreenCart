import ResponseModel from "../models/ResponseModel.js";
import { myRegex } from "../ultils/regex.js";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import jwt from 'jsonwebtoken';

// 1. Register a new user at /api/user/register
export const register = async (req, res) => {
    try {
        const { fullname, username, email, password } = req.body;

        // Check for missing required fields
        if (!fullname || !username || !email || !password) {
            return ResponseModel.error(400, "Missing information to register", "Missing fields").send(res);
        }

        // Validate fullname format
        if (!myRegex.fullnameRegex.pattern.test(fullname)) {
            return ResponseModel.error(
                400,
                myRegex.fullnameRegex.message,
                myRegex.fullnameRegex.shortMessage
            ).send(res);
        }

        // Validate username format
        if (!myRegex.usernameRegex.pattern.test(username)) {
            return ResponseModel.error(
                400,
                myRegex.usernameRegex.message,
                myRegex.usernameRegex.shortMessage
            ).send(res);
        }

        // Check if username already exists
        const existingUsername = await UserModel.findOne({ username });
        if (existingUsername) {
            return ResponseModel.error(409, "Username already exists", "Username taken").send(res);
        }

        // Validate email format
        if (!myRegex.emailRegex.pattern.test(email)) {
            return ResponseModel.error(
                400,
                myRegex.emailRegex.message,
                myRegex.emailRegex.shortMessage
            ).send(res);
        }

        // Check if email already exists
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return ResponseModel.error(409, "Email already exists", "Email taken").send(res);
        }

        // Validate password format
        if (!myRegex.passwordRegex.pattern.test(password)) {
            return ResponseModel.error(
                400,
                myRegex.passwordRegex.message,
                myRegex.passwordRegex.shortMessage
            ).send(res);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to database
        const userData = { fullname, username, email, password: hashedPassword };
        const user = await UserModel.create(userData);

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true, // Prevent JavaScript to access cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time
        });

        // Return response to client, excluding password
        const responseData = { fullname, username, email };
        return ResponseModel.success(
            201,
            "User registered successfully!",
            "Registration complete",
            responseData
        ).send(res);


    } catch (error) {
        console.error("Registration error:", error.message);
        return ResponseModel.error(500, "Internal Server Error", "Server error").send(res);
    }
};


// 2. Login user at /api/user/login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for missing fields
        if (!email || !password) {
            return ResponseModel.error(400, "Missing email or password", "Missing fields").send(res);
        }

        // Validate email format
        if (!myRegex.emailRegex.pattern.test(email)) {
            return ResponseModel.error(
                400,
                myRegex.emailRegex.message,
                myRegex.emailRegex.shortMessage
            ).send(res);
        }

        // Validate password format
        if (!myRegex.passwordRegex.pattern.test(password)) {
            return ResponseModel.error(
                400,
                myRegex.passwordRegex.message,
                myRegex.passwordRegex.shortMessage
            ).send(res);
        }

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return ResponseModel.error(401, "Email or password is incorrect", "Invalid credentials").send(res);
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return ResponseModel.error(401, "Email or password is incorrect", "Invalid credentials").send(res);
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return ResponseModel.success(
            200,
            "Login successful!",
            "Login complete",
        ).send(res);

    } catch (error) {
        console.error("Login error:", error.message);
        return ResponseModel.error(500, "Internal Server Error", "Server error").send(res);
    }
};


// 3. Logout: /api/user/logout

export const logout = (req, res) => {


    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return ResponseModel.success(
            200,
            "Logout successful",
            "Logged out"
        ).send(res);
    } catch (error) {
        console.error("Logout error:", error.message);
        return ResponseModel.error(
            500,
            "Logout failed due to server error",
            "Logout error"
        ).send(res);
    }
};


// 4. Check Auth: /api/user/is-auth
export const isAuth = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return ResponseModel.error(400, "User ID not provided", "Missing userId").send(res);
        }

        const user = await UserModel.findById(userId).select("-password");
        if (!user) {
            return ResponseModel.error(404, "User not found", "No user").send(res);
        }

        return ResponseModel.success(
            200,
            "User authenticated",
            "Authenticated",
        ).send(res);
    } catch (error) {
        console.error("isAuth error:", error.message);
        return ResponseModel.error(
            500,
            "Server error while checking auth",
            "Auth check failed",
            error.message
        ).send(res);
    }
};