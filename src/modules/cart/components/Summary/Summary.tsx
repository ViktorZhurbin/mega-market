import { formatPrice } from '@src/utils/string';
import { getDeclension } from '@src/utils/string/getDeclension';
import styles from './Summary.module.css';

type Props = {
    qty: number;
    amount: number;
};

export const Summary: React.FC<Props> = ({ qty, amount }) => {
    return (
        <>
            <div className={styles.wrapper}>
                <span className={styles.title}>Your Cart</span>
                <span className={styles.subtitle}>
                    {getDeclension('item', qty)}
                </span>
            </div>
            <div className={styles.wrapper}>
                <span className={styles.title}>Total</span>
                <span className={styles.title}>{formatPrice(amount)}</span>
            </div>
        </>
    );
};
