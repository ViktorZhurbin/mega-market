import { Response } from '@/hooks/useData';
import { ProductType } from '@/modules/product/typings';

export type CartItemType = {
    _id: string;
    product: ProductType;
    quantity: number;
};

export type CartType = {
    userId: string;
    products: CartItemType[];
    quantity: number;
    total: number;
};

export type CartResponse = Response<CartType>;
