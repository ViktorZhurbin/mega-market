import { Product } from '../@types';
import { fetcher } from '@/utils/fetcher';
import { ResponseData } from '../@types/ResponseData';

export const updateAllProducts = (
    updatedProducts: Product[]
): Promise<ResponseData> =>
    fetcher('/api/product/updateAll', 'POST', { updatedProducts });

export const createProduct = (task: string): Promise<ResponseData> =>
    fetcher('/api/product/create', 'POST', { task });

export const editProduct = ({
    _id: id,
    task,
}: Product): Promise<ResponseData> =>
    fetcher('/api/product/edit', 'PUT', { id, task });

export const deleteProduct = (id: string): Promise<ResponseData> =>
    fetcher('/api/product/delete', 'DELETE', { id });
