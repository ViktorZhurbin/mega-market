import mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: Object,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    totalQuantity: { type: Number, required: true },
});

export const Order =
    mongoose.models?.Order || mongoose.model('Order', OrderSchema);
