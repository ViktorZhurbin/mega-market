import { useSession } from 'next-auth/client';

import { CreateProduct } from '@/modules/admin/components/CreateProduct';
import { Layout } from '@/components/Layout';
import { useData } from '@/hooks/useData';

const Page: React.FC = () => {
    const [session] = useSession();
    const { data, isLoading } = useData('/api/admin/get');

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
