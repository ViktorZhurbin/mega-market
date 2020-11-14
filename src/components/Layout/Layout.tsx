import { UserProvider } from '@/contexts';

import { Nav } from '../Nav';
import styles from './Layout.module.css';

type Props = {
    stickyItem?: React.ReactElement;
};

export const Layout: React.FC<Props> = ({ children, stickyItem }) => {
    return (
        <UserProvider>
            <div className={styles.wrapper}>
                <div className={styles.content}>{children}</div>
                <Nav>{stickyItem}</Nav>
            </div>
        </UserProvider>
    );
};
