import type { NextPage } from 'next';
import { Footer } from '../../components/footer';
import { AdminHeader } from '../../containers/admin/components/AdminHeader';
import { AdminIndexContainer } from '../../containers/admin/index.container';

const Home: NextPage = () => {
    return (
        <>
            <AdminHeader now="dashboard" />
            <AdminIndexContainer />
            <Footer />
        </>
    );
};

export default Home;
