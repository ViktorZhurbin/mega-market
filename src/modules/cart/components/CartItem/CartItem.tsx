import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Input } from '@/components/Input';
import { useDebounce } from '@/hooks/useDebounce';
import { deleteCartItem, updateCartQty } from '@/modules/cart/services';
import { formatPrice } from '@/utils/string';

import { CartItemType } from '../../typings';
import styles from './CartItem.module.css';

type Props = Partial<CartItemType> & { onChange(): void };

export const CartItem: React.FC<Props> = ({ product, quantity, onChange }) => {
    const { _id, title, price, image } = product;
    const [qty, setQty] = useState(quantity.toString());
    const updatedQty = useDebounce<string>(qty, 500);

    useEffect(() => {
        if (updatedQty && updatedQty !== quantity.toString()) {
            updateCartQty(product._id, updatedQty).then(() => {
                onChange();
            });
        }
    }, [updatedQty, product._id, onChange, quantity]);

    const handleDelete = async () => {
        await deleteCartItem(product._id);
        onChange();
    };

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
                <span className={styles.delete} onClick={handleDelete}>
                    Delete
                </span>
            </div>
        </div>
    );
};
