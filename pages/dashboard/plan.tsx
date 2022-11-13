import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { PageLayout, H1, Flex, Text } from 'opize-design-system';
import styled from 'styled-components';
import { GCalNotionCircle } from '../../components/GCalNotionCircle';
import { DashboardFooter } from '../../components/pages/dashboard/footer';
import { DashboardHeader } from '../../components/pages/dashboard/header';

const Home: NextPage = () => {
    return (
        <>
            <DashboardHeader now="plan" />
            <PageLayout minHeight="calc(100vh - 131px - 337px)"></PageLayout>

            <DashboardFooter />
        </>
    );
};

export default Home;
