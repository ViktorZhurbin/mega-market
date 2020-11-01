import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './NavLink.module.css';

type Props = {
    title: string;
    icon: any;
    href: string;
};

export const NavLink: React.FC<Props> = ({ title, icon, href }) => {
    const router = useRouter();
    const isActive = router.pathname === href;

    return (
        <Link href={href}>
            <a
                target="_self"
                className={`${styles.link} ${isActive && styles.active}`}
            >
                <span className={styles.icon}>{icon}</span>
                <span className={styles.text}>{title}</span>
            </a>
        </Link>
    );
};