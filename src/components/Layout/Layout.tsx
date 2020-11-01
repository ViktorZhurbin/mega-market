import { Auth } from '../Auth';
import { Nav } from '../Nav';

import styles from './Layout.module.css';

export const Layout: React.FC = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <Auth />
                {children}
            </div>
            <Nav />
        </div>
    );
};
