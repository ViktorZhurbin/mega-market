import { OrderType } from '~cart/typings';
import { ProductType } from '@/modules/product/typings';

export type UserType = {
    _id?: string;
    email?: string;
    image?: string;
    name: string;
    role: string;
    cart: [{ _id?: string; product: ProductType; quantity: number }];
};

export type UserResponse = {
    user: UserType;
    order: OrderType;
};
