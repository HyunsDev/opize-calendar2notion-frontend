import { NextPage } from 'next';
import { AdminHeader } from '../../components/pages/admin/header';
import { AdminSyncBotContainer } from '../../containers/admin/syncbot/index.container';
import { Footer } from '../../components/footer';

const Home: NextPage = () => {
    return (
        <>
            <AdminHeader now="syncbot" />
            <AdminSyncBotContainer />
            <Footer />
        </>
    );
};

export default Home;
