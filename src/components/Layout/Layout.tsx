import { useSession } from 'next-auth/client';
import { Nav } from '../Nav';

import styles from './Layout.module.css';

type Props = {
    stickyItem?: React.ReactElement;
};

export const Layout: React.FC<Props> = ({ children, stickyItem }) => {
    const [session, loading] = useSession();

    if (loading) {
        return <span>Loading...</span>;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>{children}</div>
            <Nav userId={session?.userId}>{stickyItem}</Nav>
        </div>
    );
};
