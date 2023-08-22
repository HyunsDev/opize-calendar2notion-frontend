import type { NextPage } from 'next';
import { Footer } from '../components/footer';
import { IndexHeader } from '../containers/index/components/IndexHeader';
import React from 'react';
import { NotionPage } from '../components/notionPage';

const Home: NextPage = () => {
    return (
        <>
            <IndexHeader />
            <NotionPage pageId={process.env.NEXT_PUBLIC_NOTION_PAGE_ABOUT || ''} isFullPage />
            <Footer />
        </>
    );
};

export default Home;
