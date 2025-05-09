import mongoose from "mongoose";
import Product from "../models/products.model.js"

export const getProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({success: false, message: 'Server error'});
    }
}

export const createProduct = async (req, res) => {
    const product = req.body; //user send data

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: 'Please fill all fields'});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.error('Error saving product:', error.message);
        res.status(500).json({success: false, message: 'Server error'});
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params; //get the id from the url
    const product = req.body; //user send data

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: 'Invalid product ID'});
    }

    try {
        const updateProduct = await Product.findByIdAndUpdate(id, product, { new: true }); //new: true means return the updated document
        res.status(200).json({ success: true, data: updateProduct });
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).json({success: false, message: 'Server error'});
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params; //get the id from the url
    console.log('Deleting product with ID:', id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: 'Invalid product ID'});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success:true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error.message);
        res.status(500).json({success: false, message: 'Server error'});
    }
}
