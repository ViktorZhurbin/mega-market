import { OrderType } from '@cart/typings';
import { ProductType } from '@src/modules/product/typings';

export type UserType = {
    _id?: string;
    email?: string;
    image?: string;
    name: string;
    role: string;
    cart: [{ _id?: string; product: string | ProductType; quantity: number }];
};

export type UserResponse = {
    user: UserType;
    order: OrderType;
};
