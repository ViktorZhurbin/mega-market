import mongoose from 'mongoose';
import { UserType } from '@user/typings';
import { ProductSchema } from './Product';

export const UserSchema = new mongoose.Schema({
    email: String,
    name: String,
    role: String,
    cart: [{ product: ProductSchema, quantity: Number }],
});

export const User =
    mongoose.models?.User ||
    mongoose.model<UserType & mongoose.Document>('User', UserSchema);
