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
        <form onSubmit={handleSubmit} className={styles.container}>
            <TextArea
                name="title"
                value={title}
                placeholder="Title"
                onChange={setTitle}
            />
            <TextArea
                name="price"
                value={price}
                placeholder="Price"
                onChange={setPrice}
            />
        </form>
    );
};
