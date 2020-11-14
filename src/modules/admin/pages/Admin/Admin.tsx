import { useSession } from 'next-auth/client';

import { Layout } from '@/components/Layout';
import { useData } from '@/hooks/useData';
import { UserType } from '~user/typings';

// import { AddProductForm } from '../../components/AddProductForm';
import { ControlButtons } from '../../components/ControlButtons';
import styles from './Admin.module.css';

export const Admin: React.FC = () => {
    const [session] = useSession();
    const { data, isLoading } = useData<UserType>('/api/admin/user');

    const getComponent = () => {
        if (!session || isLoading || !data) {
            return null;
        }

        if (data?.role === 'admin') {
            return (
                <div className={styles.container}>
                    <ControlButtons />
                    {/* <AddProductForm /> */}
                </div>
            );
        }

        return <div>Admin rights required</div>;
    };

    return <Layout>{getComponent()}</Layout>;
};
