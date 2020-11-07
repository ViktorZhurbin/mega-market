import { useSession } from 'next-auth/client';

import { CreateProduct } from '@admin/components/CreateProduct';
import { Layout } from '@src/components/Layout';
import { useData } from '@src/hooks/useData';

const Page: React.FC = () => {
    const [session] = useSession();
    const { data, isLoading } = useData<{ isAdmin: boolean }>('/api/admin/get');

    const getComponent = () => {
        if (!session || isLoading || !data) {
            return null;
        }
        if (data?.isAdmin) {
            return <CreateProduct />;
        }

        return <div>Admin rights required</div>;
    };

    return <Layout>{getComponent()}</Layout>;
};

export default Page;
