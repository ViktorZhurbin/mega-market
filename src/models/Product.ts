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
        sm: String,
        xl: String,
    },
});

export const Product =
    mongoose.models?.Product || mongoose.model('Product', ProductSchema);
