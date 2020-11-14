import { fetcher } from '@/utils/api/helpers';
import { GenericResponse } from '@/typings';

export const clearCart = (): Promise<GenericResponse> =>
    fetcher('/api/user/cart/clear', 'PUT');
