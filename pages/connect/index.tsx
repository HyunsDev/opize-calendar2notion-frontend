import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { PageLayout, H1, Flex, cv, Button, SlideBox, CenterLayout } from 'opize-design-system';
import styled from 'styled-components';
import { ConnectBlock0 } from '../../components/pages/connect/block/block0';
import { ConnectBlock1 } from '../../components/pages/connect/block/block1';
import { ConnectBlock2 } from '../../components/pages/connect/block/block2';
import C2NLogo from '../../assets/logo.png';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useUser } from '../../hooks/useUser';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const Divver = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Box = styled.div`
    border: solid 1px ${cv.border4};
    border-radius: 8px;
    padding: 30px 0px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    width: 100%;

    @media (max-width: 767px) {
        border: solid 0px ${cv.border4};
    }
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: ${cv.fontWeightSemiBold};
    color: #9764ff;
`;

const Title = styled.h1`
    font-size: 20px;
    font-weight: ${cv.fontWeightRegular};
`;

const SlideBoxContainer = styled.div<{ height: number }>`
    overflow: hidden;
    position: relative;
    width: 100%;
    height: ${(props) => props.height}px;
    transition: 200ms;
`;

const cursorMap = {
    googleApi: 0,
    notionApi: 1,
    notionTemplate: 2,
    notionDatabase: 3,
};
const Home: NextPage = () => {
    const router = useRouter();
    const { user } = useUser();

    useEffect(() => {
        if (user?.status === 'FINISHED') {
            toast.info('이미 연결이 완료되었어요.');
            router.push('/dashboard');
        }
    }, [router, user?.status]);

    return (
        <CenterLayout width="400px" minHeight="100vh">
            <Box>
                {/* <Flex.Center gap="8px">
                        <Button onClick={() => setCursor((i) => i - 1)}>- 1</Button>
                        {cursor}
                        <Button onClick={() => setCursor((i) => i + 1)}>+ 1</Button>
                    </Flex.Center> */}
                <Logo>
                    <Image src={C2NLogo} height={24} width={24} alt="" /> Calendar2notion
                </Logo>
                <Title>바로 연결해볼까요?</Title>
                <SlideBox>
                    <SlideBox.Page pos={0}>
                        <ConnectBlock0 />
                    </SlideBox.Page>
                    <SlideBox.Page pos={1}>
                        <ConnectBlock1 />
                    </SlideBox.Page>
                    <SlideBox.Page pos={2}>
                        <ConnectBlock2 />
                    </SlideBox.Page>
                </SlideBox>
            </Box>
        </CenterLayout>
    );
};

export default Home;
