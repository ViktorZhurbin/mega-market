import mongoose from 'mongoose';
import { ProductSchema } from './Product';

export const AccountSchema = new mongoose.Schema({
    compoundId: String,
    userId: mongoose.Types.ObjectId,
    providerType: String,
    providerId: String,
    accessToken: String,
    createdAt: Date,
    updatedAt: Date,
    todos: [ProductSchema],
});

export const Account =
    mongoose.models?.Account || mongoose.model('Account', AccountSchema);
