import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/products.controller';

const ProductsRoute = express.Router();

ProductsRoute.get('/', getAllProducts);
ProductsRoute.get('/:id', getProductById);
ProductsRoute.post('/', createProduct);
ProductsRoute.put('/:id', updateProduct);
ProductsRoute.delete('/:id', deleteProduct);

export default ProductsRoute;