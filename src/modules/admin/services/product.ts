import { ProductType } from '@/modules/product/typings';
import { GenericObject } from '@/typings';
import { fetcher } from '@/utils/api/helpers';

export const createProduct = (
    products: ProductType | ProductType[]
): Promise<ProductType[]> =>
    fetcher('/api/admin/products', 'POST', { products });

export const editProduct = ({
    _id,
    title,
    price,
}: ProductType): Promise<ProductType> =>
    fetcher(`/api/admin/products/${_id}`, 'PUT', { title, price });

export const deleteManyProducts = (
    filter: GenericObject
): Promise<GenericObject> => fetcher('/api/admin/products', 'DELETE', filter);
