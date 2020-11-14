import { useState } from 'react';

import { Input } from '@/components/Input';
import { createProduct } from '../../services';

import styles from './AddProductForm.module.css';

export const AddProductForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!title || !price) {
            return;
        }

        await createProduct({
            title,
            description,
            price: Number(price),
            image,
        });
        setTitle('');
        setDescription('');
        setPrice('');
    };

    return (
        <div>
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
                    className={styles.input}
                    placeholder="Image URL"
                    onChange={setImage}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};
