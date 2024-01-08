import { CalendarDto, GoogleCalendarDto } from '@opize/calendar2notion-object';
import { Button, Code, Flex, H3, Modal, Switch, Text, useModal } from 'opize-design-system';
import { useUser } from '../../../../hooks/useUser';
import { useEffect, useState } from 'react';
import { client } from '../../../../lib/client';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { APIResponseError } from 'endpoint-client';

export function RenameCalendarModal({
    calendar,
    userCalendar,
}: {
    calendar: GoogleCalendarDto;
    userCalendar: CalendarDto;
}) {
    const modal = useModal();
    const { user, refetch } = useUser();
    const [step, setStep] = useState(user?.isConnected ? 1 : 2);

    const { mutate: disconnect, isLoading: disconnectLoading } = useMutation(
        async () =>
            await client.user.patch({
                userId: 'me',
                isConnected: false,
            }),
        {
            onSuccess: async () => {
                refetch && (await refetch());
                setStep(2);
            },
            onError: async (err) => {
                toast.error('문제가 발생했어요. 잠시 뒤에 다시 시도해주세요.');
                console.error(err);
            },
        }
    );

    const { mutate: renameCalendar, isLoading: renameCalendarLoading } = useMutation(
        async () =>
            await client.user.calendar.rename({
                calendarId: userCalendar.id + '',
                userId: 'me',
            }),
        {
            onSuccess: async () => {
                setStep(3);
            },
            onError: async (err) => {
                if (err instanceof APIResponseError) {
                    if (err.body.code === 'calendar_name_not_match') {
                        toast.info('노션에서 캘린더 옵션을 변경해주세요.');
                        return;
                    }
                }

                toast.error('문제가 발생했어요. 잠시 뒤에 다시 시도해주세요.');
                console.error(err);
            },
        }
    );

    const { mutate: connect, isLoading: connectLoading } = useMutation(
        async () =>
            await client.user.patch({
                userId: 'me',
                isConnected: true,
            }),
        {
            onSuccess: async () => {
                refetch && (await refetch());
                setStep(4);
            },
            onError: async (err) => {
                toast.error('문제가 발생했어요. 잠시 뒤에 다시 시도해주세요.');
                console.error(err);
            },
        }
    );

    return (
        <Modal>
            <Modal.Header>캘린더 이름 변경</Modal.Header>
            <Modal.Content>
                <H3>Step 1. 동기화 일시중지</H3>
                <Flex.Column gap="8px">
                    <Text size="14px">오작동 방지를 위해 동기화를 일시중지 해주세요.</Text>
                    <Button
                        variant="primary"
                        size="small"
                        onClick={() => {
                            disconnect();
                            setStep(2);
                        }}
                        disabled={step !== 1}
                        isLoading={disconnectLoading}
                    >
                        동기화 일시중지
                    </Button>
                </Flex.Column>

                <br />

                <H3>Step 2. 노션에서 이름 변경</H3>
                <Flex.Column gap="8px">
                    <Text size="14px">
                        노션에서 calendar 속성의 <Code>{userCalendar?.googleCalendarName}</Code> 옵션를
                        <br />
                        <Code>{calendar.summary}</Code>로 변경한 후 변경 확인을 눌러주세요
                    </Text>
                    <Flex.Row gap="4px">
                        <Button
                            variant="primary"
                            size="small"
                            disabled={step !== 2}
                            isLoading={renameCalendarLoading}
                            onClick={() => renameCalendar()}
                        >
                            변경 확인
                        </Button>
                        <Button
                            as="a"
                            href={`https://notion.so/${user?.notionDatabaseId.replaceAll('-', '')}`}
                            target="_blank"
                            size="small"
                        >
                            노션 열기
                        </Button>
                    </Flex.Row>
                </Flex.Column>

                <br />

                <H3>Step 3. 동기화 재개</H3>
                <Flex.Column gap="8px">
                    <Text size="14px">동기화를 다시 시작해주세요.</Text>
                    <Button
                        variant="primary"
                        size="small"
                        onClick={() => connect()}
                        disabled={step !== 3}
                        isLoading={connectLoading}
                    >
                        동기화 재게
                    </Button>
                </Flex.Column>
            </Modal.Content>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => modal.close()}>
                    취소
                </Button>
                <Button variant="primary" disabled={step !== 4} onClick={() => modal.close()}>
                    완료
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
