import { GetStaticPaths, GetStaticProps } from 'next';

import { ProductModel } from '@/modules/product/models';
import { Product } from '@/modules/product/pages';
import { ProductType } from '@/modules/product/typings';
import { dbConnect } from '@/utils/api/db';

type Props = {
    product: ProductType;
};

const ProductPage: React.FC<Props> = ({ product }) => (
    <Product product={product} />
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        await dbConnect();
        const product = await ProductModel.findOne({
            _id: params.id,
        });
        return {
            props: { product: JSON.parse(JSON.stringify(product)) },
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

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        await dbConnect();
        const products: ProductType[] = await ProductModel.find({});
        const paths = products.map((product) => ({
            params: { id: product._id.toString() },
        }));

        return { paths, fallback: false };
    } catch (error) {
        console.error(error);
    }
};

export default ProductPage;
