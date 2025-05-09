// entry point for api
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/products.model.js';
import mongoose from 'mongoose';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; //use the port from the environment variable or 5000 if not set

app.use(express.json()); //allow express to parse json data from the body of the request

app.use('/api/products',productRoutes) //use the productRoutes for all routes that start with /api/products

app.listen(5000, () => {
    connectDB();
    console.log('MongoDB connected');
    console.log('Server started at http://localhost:'+ PORT);
});

