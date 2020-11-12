import Link from 'next/link';
import styles from './Button.module.css';

type Props = {
    onClick?: () => void;
    className?: string;
    color?: string;
    route?: string;
};

export const Button: React.FC<Props> = ({
    color,
    className,
    onClick,
    route,
    children,
}) => {
    const classNames = `${styles[color]} ${className}`;

    return route ? (
        <Link href={route}>
            <a className={`${styles.link} ${classNames}`}>{children}</a>
        </Link>
    ) : (
        <button className={`${styles.btn} ${classNames}`} onClick={onClick}>
            {children}
        </button>
    );
};
