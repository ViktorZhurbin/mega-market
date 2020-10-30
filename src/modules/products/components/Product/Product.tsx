import React from 'react';

import { Product } from '../../typings';
import styles from './Product.module.css';

interface ProductProps {
    product: Product;
}

export const ProductComponent: React.FC<ProductProps> = ({ product }) => {
    return (
        <div className={styles.product}>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>{product.price}</div>
        </div>
    );
};
