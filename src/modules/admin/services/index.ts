import { fetcher } from '@/utils/fetcher';
import { Product } from '../../products/typings';
import { ResponseData } from '../typings/ResponseData';

export const createProduct = (
    title: string,
    price: string
): Promise<ResponseData> =>
    fetcher('/api/products/create', 'POST', { title, price });

export const editProduct = ({
    _id: id,
    title,
    price,
}: Product): Promise<ResponseData> =>
    fetcher('/api/products/updateOne', 'PUT', { id, title, price });

export const deleteProduct = (id: string): Promise<ResponseData> =>
    fetcher('/api/products/deleteOne', 'DELETE', { id });
