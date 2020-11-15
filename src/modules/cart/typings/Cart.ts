import { ProductType } from '@/modules/product/typings';

export type CartItemType = {
    product: string;
    quantity: number;
};

export type PopulatedCartItemType = Omit<CartItemType, 'product'> & {
    product: ProductType;
};
