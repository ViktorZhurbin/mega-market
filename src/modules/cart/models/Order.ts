import mongoose from 'mongoose';

export const orderSchema = new mongoose.Schema({
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
    totalAmount: { type: Number, required: true },
});

export const OrderModel =
    mongoose.models?.Order || mongoose.model('Order', orderSchema);
