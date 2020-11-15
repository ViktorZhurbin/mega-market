import { ProductType } from '@/modules/product/typings';

export type CartItemType<T = string> = {
    product: T;
    quantity: number;
};

export type CartResponseType = {
    userId: string;
    products: CartItemType<ProductType>[];
    quantity: number;
    total: number;
};
