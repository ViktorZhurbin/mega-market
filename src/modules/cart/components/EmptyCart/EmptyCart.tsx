import styles from './EmptyCart.module.css';

export const EmptyCart: React.FC = () => (
    <div className={styles.wrapper}>
        <h1 className={styles.title}>Cart is empty</h1>
        <p className={styles.subtitle}>
            Search catalog to find whatever you need
        </p>
    </div>
);
