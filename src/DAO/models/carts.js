import { Schema, mongoose } from 'mongoose';

import db from './db.js';

const cartCollection = 'carts';

const cartSchema = new Schema({
    products: {
        type: [
            {
                product: {type: Schema.Types.ObjectId, ref: 'products'},
                quantity: {type: Number}
            }
        ], default: []
    }
})

cartSchema.pre('findOne', function() {
    this.populate('products.product');
})

const cartModel = db.model(cartCollection, cartSchema);

export default cartModel;