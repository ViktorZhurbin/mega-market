import { Stripe } from '@stripe/stripe-js';

import { CartItemType } from '@/modules/cart/typings';
import { ProductType } from '@/modules/product/typings';
import { ApiResponse } from '@/typings';
import { fetcher } from '@/utils/api/helpers';

export const clearCart = (): Promise<ApiResponse<CartItemType>> =>
    fetcher('/api/user/cart/clear', 'PUT');

export const updateCartQty = (
    productId: string,
    quantity: number
): Promise<ApiResponse<CartItemType>> =>
    fetcher('/api/user/cart/updateQty', 'PUT', { productId, quantity });

export const deleteCartItem = (
    productId: string
): Promise<ApiResponse<CartItemType>> =>
    fetcher('/api/user/cart/deleteOne', 'PUT', { productId });

export const addToCart = (
    product: ProductType
): Promise<ApiResponse<CartItemType>> =>
    fetcher('/api/user/cart/add', 'PUT', { product });

export const createCheckoutSession = async (stripe: Stripe): Promise<any> => {
    const session = await fetcher('/api/checkout/session', 'POST');
    const result = await stripe.redirectToCheckout({
        sessionId: session.id,
    });

    return result;
};
