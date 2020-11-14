import { Stripe } from '@stripe/stripe-js';

import { ProductType } from '@/modules/product/typings';
import { GenericResponse } from '@/typings';
import { fetcher } from '@/utils/api/helpers';
import { OrderType } from '~cart/typings';

export const updateCartQty = (
    productId: string,
    qty: number
): Promise<GenericResponse> =>
    fetcher('/api/user/cart/updateQty', 'PUT', { productId, qty });

export const deleteCartItem = (productId: string): Promise<GenericResponse> =>
    fetcher('/api/user/cart/deleteOne', 'PUT', { productId });

export const addToCart = (product: ProductType): Promise<GenericResponse> =>
    fetcher('/api/user/cart/add', 'PUT', { product });

export const createCheckoutSession = async (
    order: OrderType,
    stripe: Stripe
): Promise<any> => {
    const session = await fetcher('/api/checkout/session', 'POST', {
        order,
    });
    const result = await stripe.redirectToCheckout({
        sessionId: session.id,
    });

    return result;
};
