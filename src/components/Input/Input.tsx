import cx from 'classnames';

import styles from './Input.module.css';

type InputProps = {
    className?: string;
    value: string;
    placeholder?: string;
    name?: string;
    active?: boolean;
    min?: number;
    step?: string;
    onBlur?(): void;
    onFocus?(): void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    onTouchMove?(): void;
    ref?: React.RefObject<HTMLInputElement>;
    type?: string;
};

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
    return (
        <input
            className={cx(styles.input, className)}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onFocus={onFocus}
            onTouchMove={onTouchMove}
            {...props}
        />
    );
};
