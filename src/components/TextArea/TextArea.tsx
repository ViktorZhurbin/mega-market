import React, { forwardRef } from 'react';

import styles from './TextArea.module.css';

interface TextAreaProps {
    className?: string;
    value: string;
    placeholder?: string;
    name?: string;
    active?: boolean;
    rows?: number;
    onBlur?(): void;
    onFocus?(): void;
    onChange?: (value: string) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    onKeyUp?: (event: React.KeyboardEvent) => void;
    onTouchMove?(): void;
    ref?: React.RefObject<HTMLTextAreaElement>;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
            rows = 1,
        },
        ref
    ) => {
        const handleChange = (
            event: React.ChangeEvent<HTMLTextAreaElement>
        ) => {
            const value = event.target.value.replace(/\r?\n|\r/, '');
            onChange(value);
        };

        return (
            <div
                className={`${styles.parent} ${className}`}
                data-value={String(value).trim()}
            >
                <textarea
                    ref={ref}
                    className={styles.textarea}
                    rows={rows}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onTouchMove={onTouchMove}
                />
            </div>
        );
    }
);

TextArea.displayName = 'TextArea';
