import styles from './Button.module.css';

type Props = {
    onClick: () => void;
    className?: string;
};

export const Button: React.FC<Props> = ({ className, onClick, children }) => (
    <button className={`${styles.btn} ${className}`} onClick={onClick}>
        {children}
    </button>
);
