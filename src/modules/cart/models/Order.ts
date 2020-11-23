import mongoose from 'mongoose';

import { productSchema } from '@/modules/product/models';

export const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    total: {
        type: Number,
        required: true,
        default: 0,
    },
    products: [
        {
            product: productSchema,
            quantity: {
                type: Number,
                required: true,
                default: 0,
            },
            total: {
                type: Number,
                required: true,
                default: 0,
            },
        },
    ],
});

export const OrderModel =
    mongoose.models?.Order || mongoose.model('Order', orderSchema);
