import { NavLink } from './NavLink';

import styles from './Nav.module.css';

import IconProfile from './icons/profile.svg';
import IconHome from './icons/home.svg';
import IconCart from './icons/cart.svg';

export const Nav: React.FC = () => {
    return (
        <nav className={styles.container}>
            <div className={styles.linkWrapper}>
                <NavLink title="Home" icon={<IconHome />} href="/" />
                <NavLink title="Cart" icon={<IconCart />} href="/cart" />
                <NavLink
                    title="Profile"
                    icon={<IconProfile />}
                    href="/profile"
                />
            </div>
        </nav>
    );
};
