import { ProductType } from '@/modules/product/typings';
import { ApiResponse, GenericObject } from '@/typings';
import { fetcher } from '@/utils/api/helpers';

export const createProduct = (
    products: ProductType | ProductType[]
): Promise<ApiResponse> =>
    fetcher('/api/admin/products/create', 'POST', { products });

export const editProduct = ({
    _id: id,
    title,
    price,
}: ProductType): Promise<ApiResponse> =>
    fetcher('/api/admin/products/updateOne', 'PUT', { id, title, price });

export const deleteProduct = (id: string): Promise<ApiResponse> =>
    fetcher('/api/admin/products/deleteOne', 'DELETE', { id });

export const deleteManyProducts = (
    filter: GenericObject
): Promise<ApiResponse> =>
    fetcher('/api/admin/products/deleteMany', 'DELETE', filter);
