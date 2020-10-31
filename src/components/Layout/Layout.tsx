import { Auth } from '../Auth';
import { Nav } from '../Nav';

export const Layout: React.FC = ({ children }) => {
    return (
        <div>
            <Auth />
            {children}
            <Nav />
        </div>
    );
};
