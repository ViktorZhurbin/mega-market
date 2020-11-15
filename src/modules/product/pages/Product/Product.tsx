import { signIn, useSession } from 'next-auth/client';
import Image from 'next/image';
import { mutate } from 'swr';

import { Button } from '@/components/Button';
import { Layout } from '@/components/Layout';
import { formatPrice } from '@/utils/string';
import { addToCart } from '@/modules/user/services';

import { ProductType } from '../../typings';
import styles from './Product.module.css';

type Props = {
    product: ProductType;
};

export const Product: React.FC<Props> = ({ product }) => {
    const { image, title, description, price } = product;
    const [session] = useSession();

    const handleClick = async () => {
        if (session) {
            await addToCart(product._id);
            mutate(`/api/user/cart`);
        } else {
            signIn();
        }
    };

    const AddToCartButton = (
        <Button onClick={handleClick}>
            {session ? 'Add to cart' : 'Sign In'}
        </Button>
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
