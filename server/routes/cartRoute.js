import express from 'express'; // Import express
import authUser from "../middlewares/authUser.js";
import { updateCart } from "../controllers/cartController.js";

const cartRouter = express.Router(); // Dùng express.Router()
cartRouter.post('/update', authUser, updateCart);

export default cartRouter;