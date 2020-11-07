import React from 'react';

import { Layout } from '@src/components/Layout';

import styles from './ProductList.module.css';
import { ProductItem } from '../../components/ProductItem';
import { ProductType } from '../../typings';
import { useData } from '@src/hooks/useData';

export const ProductList: React.FC = () => {
    const { data, isLoading, isError } = useData('/api/product/get');

    if (isLoading) {
        return <span>Loading products...</span>;
    }
    if (isError) {
        return <span>ERROR fetching products!</span>;
    }

    return (
        <Layout>
            <div className={styles.container}>
                {data.map((product: ProductType) => (
                    <ProductItem key={product._id} product={product} />
                ))}
            </div>
        </Layout>
    );
};
