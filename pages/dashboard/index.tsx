import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PageLayout, H1, Flex, Text, cv, Button, Link as A, useModal, ToolTip } from 'opize-design-system';
import { useEffect } from 'react';
import styled from 'styled-components';
import { GCalNotionCircle } from '../../components/GCalNotionCircle';
import { Footer } from '../../components/footer';
import { DashboardHeader } from '../../components/pages/dashboard/header';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useUser } from '../../hooks/useUser';
import { Info } from 'phosphor-react';
dayjs.extend(relativeTime);
dayjs.locale('ko');

const HelloModal = <Flex.Column>Hello, Calendar2notion!</Flex.Column>;

const Home: NextPage = () => {
    const router = useRouter();
    const modal = useModal();
    const { user } = useUser();

    useEffect(() => {
        const hello = router.query.hello as string;
        if (hello === 'true') {
            router.replace('/dashboard');
            modal.open(HelloModal, {
                width: 400,
            });
        }
    }, [modal, router, router.query.hello]);

    return (
        <>
            <DashboardHeader now="dashboard" />
            <PageLayout minHeight="calc(100vh - 131px - 337px)">
                <Flex.Column gap="8px">
                    <Flex.Center>
                        <GCalNotionCircle />
                    </Flex.Center>
                    <Flex.Center>
                        {!user?.lastCalendarSync ? (
                            <Flex.Column gap="4px">
                                <Flex.Row gap="4px">
                                    <Text weight="semibold" size="28px" style={{ textAlign: 'center' }}>
                                        첫 동기화 대기중이에요!
                                    </Text>
                                    <ToolTip text="구글 캘린더의 일정을 노션으로 옮기는 중이에요. 캘린더의 일정 수에 따라 수십 분에서 수 시간정도 걸릴 수 있어요.">
                                        <Info size={20} color={cv.text2} />
                                    </ToolTip>
                                </Flex.Row>
                                <Text color={cv.text3} style={{ textAlign: 'center' }}>
                                    조금만 기다리면 동기화가 시작되요
                                </Text>
                            </Flex.Column>
                        ) : (
                            <Flex.Column gap="4px">
                                <Text weight="semibold" size="28px" style={{ textAlign: 'center' }}>
                                    정상적으로 동기화되고 있어요
                                </Text>
                                <Text color={cv.text3} style={{ textAlign: 'center' }}>
                                    {dayjs(user?.lastCalendarSync).fromNow()}에 마지막으로 동기화 되었어요
                                </Text>
                            </Flex.Column>
                        )}
                    </Flex.Center>
                    <Flex.Center gap="12px">
                        <A>오류 해결 가이드</A>
                        <A>설정</A>
                    </Flex.Center>
                </Flex.Column>
            </PageLayout>
            <Footer />
        </>
    );
};

export default Home;
