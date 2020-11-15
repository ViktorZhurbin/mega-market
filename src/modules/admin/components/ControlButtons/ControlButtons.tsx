import faker from 'faker';

import { Button } from '@/components/Button';
import { clearCart } from '@/modules/cart/services';
import { ProductType } from '@/modules/product/typings';

import { createProduct, deleteManyProducts } from '../../services';
import styles from './ControlButtons.module.css';

const getShuffledArray = (length: number) =>
    Array.from({ length }, (_, i) => i + 1).sort(() => Math.random() - 0.5);

const generateNFakeProducts = (length: number): ProductType[] => {
    const arr = getShuffledArray(length);

    return arr.map((num) => ({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.random.number({ min: 1, max: 1000 }),
        image: `/images/${num}.webp`,
    }));
};

export const ControlButtons: React.FC = () => {
    const fillDb = () => createProduct(generateNFakeProducts(10));
    const clearDb = async () => {
        await deleteManyProducts({});
        clearCart();
    };
    const repopulateDb = async () => {
        await clearDb();
        fillDb();
    };

    return (
        <>
            <h1>Admin Controls</h1>
            <div className={styles.container}>
                <div className={styles.btnContainer}>
                    <h2 className={styles.title}>Cart</h2>
                    <Button
                        className={styles.btn}
                        color="red"
                        onClick={clearCart}
                    >
                        Clear
                    </Button>
                </div>
                <h2 className={styles.title}>Products</h2>
                <div className={styles.btnContainer}>
                    <Button
                        color="green"
                        className={styles.btn}
                        onClick={fillDb}
                    >
                        Add Fakes
                    </Button>

                    <Button
                        className={styles.btn}
                        color="red"
                        onClick={clearDb}
                    >
                        Delete All
                    </Button>

                    <Button className={styles.btn} onClick={repopulateDb}>
                        Delete & Add
                    </Button>
                </div>
            </div>
        </>
    );
};
