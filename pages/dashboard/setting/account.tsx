import type { NextPage } from 'next';
import { PageHead } from 'opize-design-system';
import styled from 'styled-components';
import { Footer } from '../../../components/footer';
import { DashboardHeader } from '../../../containers/dashboard/components/DashboardHeader';
import { AccountContainer } from '../../../containers/dashboard/pages/setting/pages/account';

const DangerZone = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 32px;
`;

const Home: NextPage = () => {
    return (
        <>
            <DashboardHeader now="setting" />
            <PageHead title="설정"></PageHead>
            <AccountContainer />
            <Footer />
        </>
    );
};

export default Home;
