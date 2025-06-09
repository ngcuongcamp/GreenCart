

// update user cartdata /api/cart/update

import User from "../models/UserModel.js";



export const updateCart = async (req, res) => {
    try {
        const { userId, cartItems } = req.body;

        await User.findByIdAndUpdate(userId, { cartItems })

        return ResponseModel.success(201, "Cart updated", "Cart updated").send(res);

    }

    catch (error) {
        console.error("updateCart error:", error.message);
        return ResponseModel.error(500, "Internal Server Error", "Server error").send(error.message);
    }
}