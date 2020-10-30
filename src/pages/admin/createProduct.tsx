import { useSession } from 'next-auth/client';
import { CreateProduct } from '../../modules/admin/components/CreateProduct';
import { Layout } from '../../components/Layout';

const Page: React.FC = () => {
    const [session] = useSession();

    const getComponent = () => {
        if (!session) {
            return null;
        }

        if (session.userRole === 'admin') {
            return <CreateProduct />;
        }

        return <div>Admin rights required</div>;
    };

    return <Layout>{getComponent()}</Layout>;
};

export default Page;
