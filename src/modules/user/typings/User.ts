import { CartItemType } from '@/modules/cart/typings';

export interface SessionUserType {
    _id?: string;
    name: string;
    email?: string;
    image?: string;
    role?: string;
}

export interface UserType extends SessionUserType {
    cart: CartItemType[];
}
