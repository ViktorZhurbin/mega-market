import { GetStaticProps } from 'next';

import { Home } from '@/modules/home/pages';
import { ProductModel } from '@/modules/product/models';
import { ProductType } from '@/modules/product/typings';
import { dbConnect } from '@/utils/api/db';

type Props = {
    products: ProductType[];
};

const HomePage: React.FC<Props> = ({ products }) => (
    <Home products={products} />
);

export const getStaticProps: GetStaticProps = async () => {
    try {
        await dbConnect();
        const products = await ProductModel.find({});

        return {
            props: { products: JSON.parse(JSON.stringify(products)) },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {},
            // Next.js will attempt to re-generate the page:
            // - When a request comes in
            // - At most once every second
            revalidate: 60 * 60 * 12, // In seconds
        };
    }
};

export default HomePage;
