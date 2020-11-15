import { formatPrice, getDeclension } from '@/utils/string';

import styles from './Summary.module.css';

type Props = {
    quantity: number;
    total: number;
};

export const Summary: React.FC<Props> = ({ quantity, total }) => {
    return (
        <>
            <div className={styles.wrapper}>
                <span className={styles.title}>Your Cart</span>
                <span className={styles.subtitle}>
                    {getDeclension('item', quantity)}
                </span>
            </div>
            <div className={styles.wrapper}>
                <span className={styles.title}>Total</span>
                <span className={styles.title}>{formatPrice(total)}</span>
            </div>
        </>
    );
};
