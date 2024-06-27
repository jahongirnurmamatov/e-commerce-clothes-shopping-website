import express from 'express';
import { addProduct, getAllProducts, getNewCollections, removeProduct,getPopularWomen } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/addproduct', addProduct);
productRouter.delete('/:id', removeProduct);
productRouter.get('/getAllProducts', getAllProducts);
productRouter.get('/newcollections',getNewCollections);
productRouter.get('/popularinwomen',getPopularWomen);
export default productRouter;
