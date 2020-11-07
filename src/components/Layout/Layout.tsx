import { useSession } from 'next-auth/client';
import { ReactElement } from 'react';
import { Auth } from '../Auth';
import { Nav } from '../Nav';

import styles from './Layout.module.css';

export const Layout: React.FC<{ stickyItem?: ReactElement }> = ({
    children,
    stickyItem,
}) => {
    const [session, loading] = useSession();

    if (loading) {
        return <span>Loading...</span>;
    }

    if (!loading && !session) {
        return <span>ERROR</span>;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <Auth user={session.user} />
                {children}
            </div>
            <Nav userId={session.userId}>{stickyItem}</Nav>
        </div>
    );
};
