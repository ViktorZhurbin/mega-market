import { fetcher } from '@src/utils/db/fetcher';
import { GenericResponse } from '@src/typings';

export const clearCart = (): Promise<GenericResponse> =>
    fetcher('/api/user/cart/clear', 'PUT');
