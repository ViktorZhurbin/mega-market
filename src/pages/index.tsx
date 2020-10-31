import { ProductList } from '@src/modules/product/pages/ProductList';
import { Layout } from '@src/components/Layout';

const Main: React.FC = () => {
    return (
        <Layout>
            <ProductList />
        </Layout>
    );
};

export default Main;
