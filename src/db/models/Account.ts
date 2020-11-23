import mongoose from 'mongoose';

export const accountSchema = new mongoose.Schema({
    compoundId: String,
    userId: mongoose.Types.ObjectId,
    providerType: String,
    providerId: String,
    accessToken: String,
    createdAt: Date,
    updatedAt: Date,
});

export const AccountModel =
    mongoose.models?.Account || mongoose.model('Account', accountSchema);
