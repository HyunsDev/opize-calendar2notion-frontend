import type { NextPage } from 'next';
import { Footer } from '../../components/footer';
import React from 'react';
import { NotionPage } from '../../components/notionPage';
import { DashboardHeader } from '../../containers/dashboard/components/DashboardHeader';

const Home: NextPage = () => {
    return (
        <>
            <DashboardHeader now="roadmap" />
            <NotionPage pageId="roadmap" isFullPage={false} minHeight="calc(100vh - 131px - 337px)" />
            <Footer />
        </>
    );
};

export default Home;
