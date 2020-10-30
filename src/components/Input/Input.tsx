import React, { forwardRef } from 'react';
import cl from 'classnames/bind';

import styles from './Input.module.css';

const cx = cl.bind(styles);

interface InputProps {
    className?: string;
    value: string;
    placeholder?: string;
    name?: string;
    active?: boolean;
    min?: number;
    step?: string;
    onBlur?: () => void;
    onFocus?: () => void;
    onChange: (value: string) => void;
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
            ...props
        },
        ref
    ) => {
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(event.target.value);
        };

        return (
            <input
                ref={ref}
                className={cx('input', className)}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                onFocus={onFocus}
                onTouchMove={onTouchMove}
                {...props}
            />
        );
    }
);

Input.displayName = 'Input';
