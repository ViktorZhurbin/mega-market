import Image from 'next/image';

import { formatPrice } from '@src/utils/string';
import { Layout } from '@src/components/Layout';
import { ProductType } from '../../typings';
import styles from './Product.module.css';

type Props = {
    product: ProductType;
};

export const ProductComponent: React.FC<Props> = ({ product }) => {
    const { image, title, description, price } = product;
    const AddToCartButton = (
        <button className={styles.addToCart}>Добавить в корзину</button>
    );

    return (
        <Layout stickyItem={AddToCartButton}>
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
