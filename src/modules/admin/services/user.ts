import { GenericResponse } from '@/typings';
import { fetcher } from '@/utils/api/helpers';

export const clearCart = (): Promise<GenericResponse> =>
    fetcher('/api/user/cart/clear', 'PUT');
