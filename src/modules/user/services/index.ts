import { fetcher } from '@src/utils/db/fetcher';
import { ProductType } from '@src/modules/product/typings';
import { GenericResponse } from '@src/typings';

export const addToCart = (product: ProductType): Promise<GenericResponse> =>
    fetcher('/api/user/cart/add', 'PUT', product);
