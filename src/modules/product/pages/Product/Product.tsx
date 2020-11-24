import Image from 'next/image';

import { Layout } from '@/components/Layout';
import { formatPrice } from '@/utils/string';

import { AddToCartButton } from '../../components/AddToCartButton';
import { ProductType } from '../../typings';
import styles from './Product.module.css';

type Props = {
    product: ProductType;
};

export const Product: React.FC<Props> = ({ product }) => {
    const { image, title, description, price } = product;

    return (
        <Layout stickyItem={<AddToCartButton product={product} />}>
            <div className={styles.container}>
                <Image
                    src={image}
                    width="400"
                    height="415"
                    className={styles.image}
                />
                <h1 className={styles.title}>{title}</h1>
                <span className={styles.price}>{formatPrice(price)}</span>
                <h2 className={styles.title}>Description</h2>
                <div className={styles.description}>{description}</div>
            </div>
        </Layout>
    );
};
