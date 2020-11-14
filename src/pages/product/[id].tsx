import { GetStaticPaths, GetStaticProps } from 'next';

import { dbConnect } from '@/utils/api/db';
import { ProductModel } from '~product/models';
import { Product } from '~product/pages';
import { ProductType } from '~product/typings';

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
