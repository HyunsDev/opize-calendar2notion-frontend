import { Flex, ItemsTable, Button, cv, ToolTip, useDialog } from 'opize-design-system';
import { Info } from 'phosphor-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
import { APIResponseError } from 'endpoint-client';
import { CalendarDto, GoogleCalendarDto } from '@opize/calendar2notion-object';
import { useUser } from '../../../../../../hooks/useUser';
import { client } from '../../../../../../lib/client';
import { Container } from '../../components/Container';
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

function CalendarItem({ calendar, userCalendar }: { calendar: GoogleCalendarDto; userCalendar?: CalendarDto }) {
    const router = useRouter();
    const dialog = useDialog();
    const { user, refetch } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    if (!user) return <></>;

    const addCalendar = async (googleCalendarId: string, isReadonly: boolean) => {
        if (isLoading) return;
        if (user?.userPlan === 'FREE' && googleCalendarId !== user.googleEmail) {
            toast.warn('해당 캘린더는 Pro 플랜부터 이용할 수 있어요.');
            return;
        }

        setIsLoading(true);
        try {
            await client.user.calendar.post({ googleCalendarId: googleCalendarId, userId: 'me' });
        } catch (err) {
            setIsLoading(false);
            if (err instanceof APIResponseError) {
                if (err.body.code === 'same_name_calendar_exist') {
                    dialog({
                        title: '이미 같은 이름의 캘린더가 연결되어 있어요.',
                        content: '연결하러는 캘린더의 이름을 구글 캘린더에서 변경한 뒤 다시 시도해주세요.',
                        buttons: [
                            {
                                children: '확인',
                                onClick: () => null,
                            },
                        ],
                    });
                    return;
                }
            } else {
                toast.warn('문제가 발생했어요. 잠시 뒤에 다시 시도해주세요.');
                if (refetch) await refetch();
            }
        }
        if (refetch) await refetch();
        setIsLoading(false);
    };

    const removeCalendar = async (calendarId: number, googleCalendarId: string) => {
        if (isLoading) return;
        setIsLoading(true);
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
        setIsLoading(false);
    };

    const removeCalendarDialog = (calendarId: number, googleCalendarId: string, calendarName: string) => {
        dialog({
            title: `정말로 ${calendarName} 캘린더를 삭제하시겠어요?`,
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
        <ItemsTable.Row key={calendar.id}>
            <ItemsTable.Row.Avatar
                icon={<Circle color={calendar.backgroundColor} />}
                name={
                    <Flex.Row gap="8px">
                        {calendar.summary}{' '}
                        {userCalendar &&
                            calendar.summary !== userCalendar.googleCalendarName &&
                            `(${userCalendar.googleCalendarName})`}{' '}
                        {userCalendar && calendar.summary !== userCalendar.googleCalendarName && (
                            <ToolTip text="구글 캘린더의 이름이 변경되었어요. 노션에는 반영되지 않아요. 해당 기능은 추후 제공될 예정이에요.">
                                <NotiTag>
                                    이름 변경됨 <Info color={cv.text3} size={14} />
                                </NotiTag>
                            </ToolTip>
                        )}{' '}
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
                {calendar && userCalendar && userCalendar?.status !== 'DISCONNECTED' ? (
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
                                removeCalendarDialog(userCalendar?.id as number, calendar.id, calendar.summary)
                            }
                            isLoading={isLoading}
                            width="80px"
                        >
                            연결끊기
                        </Button>
                    </>
                ) : user.userPlan === 'FREE' && calendar.id !== user.googleEmail ? (
                    <Button
                        variant="default"
                        onClick={() => addCalendar(calendar.id, calendar.accessRole === 'reader')}
                        isLoading={isLoading}
                        width="150px"
                    >
                        플랜 업그레이드 필요
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        onClick={() => addCalendar(calendar.id, calendar.accessRole === 'reader')}
                        isLoading={isLoading}
                        width="80px"
                    >
                        연결하기
                    </Button>
                )}
            </Flex.Row>
        </ItemsTable.Row>
    );
}

function BoxCalendars() {
    const router = useRouter();
    const dialog = useDialog();
    const { user, refetch } = useUser();

    return (
        <ItemsTable>
            {user?.googleCalendars?.map((calendar) => {
                const userCalendar = user.calendars.find((e) => e.googleCalendarId === calendar.id);

                return <CalendarItem calendar={calendar} userCalendar={userCalendar} key={calendar.id} />;
            })}
        </ItemsTable>
    );
}

export function CalendarContainer() {
    return (
        <Container now="calendar">
            <Flex.Column gap="16px">
                <BoxCalendars />
            </Flex.Column>
        </Container>
    );
}
