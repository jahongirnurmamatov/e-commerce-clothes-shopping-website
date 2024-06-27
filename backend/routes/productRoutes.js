import express from 'express';
import { addProduct, getAllProducts, getNewCollections, removeProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/addproduct', addProduct);
productRouter.delete('/:id', removeProduct);
productRouter.get('/getAllProducts', getAllProducts);
productRouter.get('/newcollections',getNewCollections);
export default productRouter;
