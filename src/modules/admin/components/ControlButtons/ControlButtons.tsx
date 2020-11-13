import faker from 'faker';

import { ProductType } from '@src/modules/product/typings';
import { createProduct, deleteManyProducts, clearCart } from '../../services';

import styles from './ControlButtons.module.css';

const getShuffledArray = (length: number) =>
    Array.from({ length }, (_, i) => i + 1).sort(() => Math.random() - 0.5);

const generateNFakeProducts = (length: number): ProductType[] => {
    const arr = getShuffledArray(length);

    return arr.map((num) => ({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: String(faker.random.number({ min: 1, max: 1000 })),
        image: `/images/${num}.webp`,
    }));
};

export const ControlButtons: React.FC = () => {
    const createProducts = () => createProduct(generateNFakeProducts(10));
    const clearProducts = async () => {
        await deleteManyProducts({});
        clearCart();
    };
    const regenerateProducts = async () => {
        await clearProducts();
        createProducts();
    };

    return (
        <>
            <h2 className={styles.title}>Products</h2>

            <div className={styles.btnContainer}>
                {/* <h2>Add fake products to DB</h2> */}
                <button className={styles.btn} onClick={createProducts}>
                    Add Fakes
                </button>

                {/* <h2>Delete all products in DB</h2> */}
                <button
                    className={`${styles.btn} ${styles.btnSecondary}`}
                    onClick={clearProducts}
                >
                    Delete All
                </button>

                <button
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={regenerateProducts}
                >
                    Delete & Add
                </button>
            </div>

            <div className={styles.btnContainer}>
                <h2 className={styles.title}>Cart</h2>
                <button
                    className={`${styles.btn} ${styles.btnSecondary}`}
                    onClick={clearCart}
                >
                    Clear
                </button>
            </div>
        </>
    );
};
