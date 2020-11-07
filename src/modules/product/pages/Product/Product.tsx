import Image from 'next/image';
import { useSession } from 'next-auth/client';
import { mutate } from 'swr';

import { formatPrice } from '@src/utils/string';
import { Layout } from '@src/components/Layout';
import { ProductType } from '../../typings';
import { addToCart } from '@user/services';
import styles from './Product.module.css';
import { useData } from '@src/hooks/useData';
import { UserType } from '@user/typings';

type Props = {
    product: ProductType;
};

export const ProductComponent: React.FC<Props> = ({ product }) => {
    const { image, title, description, price } = product;
    const [session] = useSession();
    const { data: user, isLoading } = useData<UserType>(
        `/api/user/${session.userId}`
    );

    const handleAddToCart = () => {
        addToCart(product);
        mutate(`/api/user/${session.userId}`);
    };

    const AddToCartButton = (
        <button className={styles.addToCart} onClick={handleAddToCart}>
            Добавить в корзину
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
