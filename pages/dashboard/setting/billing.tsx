import type { NextPage } from 'next';
import { DashboardHeader } from '../../../containers/dashboard/components/DashboardHeader';
import { PageHead } from 'opize-design-system';
import { Footer } from '../../../components/footer';
import { BillingContainer } from '../../../containers/dashboard/pages/setting/pages/billing';

const Home: NextPage = () => {
    return (
        <>
            <DashboardHeader now="setting" />
            <PageHead title="설정"></PageHead>
            <BillingContainer />
            <Footer />
        </>
    );
};
export default Home;
