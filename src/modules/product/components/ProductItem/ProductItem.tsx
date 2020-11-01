import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Product } from '../../typings';
import styles from './ProductItem.module.css';
import { formatPrice } from '@src/utils/string';

interface Props {
    product: Product;
}

export const ProductItem: React.FC<Props> = ({
    product: { _id, title, price, image },
}) => {
    return (
        <Link href={`/product/${_id}`}>
            <a className={styles.container}>
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
            </a>
        </Link>
    );
};
