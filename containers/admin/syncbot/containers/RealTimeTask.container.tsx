import { useRouter } from 'next/router';
import { Flex, H3, ItemsTable, Text, Badge, Tooltip, useModal, useCodeModal, Menu } from 'opize-design-system';
import { useCallback, useEffect, useState } from 'react';
import { simpleResponseParser } from '../utils/simpleResponseParser';
import { Info } from '@phosphor-icons/react';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useQueryClient } from 'react-query';
dayjs.extend(relativeTime);
dayjs.locale('ko');

type LogType = {
    prefix: string;
    userId: number;
    workerId: string;
    fail: boolean;
    syncLogId: number;
    simpleResponse: string;
    finishedAt: string;
};

function LogRow({ log }: { log: LogType }) {
    const codeModal = useCodeModal();
    const modal = useModal();
    const router = useRouter();

    return (
        <ItemsTable.Row key={log.syncLogId}>
            <ItemsTable.Row.Text flex={2} text={`@${log.userId}`} />

            <ItemsTable.Row.Text
                flex={4}
                text={
                    <Flex.Row gap="4px">
                        {log.simpleResponse}{' '}
                        <Tooltip content={simpleResponseParser(log.simpleResponse)}>
                            <Info size={14} />
                        </Tooltip>
                    </Flex.Row>
                }
                subText={`${log.workerId} - ${dayjs(log.finishedAt).fromNow()}`}
            />

            <ItemsTable.Row.Component>
                <Badge variant="secondary" color={log.fail ? 'red' : 'blue'}>
                    {log.fail ? '실패' : '완료'}
                </Badge>
            </ItemsTable.Row.Component>

            <ItemsTable.Row.Component>
                <Menu>
                    <Menu.Trigger variant="tertiary" iconOnly>
                        <Info size={16} />
                    </Menu.Trigger>
                    <Menu.Content>
                        <Menu.Option onClick={() => codeModal.open(log)}>상세 정보</Menu.Option>
                        <Menu.Option onClick={() => router.push(`/admin/user?userId=${log.userId}`)}>
                            유저 조회
                        </Menu.Option>
                    </Menu.Content>
                </Menu>
            </ItemsTable.Row.Component>
        </ItemsTable.Row>
    );
}

export function RealTimeTaskContainer() {
    const [isConnected, setIsConnected] = useState(false);
    const [logs, setLogs] = useState<LogType[]>([]);
    const queryClient = useQueryClient();

    const addLog = useCallback(
        (data: (typeof logs)[number]) => {
            queryClient.invalidateQueries(['admin', 'syncBot']);
            setLogs((pre) => [data, ...pre].slice(0, 30));
        },
        [queryClient]
    );

    useEffect(() => {
        const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_PROJECT_API_SERVER}/syncbot/stream/sse`);
        eventSource.onopen = (event: any) => {
            setIsConnected(true);
            console.log('connection opened');
        };

        eventSource.onerror = (event: any) => {
            console.log(event.target.readyState);
            if (event.target.readyState === EventSource.CLOSED) {
                console.log('eventsource closed (' + event.target.readyState + ')');
            }
            eventSource.close();
            setIsConnected(false);
        };

        eventSource.onmessage = (e: any) => {
            const data = JSON.parse(e.data);

            addLog({
                prefix: data.prefix,
                userId: data.userId,
                workerId: data.workerId,
                fail: data.result.fail,
                syncLogId: data.result.syncLogId,
                simpleResponse: data.result.simpleResponse,
                finishedAt: data.finishedAt,
            });
        };

        return () => {
            eventSource.close();
        };
    }, [addLog]);

    return (
        <Flex.Column gap="8px">
            <Flex.Row gap="8px">
                <H3>실시간 작업</H3>
                <Badge variant="secondary" color={isConnected ? 'blue' : 'red'}>
                    {isConnected ? '연결됨' : '연결 끊김'}
                </Badge>
            </Flex.Row>
            <ItemsTable>
                {logs.length === 0 ? (
                    <ItemsTable.Row>
                        <ItemsTable.Row.Component flex={1}>
                            <Flex.Center>
                                <Text>아직 로그가 없습니다.</Text>
                            </Flex.Center>
                        </ItemsTable.Row.Component>
                    </ItemsTable.Row>
                ) : (
                    logs.map((log) => <LogRow key={log.syncLogId} log={log} />)
                )}
            </ItemsTable>
        </Flex.Column>
    );
}
