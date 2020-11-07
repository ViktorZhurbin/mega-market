import React from 'react';

import { Layout } from '@src/components/Layout';

import styles from './ProductList.module.css';
import { ProductItem } from '../../components/ProductItem';
import { ProductType } from '../../typings';
import { useData } from '@src/hooks/useData';

export const ProductList: React.FC = () => {
    const { data, isLoading, isError } = useData<ProductType[]>(
        '/api/product/get'
    );

    return (
        <Layout>
            {isLoading && <span>Loading products...</span>}
            {isError && <span>ERROR fetching products!</span>}
            {data && (
                <div className={styles.container}>
                    {data.map((product) => (
                        <ProductItem key={product._id} product={product} />
                    ))}
                </div>
            )}
        </Layout>
    );
};
