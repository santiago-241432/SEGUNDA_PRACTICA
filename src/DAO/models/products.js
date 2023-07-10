import mongoose from 'mongoose';

import db from './db.js';

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true, index: true }
    
})


const usersModel = db.model(productCollection, productSchema);

export default usersModel;