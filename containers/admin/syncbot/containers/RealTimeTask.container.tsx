import { useRouter } from 'next/router';
import { CodeBlock, Flex, H3, ItemsTable, Text, Token, ToolTip, useModal } from 'opize-design-system';
import { useCallback, useEffect, useState } from 'react';
import { simpleResponseParser } from '../utils/simpleResponseParser';
import { Info } from 'phosphor-react';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
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
                        <ToolTip text={simpleResponseParser(log.simpleResponse)}>
                            <Info size={14} />
                        </ToolTip>
                    </Flex.Row>
                }
                subText={`${log.workerId} - ${dayjs(log.finishedAt).fromNow()}`}
            />

            <ItemsTable.Row.Status flex={1} status={log.fail ? 'error' : 'done'} text={log.fail ? '실패' : '완료'} />
            <ItemsTable.Row.Buttons
                buttons={[
                    [
                        {
                            label: '상세 정보',
                            onClick: () =>
                                modal.open(<CodeBlock>{JSON.stringify(log, null, 2)}</CodeBlock>, {
                                    width: 500,
                                }),
                        },
                        {
                            label: '유저 조회',
                            onClick: () => router.push(`/admin/user?userId=${log.userId}`),
                        },
                    ],
                ]}
            />
        </ItemsTable.Row>
    );
}

export function RealTimeTaskContainer() {
    const [isConnected, setIsConnected] = useState(false);
    const [logs, setLogs] = useState<LogType[]>([]);

    const addLog = useCallback((data: typeof logs[number]) => {
        setLogs((pre) => [data, ...pre].slice(0, 30));
    }, []);

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
                <Token variant="outlined" color={isConnected ? 'blue' : 'red'}>
                    {isConnected ? '연결됨' : '연결 끊김'}
                </Token>
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
