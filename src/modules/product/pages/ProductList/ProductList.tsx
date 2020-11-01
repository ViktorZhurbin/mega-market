import React, { useContext } from 'react';

import { Layout } from '@src/components/Layout';

import styles from './ProductList.module.css';
import { ProductItem } from '../../components/ProductItem';
import { Product } from '../../typings';
import { ProductContext } from '@src/contexts/ProductContext';

export const ProductList: React.FC = () => {
    const { data, isLoading, isError } = useContext(ProductContext);

    if (isLoading) {
        return <span>Loading products...</span>;
    }
    if (isError) {
        return <span>ERROR fetching products!</span>;
    }

    return (
        <Layout>
            <div className={styles.container}>
                {data.map((product: Product) => (
                    <ProductItem key={product._id} product={product} />
                ))}
            </div>
        </Layout>
    );
};
