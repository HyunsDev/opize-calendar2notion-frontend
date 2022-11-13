import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { PageLayout, H1, Flex, cv, Button } from 'opize-design-system';
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

const SlideBox = styled.div<{ pos: 'left' | 'center' | 'right' }>`
    top: 0px;
    left: 0px;
    position: absolute;
    transition: 500ms;
    width: 100%;
    padding: 0px 30px;
    transform: ${(props) =>
        props.pos === 'center'
            ? `translateX(0px)`
            : props.pos === 'right'
            ? `translateX(calc(100% + 30px))`
            : `translateX(calc(-100% - 30px))`};

    @media (max-width: 767px) {
        padding: 0px 4px;
    }
`;

const cursorMap = {
    googleApi: 0,
    notionApi: 1,
    notionTemplate: 2,
    notionDatabase: 3,
};
const Home: NextPage = () => {
    const router = useRouter();
    const [cursor, setCursor] = useState<number>(-1);
    const refs = useRef<HTMLDivElement[]>([]);
    const { user } = useUser();

    useEffect(() => {
        setCursor(0);
    }, []);

    useEffect(() => {
        if (user?.status === 'FINISHED') {
            toast.info('이미 연결이 완료되었어요.');
            router.push('/dashboard');
        }
    }, [router, user?.status]);

    const getPost = (pos: number) => {
        if (cursor === pos) return 'center';
        if (cursor < pos) return 'right';
        return 'left';
    };

    return (
        <Divver>
            <PageLayout width="480px">
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
                    <SlideBoxContainer height={refs.current[cursor]?.offsetHeight || 100}>
                        <SlideBox pos={getPost(0)} ref={(e: HTMLDivElement) => (refs.current[0] = e)}>
                            <ConnectBlock0 setCursor={setCursor} />
                        </SlideBox>
                        <SlideBox pos={getPost(1)} ref={(e: HTMLDivElement) => (refs.current[1] = e)}>
                            <ConnectBlock1 setCursor={setCursor} />
                        </SlideBox>
                        <SlideBox pos={getPost(2)} ref={(e: HTMLDivElement) => (refs.current[2] = e)}>
                            <ConnectBlock2 setCursor={setCursor} />
                        </SlideBox>
                    </SlideBoxContainer>
                </Box>
            </PageLayout>
        </Divver>
    );
};

export default Home;
