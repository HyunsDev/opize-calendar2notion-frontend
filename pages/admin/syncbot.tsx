import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {
    PageLayout,
    H1,
    Flex,
    Text,
    cv,
    Button,
    Link as A,
    PageHead,
    ActionList,
    TextField,
    CodeBlock,
    Box,
    Select,
    ItemsTable,
    H3,
    useModal,
    Token,
    useDialog,
} from 'opize-design-system';
import styled from 'styled-components';
import { GCalNotionCircle } from '../../components/GCalNotionCircle';
import { AdminFooter } from '../../components/pages/admin/footer';
import { AdminHeader } from '../../components/pages/admin/header';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

import Logo from '../../assets/logo.png';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useStyleRegistry } from 'styled-jsx';
import { useForm } from 'react-hook-form';
import { APIResponseError, client } from '../../lib/client';
import { getSyncBotsResponse } from '../../lib/client/endpoints/syncbot';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
dayjs.extend(relativeTime);
dayjs.locale('ko');

const Label = styled.div`
    font-weight: ${cv.fontWeightSemiBold};
    font-size: 16px;
    margin-left: 4px;
    color: ${cv.text3};
`;

function BoxBots() {
    const { data: syncBots, refetch } = useQuery(['admin', 'syncBot'], () => client.syncbot.list({}), {});
    const modal = useModal();
    const dialog = useDialog();
    const [isLoading, setIsLoading] = useState(false);

    const stop = async (prefix: string) => {
        try {
            await client.syncbot.stop({ prefix });
            toast.info('동기화봇에 정지 요청을 보냈습니다.');
        } catch (err) {
            console.error(err);
            if (err instanceof APIResponseError) {
                toast.warn(err.body.message);
            } else {
                toast.error('알 수 없는 에러');
            }
        }
    };

    const exit = async (prefix: string) => {
        try {
            await client.syncbot.exit({ prefix });
            toast.info('동기화봇에 강제 종료 요청을 보냈습니다. 30초 동안 정지 시도 후 강제로 종료합니다.');
        } catch (err) {
            console.error(err);
            if (err instanceof APIResponseError) {
                toast.warn(err.body.message);
            } else {
                toast.error('알 수 없는 에러');
            }
        }
    };

    const refresh = async () => {
        setIsLoading(true);
        await refetch();
        setIsLoading(false);
    };

    return (
        <>
            <Flex.Column>
                <Flex.Between>
                    <Label>동기화봇</Label>
                    <Button onClick={() => refresh()} isLoading={isLoading}>
                        새로고침
                    </Button>
                </Flex.Between>
                <ItemsTable>
                    {syncBots &&
                        syncBots.map((syncBot) => (
                            <ItemsTable.Row key={syncBot.id}>
                                <ItemsTable.Row.Avatar
                                    icon={<Image src={Logo} width={28} height={28} alt="" />}
                                    name={`${syncBot.name} (${syncBot.prefix})`}
                                    label={syncBot.url}
                                    flex={2}
                                />
                                <ItemsTable.Row.Text
                                    text={syncBot?.data?.verizon || '알 수 없음'}
                                    subText={dayjs(syncBot?.data?.startedAt).fromNow()}
                                    flex={1}
                                />
                                <ItemsTable.Row.Text
                                    text={Object.entries(syncBot?.data?.workerAmount || {})
                                        .map(([key, value]) => `${key}: ${value}`)
                                        .join(' | ')}
                                    flex={3}
                                />
                                <ItemsTable.Row.Status
                                    status={syncBot.status === 'good' ? 'good' : 'error'}
                                    text={syncBot.status === 'good' ? '정상' : '에러'}
                                    flex={1}
                                />
                                <ItemsTable.Row.Buttons
                                    buttons={[
                                        [
                                            {
                                                label: '상세 정보',
                                                onClick: () =>
                                                    modal.open(
                                                        <CodeBlock>{JSON.stringify(syncBot, null, 2)}</CodeBlock>,
                                                        {
                                                            width: 500,
                                                        }
                                                    ),
                                            },
                                            {
                                                label: '정지',
                                                onClick: () =>
                                                    dialog({
                                                        buttons: [
                                                            {
                                                                children: '동기화봇 정지',
                                                                onClick: () => stop(syncBot.prefix),
                                                                color: 'red',
                                                                variant: 'contained',
                                                            },
                                                        ],
                                                        title: '동기화봇을 정지하시겠어요?',
                                                        content:
                                                            '동기화봇에 정지 요청을 보냅니다. 정지 요청으로 동기화봇이 정지 되지 않을 시 "강제 종료"를 시도하세요.',
                                                    }),
                                                color: 'red',
                                            },
                                            {
                                                label: '강제 종료',
                                                onClick: () =>
                                                    dialog({
                                                        buttons: [
                                                            {
                                                                children: '동기화봇 강제 종료',
                                                                onClick: () => exit(syncBot.prefix),
                                                                color: 'red',
                                                                variant: 'contained',
                                                            },
                                                        ],
                                                        title: '동기화봇을 강제로 종료하시겠어요?',
                                                        content:
                                                            '동기화봇에 강제 종료 요청을 보냅니다. 30초 동안 정지 시도 후 강제로 종료합니다.',
                                                    }),
                                                color: 'red',
                                            },
                                        ],
                                    ]}
                                />
                            </ItemsTable.Row>
                        ))}
                </ItemsTable>
            </Flex.Column>
        </>
    );
}

function BoxRealTask() {
    const modal = useModal();
    const router = useRouter();
    const [isConnected, setIsConnected] = useState(false);
    const [logs, setLogs] = useState<
        {
            prefix: string;
            userId: number;
            workerId: string;
            fail: boolean;
            syncLogId: number;
            simpleResponse: string;
            finishedAt: string;
        }[]
    >([]);

    const addLog = useCallback((data: typeof logs[number]) => {
        setLogs((pre) => [data, ...pre].slice(0, 30));
    }, []);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:3003/syncbot/stream/sse');
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
        <Flex.Column gap="20px">
            <Flex.Column>
                <Flex.Row gap="8px">
                    <Label>실시간 작업</Label>
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
                        logs.map((log) => (
                            <ItemsTable.Row key={log.syncLogId}>
                                <ItemsTable.Row.Text flex={2} text={`@${log.userId}`} subText={`#${log.syncLogId}`} />
                                <ItemsTable.Row.Text
                                    flex={4}
                                    text={log.simpleResponse}
                                    subText={`${log.workerId} - ${dayjs(log.finishedAt).fromNow()}`}
                                />
                                <ItemsTable.Row.Status
                                    flex={1}
                                    status={log.fail ? 'error' : 'done'}
                                    text={log.fail ? '실패' : '완료'}
                                />
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
                        ))
                    )}
                </ItemsTable>
            </Flex.Column>
        </Flex.Column>
    );
}

type AddSyncBotForm = {
    name: string;
    url: string;
    prefix: string;
    controlSecret: string;
};
function AddSyncBotModal({ close, refetch }: { close: () => void; refetch: () => void }) {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<AddSyncBotForm>();

    const submit = async (data: AddSyncBotForm) => {
        try {
            await client.syncbot.post(data);
            close();
            refetch();
        } catch (err) {
            if (err instanceof APIResponseError) {
                toast.warn(err.body.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <Flex.Column gap="16px">
                <TextField
                    label="prefix"
                    error={errors.prefix?.message}
                    {...register('prefix', {
                        required: '필수 항목입니다.',
                    })}
                />
                <TextField
                    label="이름"
                    error={errors.name?.message}
                    {...register('name', {
                        required: '필수 항목입니다.',
                    })}
                />
                <TextField
                    label="url"
                    error={errors.url?.message}
                    {...register('url', {
                        required: '필수 항목입니다.',
                    })}
                />
                <TextField
                    label="controlSecret"
                    error={errors.controlSecret?.message}
                    {...register('controlSecret', {
                        required: '필수 항목입니다.',
                    })}
                />
                <Button type="submit">생성</Button>
            </Flex.Column>
        </form>
    );
}

const Home: NextPage = () => {
    const modal = useModal();
    const { data: syncBots, refetch: refetchSyncBots } = useQuery(
        ['admin', 'syncBot'],
        () => client.syncbot.list({}),
        {}
    );

    return (
        <>
            <AdminHeader now="syncbot" />
            <PageHead title="동기화봇">
                <Button
                    variant="contained"
                    size="large"
                    onClick={() =>
                        modal.open(<AddSyncBotModal close={modal.close} refetch={refetchSyncBots} />, {
                            width: 500,
                            title: '동기화봇 추가',
                        })
                    }
                >
                    동기화봇 추가
                </Button>
            </PageHead>
            <PageLayout marginTop="32px" minHeight="calc(100vh - 131px - 128px - 337px)">
                <Flex.Column gap="20px">
                    <BoxBots />
                    <BoxRealTask />
                </Flex.Column>
            </PageLayout>
            <AdminFooter />
        </>
    );
};

export default Home;
