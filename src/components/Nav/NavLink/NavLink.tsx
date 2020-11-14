import Link from 'next/link';
import { useRouter } from 'next/router';
import cx from 'classnames';
import styles from './NavLink.module.css';

type Props = {
    title: string;
    icon: any;
    href: string;
    counter?: number;
};

export const NavLink: React.FC<Props> = ({ title, icon, href, counter }) => {
    const router = useRouter();
    const isActive = router.pathname === href;

    return (
        <Link href={href}>
            <a
                target="_self"
                className={cx(styles.link, { [styles.active]: isActive })}
            >
                <span className={styles.icon}>{icon}</span>
                <span className={styles.title}>{title}</span>
                {Boolean(counter) && (
                    <span className={styles.counter}>{counter}</span>
                )}
            </a>
        </Link>
    );
};
