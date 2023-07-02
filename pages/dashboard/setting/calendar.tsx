import type { NextPage } from 'next';
import { PageHead } from 'opize-design-system';
import { Footer } from '../../../components/footer';
import { DashboardHeader } from '../../../components/pages/dashboard/header';

import { CalendarContainer } from '../../../containers/dashboard/pages/setting/pages/calendar';

const Home: NextPage = () => {
    return (
        <>
            <DashboardHeader now="setting" />
            <PageHead title="설정"></PageHead>
            <CalendarContainer />
            <Footer />
        </>
    );
};

export default Home;
