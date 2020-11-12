import { useData } from '@src/hooks/useData';
import { UserType } from '@user/typings';
import { OrderType } from '@cart/typings';

import { NavLink } from './NavLink';

import styles from './Nav.module.css';

import IconProfile from './icons/profile.svg';
import IconHome from './icons/home.svg';
import IconCart from './icons/cart.svg';

type UserResponse = {
    user: UserType;
    order: OrderType;
};

export const Nav: React.FC<{ userId?: string }> = ({ userId, children }) => {
    const { data } = useData<UserResponse>(
        userId ? `/api/user/${userId}` : null
    );

    return (
        <nav className={styles.container}>
            {children}
            <div className={styles.linkWrapper}>
                <NavLink title="Home" icon={<IconHome />} href="/" />
                <NavLink
                    title="Cart"
                    icon={<IconCart />}
                    href="/cart"
                    counter={data?.order?.totalQuantity}
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
