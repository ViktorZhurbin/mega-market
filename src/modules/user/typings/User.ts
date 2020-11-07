import { ProductType } from '@product/typings';

export type UserType = {
    _id?: string;
    email: string;
    name: string;
    role: string;
    cart: [{ product: ProductType; quantity: number }];
};
