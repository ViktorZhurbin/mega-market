import React /* , { useState } */ from 'react';
import faker from 'faker';

// import { Input } from '@src/components/Input';
import { Product } from '@src/modules/product/typings';
import { createProduct, deleteManyProducts } from '../../services';
import styles from './CreateProduct.module.css';

const getShuffledArray = (length: number) =>
    Array.from({ length }, (_, i) => i + 1).sort(() => Math.random() - 0.5);

const generateNFakeProducts = (length: number): Product[] => {
    const arr = getShuffledArray(length);

    return arr.map((num) => ({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: String(faker.random.float({ min: 0, max: 1000000 })),
        image: `/images/${num}.webp`,
    }));
};

export const CreateProduct: React.FC = () => {
    // const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');
    // const [price, setPrice] = useState('');
    // const [image, setImage] = useState('');

    const createProducts = () => createProduct(generateNFakeProducts(10));
    const clearProducts = () => deleteManyProducts({});
    const regenerateProducts = async () => {
        await clearProducts();
        createProducts();
    };

    // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     if (!title || !price) {
    //         return;
    //     }

    //     await createProduct({
    //         title,
    //         description,
    //         price,
    //         image,
    //     });
    //     setTitle('');
    //     setDescription('');
    //     setPrice('');
    // };

    return (
        <div className={styles.container}>
            <h2>Clear and populate DB</h2>
            <button onClick={regenerateProducts}>Regenerate</button>

            <h2>Add fake products to DB</h2>
            <button onClick={createProducts}>Generate</button>

            <h2>Delete all products in DB</h2>
            <button onClick={clearProducts}>Clear</button>

            {/* <h2>Create Product</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                    name="title"
                    value={title}
                    className={styles.input}
                    placeholder="Title"
                    onChange={setTitle}
                />
                <Input
                    name="description"
                    value={description}
                    className={styles.input}
                    placeholder="Description"
                    onChange={setDescription}
                />
                <Input
                    name="price"
                    type="number"
                    min={1}
                    step="any"
                    value={price}
                    className={styles.input}
                    placeholder="Price"
                    onChange={setPrice}
                />
                <Input
                    name="image"
                    value={image}
                    className={styles.image}
                    placeholder="Image URL"
                    onChange={setImage}
                />
                <button type="submit">Create</button>
            </form> */}
        </div>
    );
};
