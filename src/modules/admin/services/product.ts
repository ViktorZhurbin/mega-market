import { fetcher } from '@src/utils/api/helpers/fetcher';
import { ProductType } from '@product/typings';
import { GenericObject, GenericResponse } from '@src/typings';

export const createProduct = (
    products: ProductType | ProductType[]
): Promise<GenericResponse> =>
    fetcher('/api/admin/products/create', 'POST', { products });

export const editProduct = ({
    _id: id,
    title,
    price,
}: ProductType): Promise<GenericResponse> =>
    fetcher('/api/admin/products/updateOne', 'PUT', { id, title, price });

export const deleteProduct = (id: string): Promise<GenericResponse> =>
    fetcher('/api/admin/products/deleteOne', 'DELETE', { id });

export const deleteManyProducts = (
    filter: GenericObject
): Promise<GenericResponse> =>
    fetcher('/api/admin/products/deleteMany', 'DELETE', filter);
