import jwt from 'jsonwebtoken'
import ResponseModel from '../models/ResponseModel.js';

const authUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return ResponseModel.error(401, "You are not logged in", "Unauthorized").send(res);
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.userId) {
            req.body.userId = tokenDecode.userId;
            return next();
        } else {
            return ResponseModel.error(401, "Invalid token payload", "Unauthorized").send(res);
        }
    } catch (error) {
        return ResponseModel.error(401, "Invalid or expired token", "Unauthorized", error.message).send(res);
    }
};

export default authUser;
