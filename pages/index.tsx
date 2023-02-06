import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { CenterLayout, cv, Flex, H1, Text } from 'opize-design-system';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { GCalNotionCircle } from '../components/GCalNotionCircle';
import { IndexOpizeToken } from '../components/opizeToken';
import { IndexHeader } from '../components/pages/index/header';
import { useUser } from '../hooks/useUser';

const Title = styled.h1`
    font-size: 44px;
    font-weight: 700;
    font-family: 'Noto Sans KR', sans-serif;
`;

const Buttons = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    gap: 12px;
`;

const Button1 = styled.a`
    color: #000000;
    text-decoration: none;
    background: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    padding: 10px 32px;
    transition: 200ms;
    font-size: 14px;
    font-weight: ${cv.fontWeightRegular};

    &:hover {
        transform: translateY(-2px);
        background-color: #ffffff;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
    }
`;

const Button2Animation = keyframes`
    0% {
        background-position: 0% center;
    }
    100% {
        background-position: 200% center;
    }
`;

const Button2 = styled.a`
    color: #dae7d3;
    text-decoration: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    padding: 10px 32px;
    font-size: 14px;
    font-weight: ${cv.fontWeightSemiBold};

    background: linear-gradient(90deg, #16756d 0%, #16756d 30%, #119287 60%, #16756d 100%);
    background-size: 200% auto;
    animation: ${Button2Animation} 2s infinite linear;

    transition: 200ms;

    filter: brightness(100%);
    &:hover {
        filter: brightness(90%);
        /* background: linear-gradient(90deg, #296561 0%, #296561 30%, #296561 60%, #296561 100%); */
    }

    &:active {
        transform: translateY(2px);
    }
`;

const Between = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    @media (max-width: 600px) {
        justify-content: flex-start;
        flex-direction: column;
    }
`;

const Texts = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    @media (max-width: 600px) {
        justify-content: center;
        align-items: center;
        text-align: center;
    }
`;

const Home: NextPage = () => {
    const [isLogin, setIsLogin] = useState(false);
    const { user, isLoading } = useUser({ allowNonLogin: true });

    useEffect(() => {
        setIsLogin(!!localStorage.getItem('token'));
    }, []);

    useEffect(() => {
        if (!isLoading && user) setIsLogin(true);
    }, [isLoading, user]);

    return (
        <>
            <IndexHeader />
            <CenterLayout width="900px" minHeight="calc(100vh - 52px)">
                <Between>
                    <Texts>
                        <IndexOpizeToken />
                        <Title>
                            구글 캘린더를
                            <br />
                            노션과 연결해보세요!
                        </Title>
                        <Text size="16px">
                            카드도 필요 없어요
                            <br />
                            지금 바로 연결해보세요.
                        </Text>
                        <Buttons>
                            {isLogin ? (
                                <Link href={'/dashboard'} passHref>
                                    <Button2 href="/dashboard">대시보드</Button2>
                                </Link>
                            ) : (
                                <>
                                    <Button1
                                        href={`${process.env.NEXT_PUBLIC_OPIZE}/oauth/verify/${process.env.NEXT_PUBLIC_OPIZE_PROJECT_CODE}?redirectUrl=${process.env.NEXT_PUBLIC_OPIZE_API_REDIRECT_URL}`}
                                    >
                                        로그인
                                    </Button1>

                                    <Button2
                                        href={`${process.env.NEXT_PUBLIC_OPIZE}/oauth/verify/${process.env.NEXT_PUBLIC_OPIZE_PROJECT_CODE}?redirectUrl=${process.env.NEXT_PUBLIC_OPIZE_API_REDIRECT_URL}`}
                                    >
                                        무료로 시작하기
                                    </Button2>
                                </>
                            )}
                        </Buttons>
                    </Texts>
                    <GCalNotionCircle size={1} />
                </Between>
                <Flex.Center>
                    <Text size="12px" color={cv.text3} style={{ textAlign: 'center' }} lineHeight="1.6">
                        사소한 불편함을 해결하기 위한
                        <br />
                        한 학생 개발자의 프로젝트
                        <br />
                        Opize
                    </Text>
                </Flex.Center>
            </CenterLayout>
        </>
    );
};

export default Home;
