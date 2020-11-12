import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { formatPrice } from '@src/utils/string';
import { Input } from '@src/components/Input';
import { CartItemType } from '../../typings';
import { updateCartQty } from '../../services';

import styles from './CartItem.module.css';

type Props = CartItemType;

export const CartItem: React.FC<Props> = ({ product, quantity }) => {
    const { _id, title, price, image } = product;
    const [qty, setQty] = useState(quantity.toString());

    useEffect(() => {
        updateCartQty(product._id, Number(qty));
    }, [product._id, qty]);

    return (
        <div className={styles.container}>
            <Image src={image} width={52} height={64} className={styles.img} />
            <div className={styles.innerWrapper}>
                <span className={styles.price}>{formatPrice(price)}</span>
                <Link href={`/product/${_id}`}>
                    <a className={styles.title}>{title}</a>
                </Link>
                <Input
                    value={qty}
                    className={styles.quantity}
                    type="number"
                    min={1}
                    onChange={setQty}
                />
            </div>
        </div>
    );
};
