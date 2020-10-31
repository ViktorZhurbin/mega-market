import { ProductContext, ProductContextProvider } from './ProductContext';

export const AppContextProvider: React.FC = ({ children }) => {
    return <ProductContextProvider>{children}</ProductContextProvider>;
};

export { ProductContext };
