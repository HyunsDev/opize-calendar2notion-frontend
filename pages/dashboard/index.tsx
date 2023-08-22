import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Flex, useModal } from 'opize-design-system';
import { Footer } from '../../components/footer';
import { DashboardHeader } from '../../containers/dashboard/components/DashboardHeader';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DashboardContainer } from '../../containers/dashboard';
dayjs.extend(relativeTime);
dayjs.locale('ko');

const HelloModal = <Flex.Column>Hello, Calendar2notion!</Flex.Column>;

const Home: NextPage = () => {
    const router = useRouter();
    const modal = useModal();

    return (
        <>
            <DashboardHeader now="dashboard" />
            <DashboardContainer />
            <Footer />
        </>
    );
};

export default Home;
