import { CartItemType } from '@/modules/cart/typings';

export type SessionUserType = {
    _id?: string;
    name: string;
    email?: string;
    image?: string;
    role?: string;
};

export type UserType = SessionUserType & {
    cart: CartItemType[];
};
