import { CartProvider } from '@/contexts';

import { Nav } from '../Nav';
import styles from './Layout.module.css';

type Props = {
    stickyItem?: React.ReactElement;
};

export const Layout: React.FC<Props> = ({ children, stickyItem }) => {
    return (
        <CartProvider>
            <div className={styles.wrapper}>
                <div className={styles.content}>{children}</div>
                <Nav>{stickyItem}</Nav>
            </div>
        </CartProvider>
    );
};
