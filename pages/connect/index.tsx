import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { PageLayout, H1, Flex } from 'opize-design-system';
import styled from 'styled-components';
import { ConnectBlock1 } from '../../components/pages/connect/block/block1';
import { ConnectBlock2 } from '../../components/pages/connect/block/block2';
import { ConnectBlock3 } from '../../components/pages/connect/block/block3';
import { ConnectBlock4 } from '../../components/pages/connect/block/block4';

const Divver = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Home: NextPage = () => {
    return (
        <Divver>
            <PageLayout width="400px">
                <Flex.Column gap="12px">
                    <H1>바로 연결해볼까요?</H1>
                    <ConnectBlock1 />
                    <ConnectBlock2 />
                    <ConnectBlock3 />
                    <ConnectBlock4 />
                </Flex.Column>
            </PageLayout>
        </Divver>
    );
};

export default Home;
