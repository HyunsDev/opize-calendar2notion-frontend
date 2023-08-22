import type { NextPage } from 'next';
import { Footer } from '../components/footer';
import { IndexHeader } from '../components/pages/index/header';
import { IndexContainer } from '../containers/index/index.container';

const Home: NextPage = () => {
    return (
        <>
            <IndexHeader />
            <IndexContainer />
            <Footer />
        </>
    );
};

export default Home;
