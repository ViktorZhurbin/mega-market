import cx from 'classnames';

import { useCart } from '@/hooks/useCart';

import IconCart from './icons/cart.svg';
import IconHome from './icons/home.svg';
import IconProfile from './icons/profile.svg';
import styles from './Nav.module.css';
import { NavLink } from './NavLink';

export const Nav: React.FC = ({ children }) => {
    const { data: cart } = useCart();

    return (
        <nav className={styles.container}>
            <div className={styles.sticky}>{children}</div>
            <div
                className={cx(styles.linkWrapper, {
                    [styles.withSticky]: Boolean(children),
                })}
            >
                <NavLink title="Home" icon={<IconHome />} href="/" />
                <NavLink
                    title="Cart"
                    icon={<IconCart />}
                    href="/cart"
                    counter={cart?.quantity}
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
