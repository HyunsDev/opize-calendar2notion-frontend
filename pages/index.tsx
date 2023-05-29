import type { NextPage } from 'next';
import Link from 'next/link';
import { CenterLayout, cv, Flex, H1, Text } from 'opize-design-system';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Footer } from '../components/footer';
import { GCalNotionCircle } from '../components/GCalNotionCircle';
import { NotionPage } from '../components/notionPage';
import { IndexOpizeToken } from '../components/opizeToken';
import { IndexHeader } from '../components/pages/index/header';
import { useUser } from '../hooks/useUser';
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
