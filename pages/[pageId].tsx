import { useRouter } from 'next/router';
import { Footer } from '../components/footer';
import { NotionPage } from '../components/notionPage';
import { IndexHeader } from '../containers/index/components/IndexHeader';

export default function App() {
    const router = useRouter();
    const { pageId } = router.query;

    return (
        <>
            <IndexHeader />
            <NotionPage pageId={(pageId as string) || ''} />
            <Footer />
        </>
    );
}
