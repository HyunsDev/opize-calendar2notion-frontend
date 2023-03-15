import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
    PageLayout,
    H1,
    Flex,
    Text,
    cv,
    Button,
    useModal,
    ToolTip,
    Spinner,
    Callout,
    A,
    Box,
} from 'opize-design-system';
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
import Link from 'next/link';
dayjs.extend(relativeTime);
dayjs.locale('ko');

const HelloModal = <Flex.Column>Hello, Calendar2notion!</Flex.Column>;

const Home: NextPage = () => {
    const router = useRouter();
    const modal = useModal();
    const { user, isLoading, refetch } = useUser();

    // useEffect(() => {
    //     const hello = router.query.hello as string;
    //     if (hello === 'true') {
    //         router.replace('/dashboard');
    //         modal.open(HelloModal, {
    //             width: 400,
    //         });
    //     }
    // }, [modal, router, router.query.hello]);

    useEffect(() => {
        // 30초 마다 정보 가져오기
        const intervalId = setInterval(async () => {
            refetch && (await refetch());
        }, 1000 * 30);
        return () => {
            clearInterval(intervalId);
        };
    }, [refetch]);

    return (
        <>
            <DashboardHeader now="dashboard" />
            <PageLayout minHeight="calc(100vh - 131px - 337px)" marginTop="8px">
                <Flex.Column gap="8px">
                    <Callout icon="📢">
                        현재 Calendar2notion은 베타 버전이에요. 불안정한 부분도 많고, 여러 가이드가 작성 중인 상태에요.
                        <br />
                        혹시 베타버전을 이용하면서 문제점을 발견하거나, 추가하고 싶은 기능이 있다면 언제든{' '}
                        <A href="https://open.kakao.com/o/gIBnhE4e" target={'_blank'} style={{ fontSize: '14px' }}>
                            카카오톡 오픈채팅방
                        </A>
                        에 알려주세요.
                    </Callout>
                    {dayjs(user?.lastCalendarSync) < dayjs().add(-2, 'hours') && user?.isWork && (
                        <Callout icon="💡" color="yellow">
                            교착 상태에 빠진 것 같나요?
                            <br />
                            일반적으로 <b>첫 동기화가 아닌 동기화</b>는 1분 내로 완료되는 것이 정상이에요. 그러나 현재
                            2시간 이상 동기화가 진행중이에요. 만약 노션이나 구글 캘린더에서 동기화가 정상적으로
                            이루어지지 않고 있다고 생각되면 설정에서 교착상태를 해결해주세요.
                            <br />
                            <Link href={'/dashboard/setting'} passHref>
                                <A href={'/dashboard/setting'}>설정 바로가기</A>
                            </Link>
                        </Callout>
                    )}
                    <Flex.Center>
                        <GCalNotionCircle />
                    </Flex.Center>
                    <Flex.Center>
                        {isLoading && <Spinner />}
                        {!isLoading &&
                            (!user?.lastCalendarSync ? (
                                user?.isWork ? (
                                    <Flex.Column gap="4px">
                                        <Flex.Row gap="4px">
                                            <Text weight="semibold" size="28px" style={{ textAlign: 'center' }}>
                                                첫 동기화 진행중이에요!!
                                            </Text>
                                            <ToolTip text="구글 캘린더의 일정을 노션으로 옮기는 중이에요. 캘린더의 일정 수에 따라 수십 분에서 수 시간정도 걸릴 수 있어요.">
                                                <Info size={20} color={cv.text2} />
                                            </ToolTip>
                                        </Flex.Row>
                                        <Text color={cv.text3} style={{ textAlign: 'center' }}>
                                            첫 동기화이므로, 오랜 시간이 걸릴 수 있어요.
                                        </Text>
                                    </Flex.Column>
                                ) : (
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
                                )
                            ) : user?.isConnected ? (
                                <Flex.Column gap="4px">
                                    <Text weight="semibold" size="28px" style={{ textAlign: 'center' }}>
                                        {user.isWork ? '지금 동기화가 진행중이에요' : '정상적으로 동기화되고 있어요'}
                                    </Text>
                                    <Text color={cv.text3} style={{ textAlign: 'center' }}>
                                        {dayjs(user?.lastCalendarSync).fromNow()}에 마지막으로 동기화 되었어요
                                    </Text>
                                </Flex.Column>
                            ) : (
                                <Flex.Column gap="4px">
                                    <Text weight="semibold" size="28px" style={{ textAlign: 'center' }}>
                                        {'동기화가 중단되었어요.'}
                                    </Text>
                                    <Text color={cv.text3} style={{ textAlign: 'center' }}>
                                        {dayjs(user?.lastCalendarSync).fromNow()}에 마지막으로 동기화 되었어요
                                    </Text>
                                </Flex.Column>
                            ))}
                    </Flex.Center>
                    <Flex.Center gap="12px">
                        <Link href={'/guide'} passHref>
                            <A href="/guide">오류 해결 가이드</A>
                        </Link>
                        <Link href={'/dashboard/setting'} passHref>
                            <A href={'/dashboard/setting'}>설정</A>
                        </Link>
                    </Flex.Center>
                </Flex.Column>
            </PageLayout>
            <Footer />
        </>
    );
};

export default Home;
