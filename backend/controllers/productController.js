import Product from "../model/Product.js";

const addProduct = async (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    });
    console.log(product);
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
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export { addProduct, removeProduct,getAllProducts };
