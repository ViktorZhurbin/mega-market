import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: String,
    name: String,
    role: String,
});

export const User = mongoose.models?.User || mongoose.model('User', UserSchema);
