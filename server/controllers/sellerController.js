import jwt from 'jsonwebtoken'
import ResponseModel from '../models/ResponseModel.js'


// 1. login seller: /api/seller/login
export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' })

            console.log(token)

            res.cookie('sellerToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return ResponseModel.success(
                200,
                "Seller login successful!",
                "Seller login complete",
            ).send(res);
        }
        else {
            return ResponseModel.error(401, "Invalid Credentials").send(res)
        }
    }
    catch (error) {
        return ResponseModel.error(500, "Internal Server Error").send(res)
    }
}


// 2. Seller isSellerAuth: /api/seller/is-auth

export const isSellerAuth = async (req, res) => {
    try {

        return ResponseModel.success(
            200,
            "Seller authenticated",
            "Authenticated",
        ).send(res);
    } catch (error) {
        console.error("isSellerAuth error:", error.message);
        return ResponseModel.error(
            500,
            "Server error while checking auth",
            "Auth check failed",
            error.message
        ).send(res);
    }
};


// 3. Logout: /api/seller/logout

export const sellerLogout = (req, res) => {

    try {
        res.clearCookie("sellerToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return ResponseModel.success(
            200,
            "Seller logout successful",
            "Logged out"
        ).send(res);
    } catch (error) {
        console.error("Seller logout error:", error.message);
        return ResponseModel.error(
            500,
            "Seller logout failed due to server error",
            "Seller logout error"
        ).send(res);
    }
};