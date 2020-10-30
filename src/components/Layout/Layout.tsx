import { Auth } from '../Auth';

export const Layout: React.FC = ({ children }) => {
    return (
        <div>
            <Auth />
            {children}
        </div>
    );
};
