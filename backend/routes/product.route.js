import express from 'express';
import mongoose from 'mongoose';

import Product from '../models/products.model.js'; //import the product model
import { deleteProduct, getProduct, updateProduct, createProduct } from '../controller/product.controller.js'; //import the product controller

const router = express.Router();

router.use(express.json()); //allow express to parse json data from the body of the request

router.get('/', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;