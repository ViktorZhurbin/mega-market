import { useContext } from 'react';

import { CartContext } from '@/contexts';

import IconCart from './icons/cart.svg';
import IconHome from './icons/home.svg';
import IconProfile from './icons/profile.svg';
import styles from './Nav.module.css';
import { NavLink } from './NavLink';

export const Nav: React.FC = ({ children }) => {
    const cart = useContext(CartContext);

    return (
        <nav className={styles.container}>
            {children}
            <div className={styles.linkWrapper}>
                <NavLink title="Home" icon={<IconHome />} href="/" />
                <NavLink
                    title="Cart"
                    icon={<IconCart />}
                    href="/cart"
                    counter={cart?.data?.quantity}
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
