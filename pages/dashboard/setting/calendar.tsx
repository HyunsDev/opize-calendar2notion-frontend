import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {
    PageLayout,
    H1,
    Flex,
    Text,
    ActionList,
    PageHead,
    ItemsTable,
    Button,
    cv,
    Box,
    ToolTip,
    useDialog,
    Callout,
} from 'opize-design-system';
import { Calendar, Info } from 'phosphor-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { GCalIcon } from '../../../components/GCalIcon';
import { GCalNotionCircle } from '../../../components/GCalNotionCircle';
import { Footer } from '../../../components/footer';
import { DashboardHeader } from '../../../components/pages/dashboard/header';
import { DashboardSettingSidebar } from '../../../components/pages/dashboard/setting/sidebar';
import { useUser } from '../../../hooks/useUser';
import { client } from '../../../lib/client';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
dayjs.extend(relativeTime);
dayjs.locale('ko');

const Right = styled.div`
    display: flex;
    justify-content: end;
    width: 100%;
    align-items: center;
    gap: 8px;
`;

const Circle = styled.div<{ color: string }>`
    width: 16px;
    height: 16px;
    border-radius: 999px;
    background-color: ${(props) => props.color};
`;

const NotiTag = styled.div`
    padding: 4px 8px;
    font-size: 12px;
    border-radius: 999px;
    background-color: ${cv.bg_element3};
    color: ${cv.text2};
    display: flex;
    align-items: center;
    gap: 4px;
`;

function BoxCalendars() {
    const router = useRouter();
    const dialog = useDialog();
    const { user, refetch } = useUser();
    const [loadingCalendars, setLoadingCalendars] = useState<string[]>([]);

    const addCalendar = async (googleCalendarId: string, isReadonly: boolean) => {
        if (loadingCalendars.includes(googleCalendarId)) return;
        if (user?.userPlan === 'FREE' && googleCalendarId !== user.googleEmail) {
            toast.warn('해당 캘린더는 Pro 플랜부터 이용할 수 있어요.');
            return;
        }

        setLoadingCalendars((pre) => [...pre, googleCalendarId]);
        try {
            await client.user.calendar.post({ googleCalendarId: googleCalendarId, userId: 'me' });
        } catch (err) {
            toast.warn('문제가 발생했어요. 잠시 뒤에 다시 시도해주세요.');
            if (refetch) await refetch();
        }
        if (refetch) await refetch();
        setLoadingCalendars((pre) => pre.filter((e) => e !== googleCalendarId));
    };

    const removeCalendar = async (calendarId: number, googleCalendarId: string) => {
        if (loadingCalendars.includes(googleCalendarId)) return;
        setLoadingCalendars((pre) => [...pre, googleCalendarId]);
        try {
            const res = await client.user.calendar.delete({ calendarId: calendarId + '', userId: 'me' });
            if (res.code === 'user_is_work') {
                toast.info('현재 동기화가 진행 중이에요. 10분 정도 뒤에 다시 시도해주세요.');
                return;
            }
            toast.info('캘린더 연결을 해제했어요. 노션에 반영되기까지 시간이 걸릴 수 있어요.');
        } catch (err) {
            toast.warn('문제가 발생했어요. 잠시 뒤에 다시 시도해주세요.');
            if (refetch) await refetch();
        }
        if (refetch) await refetch();
        setLoadingCalendars((pre) => pre.filter((e) => e !== googleCalendarId));
    };

    const removeCalendarDialog = (calendarId: number, googleCalendarId: string, calendarName: string) => {
        dialog({
            title: `정말로 ${calendarName}캘린더를 삭제하시겠어요?`,
            content: '캘린더를 삭제할 경우 노션에서 작성한 페이지도 함께 삭제되요.',
            buttons: [
                {
                    onClick: () => null,
                    children: '취소',
                },
                {
                    onClick: () => removeCalendar(calendarId, googleCalendarId),
                    children: '삭제',
                    color: 'red',
                    variant: 'contained',
                },
            ],
        });
    };

    return (
        <ItemsTable>
            {user?.googleCalendars?.map((calendar) => {
                const userCalendar = user.calendars.find((e) => e.googleCalendarId === calendar.id);

                return (
                    <ItemsTable.Row key={calendar.id}>
                        <ItemsTable.Row.Avatar
                            icon={<Circle color={calendar.backgroundColor} />}
                            name={
                                <Flex.Row gap="8px">
                                    {calendar.summary}{' '}
                                    {calendar.accessRole === 'reader' && (
                                        <ToolTip text="이 캘린더에 속한 일정은 수정할 수 없어요. 필요하다면 구글 캘린더에서 수정 권한을 확인해주세요.">
                                            <NotiTag>
                                                읽기 전용 <Info color={cv.text3} size={14} />
                                            </NotiTag>
                                        </ToolTip>
                                    )}{' '}
                                </Flex.Row>
                            }
                        />

                        <Flex.Row gap="8px">
                            {user.calendars.some((e) => calendar.id === e.googleCalendarId) &&
                            userCalendar?.status !== 'DISCONNECTED' ? (
                                <>
                                    {userCalendar?.status === 'PENDING' && (
                                        <ToolTip text="현재 캘린더가 동기화되기 위해 대기중이에요.">
                                            <NotiTag>동기화 대기중</NotiTag>
                                        </ToolTip>
                                    )}
                                    <Button
                                        variant="outlined"
                                        color="red"
                                        onClick={() =>
                                            removeCalendarDialog(
                                                userCalendar?.id as number,
                                                calendar.id,
                                                calendar.summary
                                            )
                                        }
                                        isLoading={loadingCalendars.includes(calendar.id)}
                                        width="80px"
                                    >
                                        연결끊기
                                    </Button>
                                </>
                            ) : user.userPlan === 'FREE' && calendar.id !== user.googleEmail ? (
                                <Button
                                    variant="default"
                                    onClick={() => addCalendar(calendar.id, calendar.accessRole === 'reader')}
                                    isLoading={loadingCalendars.includes(calendar.id)}
                                    width="150px"
                                >
                                    플랜 업그레이드 필요
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    onClick={() => addCalendar(calendar.id, calendar.accessRole === 'reader')}
                                    isLoading={loadingCalendars.includes(calendar.id)}
                                    width="80px"
                                >
                                    연결하기
                                </Button>
                            )}
                        </Flex.Row>
                    </ItemsTable.Row>
                );
            })}
        </ItemsTable>
    );
}

const Home: NextPage = () => {
    return (
        <>
            <DashboardHeader now="setting" />
            <PageHead title="설정"></PageHead>
            <PageLayout panPosition="start" marginTop="16px" minHeight="calc(100vh - 131px - 128px - 337px)">
                <PageLayout.Pane>
                    <DashboardSettingSidebar now="calendar" />
                </PageLayout.Pane>
                <PageLayout.Content>
                    <Flex.Column gap="16px">
                        <BoxCalendars />
                    </Flex.Column>
                </PageLayout.Content>
            </PageLayout>
            <Footer />
        </>
    );
};

export default Home;
