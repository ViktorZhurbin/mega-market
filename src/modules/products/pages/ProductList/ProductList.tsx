import React from 'react';

import { useData } from 'src/hooks/useData';
import styles from './ProductList.module.css';
import { ProductComponent } from '../../components/Product';
import { Product } from '../../typings';

export const ProductList: React.FC = () => {
    const { data, isLoading, isError } = useData('/api/products/get');

    if (isLoading) {
        return <span>Loading products...</span>;
    }
    if (isError) {
        return <span>ERROR fetching products!</span>;
    }

    return (
        <div className={styles.container}>
            {data.map((product: Product) => (
                <ProductComponent key={product._id} product={product} />
            ))}
        </div>
    );
};
