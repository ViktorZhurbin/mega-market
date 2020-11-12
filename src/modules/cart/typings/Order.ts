import { ProductType } from '@product/typings';

export type OrderType = {
    products: {
        product: ProductType;
        quantity: number;
    }[];
    totalQuantity: number;
    totalAmount: number;
    user: {
        id: string;
    };
};
