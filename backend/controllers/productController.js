import Product from "../model/Product.js";
import fs from 'fs';
import path from 'path';

const addProduct = async (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    });
    try {
        await product.save();
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const removeProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const existingProduct = await Product.findById(id);
        if (existingProduct) {
            // Delete the image file
            const imagePath = path.join(process.cwd(), 'uploads/images', path.basename(existingProduct.image));
            fs.unlink(imagePath, async (err) => {
                if (err) {
                    console.error('Error deleting the image file:', err);
                    return res.status(500).json({ success: false, message: 'Failed to delete image file' });
                }

            });
            // Delete the product from the database
            await Product.deleteOne({ _id: id });
            res.status(200).json({ success: true, message: "Product removed" });
        } else {
            res.status(404).json({ success: false, message: "Product does not exist" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data:products });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export { addProduct, removeProduct,getAllProducts };
