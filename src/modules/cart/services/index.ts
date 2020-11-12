import { fetcher } from '@src/utils/db/fetcher';
import { GenericResponse } from '@src/typings';

export const updateCartQty = (
    productId: string,
    qty: number
): Promise<GenericResponse> =>
    fetcher('/api/user/cart/updateQty', 'PUT', { productId, qty });

export const addToCart = (productId: string): Promise<GenericResponse> =>
    fetcher('/api/user/cart/add', 'PUT', { productId });
