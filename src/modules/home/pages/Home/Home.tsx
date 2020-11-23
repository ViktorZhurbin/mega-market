import React from 'react';

import { Layout } from '@/components/Layout';
import { ProductType } from '@/modules/product/typings';

import { ProductItem } from '../../components/ProductItem';
import styles from './Home.module.css';

type Props = {
    products: ProductType[];
};

export const Home: React.FC<Props> = ({ products }) => {
    return (
        <Layout>
            <div className={styles.container}>
                {products.map((product) => (
                    <ProductItem key={product._id} product={product} />
                ))}
            </div>
        </Layout>
    );
};
