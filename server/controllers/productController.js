import mongoose from "mongoose"

import ProductModel from "../models/ProductModel.js"
import { v2 as cloudinary } from "cloudinary"
import ResponseModel from '../models/ResponseModel.js'


// Add Product : /api/products/add

export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData)
        const images = req.files

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(
                    item.path,
                    { resource_type: 'image' });
                return result.secure_url
            })
        )
        await ProductModel.create({ ...productData, image: imagesUrl })

        return ResponseModel.success(201, "Added product", "Added product").send(res);
    }
    catch (error) {
        console.error("add product error:", error.message);
        return ResponseModel.error(500, "Internal Server Error", "Server error").send(error.message);
    }
}


// Get Product: /api/products/list

export const getProductsList = async (req, res) => {
    try {
        const products = await ProductModel.find({})

        return ResponseModel.success(200, "Getted product list", "Getted product list", products).send(res)
    }
    catch (error) {
        console.log(error.message)
        return ResponseModel.error(500, "Internal Server Error", "Server error").send(error.message)
    }
}


// Get Single Product: /api/products/id

export const getProductById = async (req, res) => {
    try {
        const { id } = req.body;

        const product = await ProductModel.findById(id)
        return ResponseModel.success(200, "Getted product by id", "Getted product by id", product).send(res)
    }
    catch (error) {
        console.log(error.message)
        return ResponseModel.error(500, "Internal Server Error", "Server error").send(error.message)
    }
}

// Change Product inStock: /api/products/stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        await ProductModel.findByIdAndUpdate(id, { inStock })
        return ResponseModel.success(200, "Changed stock", "Changed stock", product).send(res)
    }
    catch (error) {
        console.log(error.message)
        return ResponseModel.error(500, "Internal Server Error", "Server error").send(error.message)
    }
}


