import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { PageLayout, H1, Flex, Text, cv, Button, Link as A } from 'opize-design-system';
import styled from 'styled-components';
import { GCalNotionCircle } from '../../components/GCalNotionCircle';
import { DashboardFooter } from '../../components/pages/dashboard/footer';
import { DashboardHeader } from '../../components/pages/dashboard/header';

const Home: NextPage = () => {
    return (
        <>
            <DashboardHeader now="dashboard" />
            <PageLayout>
                <Flex.Column gap="20px">
                    <Flex.Center>
                        <GCalNotionCircle />
                    </Flex.Center>
                    <Flex.Center>
                        <Flex.Column gap="4px">
                            <Text weight="semibold" size="28px" style={{ textAlign: 'center' }}>
                                정상적으로 동기화되고 있어요
                            </Text>
                            <Text color={cv.text3} style={{ textAlign: 'center' }}>
                                3분 전에 마지막으로 동기화 되었어요
                            </Text>
                        </Flex.Column>
                    </Flex.Center>
                    <Flex.Center>
                        <Button variant="contained">동기화 간격 줄이기</Button>
                    </Flex.Center>
                    <Flex.Center gap="12px">
                        <A>오류 해결 가이드</A>
                        <A>설정</A>
                    </Flex.Center>
                </Flex.Column>
            </PageLayout>
            <DashboardFooter />
        </>
    );
};

export default Home;
