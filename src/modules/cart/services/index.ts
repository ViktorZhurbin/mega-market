import { Stripe } from '@stripe/stripe-js';
import { fetcher } from '@src/utils/db/fetcher';
import { OrderType } from '@cart/typings';
import { GenericResponse } from '@src/typings';

export const updateCartQty = (
    productId: string,
    qty: number
): Promise<GenericResponse> =>
    fetcher('/api/user/cart/updateQty', 'PUT', { productId, qty });

export const deleteCartItem = (productId: string): Promise<GenericResponse> =>
    fetcher('/api/user/cart/deleteOne', 'PUT', { productId });

export const addToCart = (productId: string): Promise<GenericResponse> =>
    fetcher('/api/user/cart/add', 'PUT', { productId });

export const createCheckoutSession = async (
    order: OrderType,
    stripe: Stripe
): Promise<any> => {
    const session = await fetcher('/api/checkout/createSession', 'POST', {
        order,
    });
    const result = await stripe.redirectToCheckout({
        sessionId: session.id,
    });

    return result;
};
