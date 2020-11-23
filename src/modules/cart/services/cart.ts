import { Stripe } from '@stripe/stripe-js';

import { CartType } from '@/modules/cart/typings';
import { ProductType } from '@/modules/product/typings';
import { fetcher } from '@/utils/api/helpers';

export const clearCart = (): Promise<CartType> =>
    fetcher('/api/cart/clear', 'PUT');

export const updateCartQty = (
    productId: string,
    quantity: number
): Promise<CartType> =>
    fetcher('/api/cart/updateQty', 'PUT', { productId, quantity });

export const deleteCartItem = (productId: string): Promise<CartType> =>
    fetcher('/api/cart/deleteOne', 'PUT', { productId });

export const addToCart = (product: ProductType): Promise<CartType> =>
    fetcher('/api/cart/add', 'PUT', { product });

export const createCheckoutSession = async (stripe: Stripe): Promise<any> => {
    const session = await fetcher('/api/checkout/session', 'POST');
    const result = await stripe.redirectToCheckout({
        sessionId: session.id,
    });

    return result;
};
