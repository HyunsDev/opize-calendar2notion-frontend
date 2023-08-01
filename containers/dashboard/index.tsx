import { useUser } from '../../hooks/useUser';
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

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import { GCalNotionCircle } from '../../components/GCalNotionCircle';
import { Info } from 'phosphor-react';
import { DashboardText } from './components/DashboardText';
import { GetUserResponse } from '@opize/calendar2notion-object';
dayjs.extend(relativeTime);
dayjs.locale('ko');

type UserSyncState =
    | 'waiting_for_init'
    | 'initializing'
    | 'syncing'
    | 'synced'
    | 'error'
    | 'deadlock'
    | 'disconnected'
    | 'loading';
const getUserState = (user?: GetUserResponse): UserSyncState => {
    if (!user) {
        return 'loading';
    }

    if (!user.lastCalendarSync) {
        return user.isWork ? 'initializing' : 'waiting_for_init';
    }

    if (!user.isConnected) {
        return user.lastSyncStatus ? 'error' : 'disconnected';
    }

    return user.isWork ? 'syncing' : 'synced';
};

function DashboardContent() {
    const router = useRouter();
    const { user, isLoading } = useUser();
    const userState = getUserState(user);

    if (userState === 'loading') {
        return <Spinner />;
    }

    if (userState === 'waiting_for_init') {
        return (
            <DashboardText
                title={{
                    text: '첫 동기화를 기다리고 있어요',
                    tooltip: '구글 캘린더와 노션의 일정을 동기화하기 위해 준비하고 있어요.',
                }}
                description={'잠시만 기다려주세요'}
            />
        );
    }

    if (userState === 'initializing') {
        return (
            <DashboardText
                title={{
                    text: '첫 동기화를 진행하고 있어요',
                }}
                description={
                    '구글 캘린더와 노션의 일정을 동기화하고 있어요. 이 작업은 수십 분에서 몇 시간 정도 걸릴 수 있어요.'
                }
            />
        );
    }

    if (userState === 'syncing') {
        return (
            <DashboardText
                title={{
                    text: '지금 동기화가 진행 중이에요',
                }}
                description={`${dayjs(user?.lastCalendarSync).fromNow()}에 마지막으로 동기화되었어요`}
            />
        );
    }

    if (userState === 'synced') {
        return (
            <DashboardText
                title={{
                    text: '정상적으로 동기화되고 있어요.',
                }}
                description={`${dayjs(user?.lastCalendarSync).fromNow()}에 마지막으로 동기화되었어요`}
            />
        );
    }

    if (userState === 'error') {
        return (
            <DashboardText
                title={{
                    text: '동기화에 문제가 발생했어요.',
                }}
                description={'동기화에 문제가 발생했어요. 설정에서 문제를 해결해주세요.'}
                button={
                    <Button onClick={() => router.push('/dashboard/setting')} variant="contained">
                        설정에서 문제 해결하기
                    </Button>
                }
            />
        );
    }

    if (userState === 'disconnected') {
        return (
            <DashboardText
                title={{
                    text: '동기화를 중단했어요',
                }}
                description={'설정에서 동기화를 다시 활성화할 수 있어요.'}
            />
        );
    }

    return <></>;
}

export function DashboardContainer() {
    const { user, isLoading } = useUser();

    return (
        <PageLayout minHeight="calc(100vh - 420px)" marginTop="8px">
            <Flex.Column gap="8px">
                {dayjs(user?.lastCalendarSync) < dayjs().add(-2, 'hours') && user?.isWork && (
                    <>
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
                    </>
                )}
                <Flex.Center>
                    <GCalNotionCircle />
                </Flex.Center>
                <Flex.Center>
                    <DashboardContent />
                </Flex.Center>
                <Flex.Center gap="12px">
                    <Link href={'/guide'} passHref>
                        <A href="/guide">가이드</A>
                    </Link>
                    <Link href={'/dashboard/setting'} passHref>
                        <A href={'/dashboard/setting'}>설정</A>
                    </Link>
                </Flex.Center>
            </Flex.Column>
        </PageLayout>
    );
}
