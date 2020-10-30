import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import { mutate } from 'swr';

import { TextArea } from '@/components/TextArea';
import { Product } from '../../@types';
import { editProduct, deleteProduct } from '../../services';
import styles from './Product.module.css';

const cx = classNames.bind(styles);

interface ProductProps {
    product: Product;
}

export const ProductComponent: React.FC<ProductProps> = ({ product }) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const handleDelete = async () => {
        mutate(
            '/api/product/get',
            async ({ data }: { data: Product[] }) => {
                const newProducts = data.filter(
                    (item) => item._id !== product._id
                );
                return { success: true, data: newProducts };
            },
            false
        );
        await deleteProduct(product._id);
        mutate('/api/product/get');
    };

    const handleEdit = async (value: string) => {
        mutate(
            '/api/product/get',
            async ({ data }: { data: Product[] }) => {
                const newProducts = data.map((item) =>
                    item._id === product._id ? { ...item, task: value } : item
                );
                return { success: true, data: newProducts };
            },
            false
        );
        await editProduct({ ...product, task: value });
        mutate('/api/product/get');
    };

    const handleBlur = () => {
        inputRef?.current?.blur();
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (['Escape', 'Enter'].includes(event.key)) {
            handleBlur();
        }
    };

    return (
        <div className={cx('product')}>
            <TextArea
                ref={inputRef}
                value={product.task}
                className={cx('text')}
                onChange={handleEdit}
                onKeyDown={handleKeyDown}
            />
            <span className={cx('delete')} onClick={handleDelete}>
                X
            </span>
        </div>
    );
};
