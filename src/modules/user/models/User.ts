import mongoose from 'mongoose';

import { UserType } from '@/modules/user/typings';

export const userSchema = new mongoose.Schema<UserType>({
    email: String,
    name: String,
    role: String,
});

export const UserModel =
    mongoose.models?.User ||
    mongoose.model<UserType & mongoose.Document>('User', userSchema);
