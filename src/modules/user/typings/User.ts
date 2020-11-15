import { CartItemType } from '@/modules/cart/typings';
import { ProductType } from '@/modules/product/typings';

export type SessionUserType = {
    _id?: string;
    email?: string;
    image?: string;
    name?: string;
    role?: string;
};

export type UserWithCartType = SessionUserType & {
    cart: CartItemType[];
};

export type UserWithExtendedCartType = SessionUserType & {
    cart: {
        products: CartItemType<ProductType>[];
        quantity: number;
        total: number;
    };
};
