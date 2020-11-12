import styles from './Button.module.css';

type Props = {
    onClick: () => void;
    className?: string;
    color?: string;
};

const getColor = (color: string) => {
    switch (color) {
        case 'red':
            return '#f91155';
        case 'green':
            return '#3ac267';
        default:
            return '#005bff';
    }
};

export const Button: React.FC<Props> = ({
    color,
    className,
    onClick,
    children,
}) => (
    <button
        style={{ backgroundColor: getColor(color) }}
        className={`${styles.btn} ${className}`}
        onClick={onClick}
    >
        {children}
    </button>
);
