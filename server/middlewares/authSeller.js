import jwt from 'jsonwebtoken'
import ResponseModel from '../models/ResponseModel.js';



const authSeller = async (req, res, next) => {
    const { sellerToken } = req.cookies;

    if (!sellerToken) {
        return ResponseModel.error(401, "You are not logged in", "Unauthorized").send(res);
    }

    try {
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);

        if (tokenDecode.email === process.env.SELLER_EMAIL) {
            next();
        } else {
            return ResponseModel.error(401, "Invalid token payload", "Unauthorized").send(res);
        }


    } catch (error) {
        return ResponseModel.error(401, "Invalid or expired token", "Unauthorized", error.message).send(res);
    }
}

export default authSeller