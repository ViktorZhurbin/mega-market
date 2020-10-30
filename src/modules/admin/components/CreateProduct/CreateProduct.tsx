import React, { useState } from 'react';

import { TextArea } from '@/components/TextArea';
import { createProduct } from '../../services';
import styles from './CreateProduct.module.css';

export const CreateProduct: React.FC = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!title || !price) {
            return;
        }

        await createProduct(title, price);
        setTitle('');
        setPrice('');
    };

    return (
        <div className={styles.container}>
            <h2>Create Product</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <TextArea
                    name="title"
                    value={title}
                    className={styles.input}
                    placeholder="Title"
                    onChange={setTitle}
                />
                <TextArea
                    name="price"
                    value={price}
                    className={styles.input}
                    placeholder="Price"
                    onChange={setPrice}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
