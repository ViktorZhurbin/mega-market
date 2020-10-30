import React, { useState } from 'react';
import faker from 'faker';

import { Input } from '@/components/Input';
import { Product } from '@/modules/products/typings';
import { createProduct, deleteManyProducts } from '../../services';
import styles from './CreateProduct.module.css';

export const CreateProduct: React.FC = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [imageSm, setImageSm] = useState('');
    const [imageXl, setImageXl] = useState('');

    const createNFakeProducts = async (n: number) => {
        const products: Product[] = [];
        for (let index = 0; index < n; index++) {
            products.push({
                title: faker.commerce.productName(),
                price: faker.commerce.price(),
                image: {
                    sm: faker.image.unsplash.imageUrl(
                        180,
                        180,
                        'technology',
                        'product'
                    ),
                    xl: faker.image.unsplash.imageUrl(
                        580,
                        580,
                        'technology',
                        'product'
                    ),
                },
            });
        }

        await createProduct(products);
    };

    const clearProducts = () => deleteManyProducts({});

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!title || !price) {
            return;
        }

        await createProduct({
            title,
            price,
            image: { sm: imageSm, xl: imageXl },
        });
        setTitle('');
        setPrice('');
    };

    return (
        <div className={styles.container}>
            <h2>Add fake products to DB</h2>
            <button onClick={() => createNFakeProducts(10)}>Generate</button>

            <h2>Delete all products in DB</h2>
            <button onClick={() => clearProducts()}>Clear</button>

            <h2>Create Product</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                    name="title"
                    value={title}
                    className={styles.input}
                    placeholder="Title"
                    onChange={setTitle}
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
                    name="imageSm"
                    value={imageSm}
                    className={styles.input}
                    placeholder="Small Image URL"
                    onChange={setImageSm}
                />
                <Input
                    name="imageXl"
                    value={imageXl}
                    className={styles.input}
                    placeholder="Large Image URL"
                    onChange={setImageXl}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};
