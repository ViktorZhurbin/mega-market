import { NavLink } from './NavLink';

import styles from './Nav.module.css';

import IconProfile from './icons/profile.svg';
import IconHome from './icons/home.svg';
import IconCart from './icons/cart.svg';
import { useContext } from 'react';
import { UserContext } from '@src/contexts';

export const Nav: React.FC = ({ children }) => {
    const user = useContext(UserContext);

    return (
        <nav className={styles.container}>
            {children}
            <div className={styles.linkWrapper}>
                <NavLink title="Home" icon={<IconHome />} href="/" />
                <NavLink
                    title="Cart"
                    icon={<IconCart />}
                    href="/cart"
                    counter={user?.data?.order.totalQuantity}
                />
                <NavLink
                    title="Profile"
                    icon={<IconProfile />}
                    href="/profile"
                />
            </div>
        </nav>
    );
};
