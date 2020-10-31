import React from 'react';
import Image from 'next/image';

import { Product } from '../../typings';
import styles from './Product.module.css';
import { formatPrice } from 'src/utils/string';

interface ProductProps {
    product: Product;
}

export const ProductComponent: React.FC<ProductProps> = ({
    product: { title, price, image },
}) => {
    return (
        <div className={styles.container}>
            <Image
                className={styles.image}
                src={image}
                width="180"
                height="180"
                alt={title}
                title={title}
            />
            <div className={styles.details}>
                <div className={styles.price}>{formatPrice(price)}</div>
                <div className={styles.title}>{title}</div>
            </div>
        </div>
    );
};
