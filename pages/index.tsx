import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { IndexHeader } from '../components/pages/index/header';

const Home: NextPage = () => {
    return (
        <div>
            <IndexHeader />
        </div>
    );
};

export default Home;
