import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { PageLayout, H1, Flex, Text, cv, Button, Link as A, BoxLayout } from 'opize-design-system';
import styled from 'styled-components';
import { Footer } from '../../components/footer';
import { GCalNotionCircle } from '../../components/GCalNotionCircle';
import { AdminDashboardStatistics } from '../../components/pages/admin/dashboard/statistics';
import { AdminFooter } from '../../components/pages/admin/footer';
import { AdminHeader } from '../../components/pages/admin/header';

const Home: NextPage = () => {
    return (
        <>
            <AdminHeader now="dashboard" />
            <BoxLayout minHeight="calc(100vh - 131px - 337px)" marginTop="20px">
                <AdminDashboardStatistics />
            </BoxLayout>
            <Footer />
        </>
    );
};

export default Home;
