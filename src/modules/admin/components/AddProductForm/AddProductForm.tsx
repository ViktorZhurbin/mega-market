import { Input } from '@/components/Input';

import styles from './AddProductForm.module.css';
import { FieldNames, useFormReducer } from './formReducer';

const { title, description, image, price } = FieldNames;

export const AddProductForm: React.FC = () => {
    const { state, handleInput, handleSubmit } = useFormReducer();

    return (
        <div>
            <h2>Create Product</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                    name={title}
                    value={state[title]}
                    className={styles.input}
                    placeholder="Title"
                    onChange={handleInput}
                />
                <Input
                    name={description}
                    value={state[description]}
                    className={styles.input}
                    placeholder="Description"
                    onChange={handleInput}
                />
                <Input
                    name={price}
                    value={state[price]}
                    className={styles.input}
                    placeholder="Price"
                    onChange={handleInput}
                    type="number"
                    min={1}
                    step="any"
                />
                <Input
                    name={image}
                    value={state[image]}
                    className={styles.input}
                    placeholder="Image URL"
                    onChange={handleInput}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};
