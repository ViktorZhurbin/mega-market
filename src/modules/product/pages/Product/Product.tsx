import Image from 'next/image';
import { useSession } from 'next-auth/client';
import { mutate } from 'swr';

import { formatPrice } from '@src/utils/string';
import { Layout } from '@src/components/Layout';
import { ProductType } from '../../typings';
import { addToCart } from '@cart/services';
import styles from './Product.module.css';

type Props = {
    product: ProductType;
};

export const Product: React.FC<Props> = ({ product }) => {
    const { _id, image, title, description, price } = product;
    const [session] = useSession();

    const handleAddToCart = async () => {
        await addToCart(_id);
        mutate(`/api/user/${session.userId}`);
    };

    const AddToCartButton = (
        <button className={styles.addToCart} onClick={handleAddToCart}>
            Add to cart
        </button>
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
