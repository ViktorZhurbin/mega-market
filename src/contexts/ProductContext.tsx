import { useData } from '@src/hooks/useData';
import React from 'react';

export const ProductContext = React.createContext({
    data: null,
    isLoading: true,
    isError: undefined,
});

export const ProductContextProvider: React.FC = ({ children }) => {
    const productsRes = useData('/api/products/get');

    return (
        <ProductContext.Provider value={productsRes}>
            {children}
        </ProductContext.Provider>
    );
};
