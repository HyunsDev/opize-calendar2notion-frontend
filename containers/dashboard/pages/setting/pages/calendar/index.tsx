import { Flex, ItemsTable, Button, cv, Tooltip, useModal, Modal, Badge } from 'opize-design-system';
import { Info } from '@phosphor-icons/react';
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
import { SameNameCalendarExistModal } from '../../../../../connect/state/modal/SameNameCalendarExistModal';
import { RemoveCalendarModal } from '../../../../../connect/state/modal/RemoveCalendarModal';
import { RenameCalendarModal } from '../../../../../connect/state/modal/RenameCalendarModal';
dayjs.extend(relativeTime);
dayjs.locale('ko');

const Circle = styled.div<{ color: string }>`
    width: 16px;
    height: 16px;
    border-radius: 999px;
    background-color: ${(props) => props.color};
`;

function CalendarItem({ calendar, userCalendar }: { calendar: GoogleCalendarDto; userCalendar?: CalendarDto }) {
    const modal = useModal();
    const { user, refetch } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    if (!user) return <></>;

    const isPending = calendar && userCalendar && userCalendar?.status === 'PENDING';
    const isConnected = calendar && userCalendar && userCalendar?.status === 'CONNECTED';
    const isDisconnected = calendar && (!userCalendar || userCalendar?.status === 'DISCONNECTED');

    const isRenamed = userCalendar && calendar.summary !== userCalendar.googleCalendarName;
    const isReadonly = calendar.accessRole === 'reader';
    const isPrimaryCalendar = calendar.id === user.googleEmail;

    const addCalendar = async (googleCalendarId: string) => {
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
                    modal.open(<SameNameCalendarExistModal />);
                    return;
                } else {
                    toast.warn(err.body.message);
                }
            } else {
                toast.warn('문제가 발생했어요. 잠시 뒤에 다시 시도해주세요.');
                if (refetch) await refetch();
            }
        }
        if (refetch) await refetch();
        setIsLoading(false);
    };

    const removeCalendarDialog = (calendarId: number, googleCalendarId: string, calendarName: string) => {
        modal.open(
            <RemoveCalendarModal
                calendarId={calendarId}
                calendarName={calendarName}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                googleCalendarId={googleCalendarId}
            />
        );
    };

    const renameCalendar = () => {
        if (!userCalendar) {
            toast.warn('캘린더를 연결해주세요.');
            return;
        }
        modal.open(<RenameCalendarModal calendar={calendar} userCalendar={userCalendar} />);
    };

    return (
        <ItemsTable.Row key={calendar.id}>
            <ItemsTable.Row.Avatar
                icon={<Circle color={calendar.backgroundColor} />}
                name={
                    <Flex.Row gap="8px">
                        {calendar.summary}
                        {isRenamed && (
                            <>
                                {' '}
                                ({userCalendar.googleCalendarName})
                                <Tooltip content="구글 캘린더의 이름이 변경되었어요. 노션에는 반영되지 않았어요.">
                                    <Badge variant="primary" color="yellow">
                                        이름 변경됨 <Info color={cv.gray600} size={14} />
                                    </Badge>
                                </Tooltip>
                            </>
                        )}{' '}
                        {isReadonly && (
                            <Tooltip content="이 캘린더에 속한 일정은 수정할 수 없어요">
                                <Badge variant="secondary">
                                    읽기 전용 <Info color={cv.gray600} size={14} />
                                </Badge>
                            </Tooltip>
                        )}{' '}
                    </Flex.Row>
                }
            />

            <Flex.Row gap="8px">
                {isPending && (
                    <Tooltip content="현재 캘린더가 동기화되기 위해 대기중이에요">
                        <Badge variant="secondary">동기화 대기중</Badge>
                    </Tooltip>
                )}
                {isConnected && isRenamed && (
                    <Button variant="secondary" size="small" onClick={() => renameCalendar()}>
                        이름 변경
                    </Button>
                )}
                {(isConnected || isPending) && (
                    <Button
                        variant="secondary"
                        color="red"
                        onClick={() => removeCalendarDialog(userCalendar?.id as number, calendar.id, calendar.summary)}
                        isLoading={isLoading}
                        size="small"
                    >
                        연결끊기
                    </Button>
                )}

                {isDisconnected &&
                    (user.userPlan === 'FREE' && !isPrimaryCalendar ? (
                        <Button
                            variant="secondary"
                            onClick={() => addCalendar(calendar.id)}
                            isLoading={isLoading}
                            size="small"
                        >
                            플랜 업그레이드 필요
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            onClick={() => addCalendar(calendar.id)}
                            isLoading={isLoading}
                            size="small"
                        >
                            연결하기
                        </Button>
                    ))}
            </Flex.Row>
        </ItemsTable.Row>
    );
}

function BoxCalendars() {
    const { user } = useUser();

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
