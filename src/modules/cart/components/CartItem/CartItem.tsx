import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@product/typings';
import { formatPrice } from '@src/utils/string';

import styles from './CartItem.module.css';
import { Input } from '@src/components/Input';

type Props = {
    product: Product;
    quantity: string;
};

export const CartItem: React.FC<Props> = ({ product, quantity }) => {
    const { _id, title, price, image } = product;

    return (
        <div className={styles.container}>
            <Image src={image} width={64} height={64} />
            <div className={styles.innerWrapper}>
                <span className={styles.price}>{formatPrice(price)}</span>
                <Link href={`/product/${_id}`}>
                    <a className={styles.title}>{title}</a>
                </Link>
                <Input
                    value={quantity}
                    className={styles.quantity}
                    type="number"
                    min={1}
                    onChange={() => null}
                />
            </div>
        </div>
    );
};
