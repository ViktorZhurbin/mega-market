import { ProductType } from '@/modules/product/typings';
import { ApiResponse, GenericObject } from '@/typings';
import { fetcher } from '@/utils/api/helpers';

export const createProduct = (
    products: ProductType | ProductType[]
): Promise<ApiResponse> => fetcher('/api/admin/products', 'POST', { products });

export const editProduct = ({
    _id,
    title,
    price,
}: ProductType): Promise<ApiResponse> =>
    fetcher(`/api/admin/products/${_id}`, 'PUT', { title, price });

export const deleteProduct = (id: string): Promise<ApiResponse> =>
    fetcher(`/api/admin/products/${id}`, 'DELETE');

export const deleteManyProducts = (
    filter: GenericObject
): Promise<ApiResponse> => fetcher('/api/admin/products', 'DELETE', filter);
