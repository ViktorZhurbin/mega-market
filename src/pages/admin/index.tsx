import { useSession } from 'next-auth/client';

import { Admin } from '@admin/components/Admin';
import { Layout } from '@src/components/Layout';
import { useData } from '@src/hooks/useData';

const Page: React.FC = () => {
    const [session] = useSession();
    const { data, isLoading } = useData<{ isAdmin: boolean }>(
        '/api/admin/user/findOne'
    );

    const getComponent = () => {
        if (!session || isLoading || !data) {
            return null;
        }
        if (data?.isAdmin) {
            return <Admin />;
        }

        return <div>Admin rights required</div>;
    };

    return <Layout>{getComponent()}</Layout>;
};

export default Page;
