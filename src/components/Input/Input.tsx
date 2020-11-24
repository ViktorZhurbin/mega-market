import cx from 'classnames';

import styles from './Input.module.css';

interface InputProps {
    className?: string;
    value: string;
    placeholder?: string;
    name?: string;
    active?: boolean;
    min?: number;
    step?: string;
    onBlur?(): void;
    onFocus?(): void;
    onChange: (value: string) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    onTouchMove?(): void;
    ref?: React.RefObject<HTMLInputElement>;
    type?: string;
}

export const Input: React.FC<InputProps> = ({
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
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <input
            className={cx(styles.input, className)}
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
};

Input.displayName = 'Input';
