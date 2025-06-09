import express from 'express'
import { upload } from '../configs/multer.js'
import authSeller from '../middlewares/authSeller.js'
import { addProduct, getProductsList, getProductById, changeStock } from '../controllers/productController.js'


const productRouter = express.Router()

productRouter.post('/add', upload.array('images'), authSeller, addProduct)

productRouter.get("/list", getProductsList)
productRouter.get("/id", getProductById)
productRouter.get("/change", authSeller, changeStock)


export default productRouter