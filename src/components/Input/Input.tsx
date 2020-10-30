import React, { forwardRef } from 'react';
import cl from 'classnames/bind';

import styles from './TextField.module.css';

const cx = cl.bind(styles);

interface InputProps {
    className?: string;
    value: string;
    placeholder?: string;
    name?: string;
    active?: boolean;
    onBlur?: () => void;
    onFocus?: () => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    onTouchMove?: () => void;
    ref?: React.RefObject<HTMLInputElement>;
    type?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            value = '',
            placeholder = '',
            onBlur,
            onFocus,
            onChange,
            onTouchMove,
            onKeyDown,
            type = 'text',
        },
        ref
    ) => {
        return (
            <input
                ref={ref}
                className={cx('input', className)}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                onFocus={onFocus}
                onTouchMove={onTouchMove}
            />
        );
    }
);

Input.displayName = 'Input';
