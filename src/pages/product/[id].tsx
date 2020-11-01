import { GetStaticProps, GetStaticPaths } from 'next';

import { Product as ProductModel } from '@src/models';
import { Product as ProductType } from '@product/typings';
import { connectDb } from '@src/utils/db';
import { ProductComponent } from '@product/pages/Product';

type Props = {
    product: ProductType;
};

const ProductPage: React.FC<Props> = ({ product }) => (
    <ProductComponent product={product} />
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        await connectDb();
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
        await connectDb();
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
