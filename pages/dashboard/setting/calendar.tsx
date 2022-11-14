import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { PageLayout, H1, Flex, Text, ActionList, PageHead, ItemsTable, Button, cv, Box } from 'opize-design-system';
import { Calendar } from 'phosphor-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { GCalIcon } from '../../../components/GCalIcon';
import { GCalNotionCircle } from '../../../components/GCalNotionCircle';
import { DashboardFooter } from '../../../components/pages/dashboard/footer';
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

const ReadonlyTag = styled.div`
    padding: 4px 8px;
    font-size: 12px;
    border-radius: 999px;
    background-color: ${cv.bg_element3};
    color: ${cv.text3};
`;

function BoxCalendars() {
    const router = useRouter();
    const { user, refetch } = useUser();
    const [loadingCalendars, setLoadingCalendars] = useState<string[]>([]);

    const addCalendar = async (googleCalendarId: string) => {
        if (loadingCalendars.includes(googleCalendarId)) return;
        if (user?.userPlan === 'FREE' && googleCalendarId !== user.googleEmail) {
            toast.warn('해당 캘린더는 Pro 플랜부터 이용할 수 있어요.');
            router.push('/dashboard/plan');
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
            if (res.code === 'user_is_work')
                toast.info('현재 동기화가 진행 중이에요. 10분 정도 뒤에 다시 시도해주세요.');
        } catch (err) {
            toast.warn('문제가 발생했어요. 잠시 뒤에 다시 시도해주세요.');
            if (refetch) await refetch();
        }
        if (refetch) await refetch();
        setLoadingCalendars((pre) => pre.filter((e) => e !== googleCalendarId));
    };

    return (
        <ItemsTable>
            {user?.allCalendars?.map((calendar) => {
                const userCalendar = user.calendars.find((e) => e.googleCalendarId === calendar.id);

                return (
                    <ItemsTable.Row key={calendar.id}>
                        <ItemsTable.Row.Avatar
                            icon={<Circle color={calendar.backgroundColor} />}
                            name={
                                <Flex.Row gap="8px">
                                    {calendar.summary}{' '}
                                    {calendar.accessRole === 'reader' && <ReadonlyTag>읽기 전용</ReadonlyTag>}{' '}
                                </Flex.Row>
                            }
                        />

                        <ItemsTable.Row.Component>
                            <Right>
                                <Text color={cv.text3}>
                                    {userCalendar?.createdAt && dayjs(userCalendar?.createdAt).fromNow()}
                                </Text>
                                {user.calendars.some((e) => calendar.id === e.googleCalendarId) ? (
                                    <Button
                                        variant="outlined"
                                        color="red"
                                        onClick={() => removeCalendar(userCalendar?.id as number, calendar.id)}
                                        isLoading={loadingCalendars.includes(calendar.id)}
                                        width="80px"
                                    >
                                        연결끊기
                                    </Button>
                                ) : user.userPlan === 'FREE' && calendar.id !== user.googleEmail ? (
                                    <Button
                                        variant="default"
                                        onClick={() => addCalendar(calendar.id)}
                                        isLoading={loadingCalendars.includes(calendar.id)}
                                        width="150px"
                                    >
                                        플랜 업그레이드 필요
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        onClick={() => addCalendar(calendar.id)}
                                        isLoading={loadingCalendars.includes(calendar.id)}
                                        width="80px"
                                    >
                                        연결하기
                                    </Button>
                                )}
                            </Right>
                        </ItemsTable.Row.Component>
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
            <DashboardFooter />
        </>
    );
};

export default Home;
