import type { NextPage } from 'next';
import { Footer } from '../components/footer';
import { IndexHeader } from '../containers/index/components/IndexHeader';
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
