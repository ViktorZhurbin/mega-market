import mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

export const Product =
    mongoose.models?.Product || mongoose.model('Product', ProductSchema);
