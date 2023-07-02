import type { NextPage } from 'next';
import { PageHead } from 'opize-design-system';
import { Footer } from '../../../components/footer';
import { DashboardHeader } from '../../../components/pages/dashboard/header';

import { useUser } from '../../../hooks/useUser';

import { SettingContainer } from '../../../containers/dashboard/pages/setting/pages/index';

const Home: NextPage = () => {
    const { user } = useUser();

    return (
        <>
            <DashboardHeader now="setting" />
            <PageHead title="설정"></PageHead>
            <SettingContainer />
            <Footer />
        </>
    );
};

export default Home;
