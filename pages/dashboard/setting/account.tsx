import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {
    PageLayout,
    H1,
    Flex,
    Text,
    ActionList,
    PageHead,
    Box,
    Button,
    Link as A,
    Switch,
    Span,
    Divider,
    H3,
    H2,
    useDialog,
} from 'opize-design-system';
import styled from 'styled-components';
import { GCalNotionCircle } from '../../../components/GCalNotionCircle';
import { Footer } from '../../../components/footer';
import { DashboardHeader } from '../../../components/pages/dashboard/header';
import { client } from '../../../lib/client';
import { toast } from 'react-toastify';
import { APIResponseError } from 'endpoint-client';
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
