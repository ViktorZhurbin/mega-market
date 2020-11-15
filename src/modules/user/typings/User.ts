import { CartItemType } from '@/modules/cart/typings';

export type UserType = {
    _id?: string;
    email?: string;
    image?: string;
    name: string;
    role: string;
    cart: CartItemType[];
};
