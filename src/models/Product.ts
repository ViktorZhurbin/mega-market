import mongoose from 'mongoose';
import { ProductType } from '@product/typings';

export const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
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
    mongoose.models?.Product ||
    mongoose.model<ProductType & mongoose.Document>('Product', ProductSchema);
