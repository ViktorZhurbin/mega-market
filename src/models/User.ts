import mongoose from 'mongoose';
import { ProductSchema } from './Product';

export const UserSchema = new mongoose.Schema({
    email: String,
    name: String,
    role: String,
    cart: [{ product: ProductSchema, quantity: Number }],
});

export const User = mongoose.models?.User || mongoose.model('User', UserSchema);
