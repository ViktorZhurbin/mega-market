import React from 'react';

import { useData } from '@/hooks/useData';
import styles from './ProductList.module.css';
import { ProductComponent } from '../../components/Product';
import { Product } from '../../@types';

export const ProductList: React.FC = () => {
    const { data, isLoading, isError } = useData('/api/todo/get');

    if (isLoading) {
        return <span>Loading products...</span>;
    }
    if (isError) {
        return <span>ERROR fetching products!</span>;
    }

    return (
        <div className={styles.container}>
            {data.map((product: Product) => (
                <ProductComponent product={product} />
            ))}
        </div>
    );
};
