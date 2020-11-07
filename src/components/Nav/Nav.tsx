import { useData } from '@src/hooks/useData';
import { UserType } from '@user/typings';

import { NavLink } from './NavLink';

import styles from './Nav.module.css';

import IconProfile from './icons/profile.svg';
import IconHome from './icons/home.svg';
import IconCart from './icons/cart.svg';

export const Nav: React.FC<{ userId: string }> = ({ userId, children }) => {
    const { data: user, isLoading } = useData<UserType>(`/api/user/${userId}`);

    return (
        !isLoading && (
            <nav className={styles.container}>
                {children}
                <div className={styles.linkWrapper}>
                    <NavLink title="Home" icon={<IconHome />} href="/" />
                    <NavLink
                        title="Cart"
                        icon={<IconCart />}
                        href="/cart"
                        counter={user?.cart.length}
                    />
                    <NavLink
                        title="Profile"
                        icon={<IconProfile />}
                        href="/profile"
                    />
                </div>
            </nav>
        )
    );
};
