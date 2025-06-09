import mongoose, { mongo, Mongoose } from "mongoose";


const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: Array, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    image: { type: Array, required: true },
    qtyStock: { type: Number, required: true },
    inStock: { type: Boolean, default: true }

}, {
    minimize: false,
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    }
})


const ProductModel = mongoose.model("product", productSchema)

export default ProductModel

