import type { NextPage } from 'next';
import { Footer } from '../../components/footer';
import { IndexHeader } from '../../components/pages/index/header';
import React from 'react';
import { NotionPage } from '../../components/notionPage';
import { DashboardHeader } from '../../components/pages/dashboard/header';

const Home: NextPage = () => {
    return (
        <>
            <DashboardHeader now="roadmap" />
            <NotionPage pageCode="roadmap" isFullPage={false} minHeight="calc(100vh - 131px - 337px)" />
            <Footer />
        </>
    );
};

export default Home;
