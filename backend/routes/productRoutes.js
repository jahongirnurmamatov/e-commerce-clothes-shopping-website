import express from 'express';
import { addProduct, getAllProducts, removeProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/addproduct', addProduct);
productRouter.delete('/:id', removeProduct);
productRouter.get('/getAllProducts', getAllProducts);

export default productRouter;
