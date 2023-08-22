import type { NextPage } from 'next';
import { Footer } from '../components/footer';
import { IndexHeader } from '../containers/index/components/IndexHeader';
import { NotionPage } from '../components/notionPage';

const Home: NextPage = () => {
    return (
        <>
            <IndexHeader />
            <NotionPage pageId={process.env.NEXT_PUBLIC_NOTION_PAGE_TERMS || ''} isFullPage />
            <Footer />
        </>
    );
};

export default Home;
