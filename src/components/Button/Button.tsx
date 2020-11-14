import Link from 'next/link';
import cx from 'classnames';

import styles from './Button.module.css';

type Props = {
    onClick?(): void;
    className?: string;
    color?: string;
    route?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
};

export const Button: React.FC<Props> = ({
    color,
    className,
    onClick,
    route,
    children,
    type,
    disabled,
}) => {
    const classNames = cx(styles[color], className);

    return route ? (
        <Link href={route}>
            <a className={cx(styles.link, classNames)}>{children}</a>
        </Link>
    ) : (
        <button
            type={type}
            className={cx(styles.btn, classNames)}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
