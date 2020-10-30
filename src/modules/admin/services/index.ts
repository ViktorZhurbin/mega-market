import { fetcher } from '@/utils/fetcher';
import { Product } from '../../products/typings';
import { ResponseData } from '../typings/ResponseData';
import { GenericObject } from '@/typings/GenericObject';

export const createProduct = (
    products: Product | Product[]
): Promise<ResponseData> =>
    fetcher('/api/products/create', 'POST', { products });

export const editProduct = ({
    _id: id,
    title,
    price,
}: Product): Promise<ResponseData> =>
    fetcher('/api/products/updateOne', 'PUT', { id, title, price });

export const deleteProduct = (id: string): Promise<ResponseData> =>
    fetcher('/api/products/deleteOne', 'DELETE', { id });

export const deleteManyProducts = (
    filter: GenericObject
): Promise<ResponseData> =>
    fetcher('/api/products/deleteMany', 'DELETE', filter);
