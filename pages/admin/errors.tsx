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
    useCodeModal,
    Switch,
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
import { getAdminErrorsResponse } from '../../lib/client/endpoints/admin';
dayjs.extend(relativeTime);
dayjs.locale('ko');

const Label = styled.div`
    font-weight: ${cv.fontWeightSemiBold};
    font-size: 16px;
    margin-left: 4px;
    color: ${cv.text3};
`;

const Pre = styled.pre`
    color: ${cv.text2};
    font-size: 12px;
    word-wrap: break-word;
    white-space: pre-wrap;
    word-break: break-all;
`;

const Img = styled.img`
    width: 28px;
    height: 28px;
`;

const statusMap = {
    NOTICE: 'stateless',
    WARN: 'warning',
    ERROR: 'error',
    CRIT: 'error',
    EMERGENCY: 'error',
} as const;

function ModalUserUpdate({
    userId,
    initValue,
    refresh,
    close,
}: {
    userId: number;
    initValue: any;
    refresh: () => void;
    close: () => void;
}) {
    const [value, setValue] = useState(initValue);

    const apply = async () => {
        try {
            await client.admin.patchUser({
                userId,
                isConnected: value,
            });
            refresh();
            toast.info('적용 완료');
            close();
        } catch (err: any) {
            if (err instanceof APIResponseError) {
                console.error(err);
                toast.error(err.body.message);
            } else {
                console.error(err);
                toast.error(err.message);
            }
        }
    };

    return (
        <Flex.Column gap="8px">
            <Switch checked={value} onChange={() => setValue(!value)} />
            <Button onClick={() => apply()} variant="contained">
                적용
            </Button>
        </Flex.Column>
    );
}

function BoxErrors({ errors, refresh }: { errors?: getAdminErrorsResponse; refresh: () => void }) {
    const codeModal = useCodeModal();
    const modal = useModal();
    const router = useRouter();

    const deleteError = async (id: number) => {
        try {
            await client.admin.deleteError({
                errorId: id,
            });
            refresh();
            toast.info('에러 로그를 삭제했습니다.');
        } catch (err: any) {
            if (err instanceof APIResponseError) {
                toast.warn(err.body.message);
            } else {
                console.error(err);
                toast.error(err.message);
            }
        }
    };

    return (
        <Flex.Column gap="8px">
            <Label>최근 에러</Label>
            <ItemsTable>
                {errors &&
                    (errors.length === 0 ? (
                        <ItemsTable.Row>확인된 에러가 없습니다.</ItemsTable.Row>
                    ) : (
                        errors.map((error) => (
                            <ItemsTable.Row key={error.id}>
                                <ItemsTable.Row.Avatar
                                    icon={<Img src={error?.user?.imageUrl || ''} alt="" />}
                                    name={`${error.user.name} #${error.user.id}|${error.user.opizeId}`}
                                    label={`${dayjs(error.createdAt).fromNow()}`}
                                    flex={1}
                                />
                                <ItemsTable.Row.Text
                                    text={`[${error.id}] ${error.code}`}
                                    subText={error.description}
                                    flex={2}
                                />
                                <ItemsTable.Row.Text
                                    text={`from ${error.from}`}
                                    subText={`${error.showUser ? '공개' : '비공개'} ${
                                        error.archive ? '(아카이브됨)' : ''
                                    }`}
                                    flex={1}
                                />
                                <ItemsTable.Row.Status
                                    status={statusMap[error.level]}
                                    text={error.level}
                                    label={error.finishWork}
                                    flex={1}
                                />
                                <ItemsTable.Row.Status
                                    status={error.user.isConnected ? 'good' : 'warning'}
                                    text={`${error.user.isConnected ? '동기화중' : '동기화 정지'}`}
                                    label={'현재 유저 상태'}
                                    flex={1}
                                />
                                <ItemsTable.Row.Buttons
                                    buttons={[
                                        [
                                            {
                                                label: 'Detail',
                                                onClick: () =>
                                                    modal.open(<Pre>{error.detail}</Pre>, {
                                                        width: 500,
                                                    }),
                                            },
                                            {
                                                label: 'Stack',
                                                onClick: () =>
                                                    modal.open(<Pre>{error.stack}</Pre>, {
                                                        width: '80vw',
                                                    }),
                                            },
                                            {
                                                label: 'Raw',
                                                onClick: () => codeModal('Raw', error, 800),
                                            },
                                            {
                                                label: '유저 조회',
                                                onClick: () => router.push(`/admin/user?userId=${error.user.id}`),
                                            },
                                            {
                                                label: '동기화 상태 변경',
                                                onClick: () =>
                                                    modal.open(
                                                        <ModalUserUpdate
                                                            userId={error.user.id}
                                                            close={modal.close}
                                                            refresh={() => refresh()}
                                                            initValue={error.user.isConnected}
                                                        />,
                                                        {
                                                            title: '유저 동기화 상태 변경',
                                                        }
                                                    ),
                                            },
                                            {
                                                label: '에러 삭제',
                                                onClick: () => deleteError(error.id),
                                            },
                                        ],
                                    ]}
                                />
                            </ItemsTable.Row>
                        ))
                    ))}
            </ItemsTable>
        </Flex.Column>
    );
}

const Home: NextPage = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(50);
    const [errors, setErrors] = useState<getAdminErrorsResponse>([]);
    const [now, setNow] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getError = async (page: number, pageSize: number) => {
        setIsLoading(true);
        const res = await client.admin.errors({
            page,
            pageSize,
        });
        setErrors(res);
        setNow(`${page} 페이지 (${page * pageSize} ~ ${(page + 1) * pageSize - 1})`);

        setIsLoading(false);
    };

    useEffect(() => {
        getError(0, 50);
    }, []);

    return (
        <>
            <AdminHeader now="errors" />
            <PageHead title="Errors"></PageHead>
            <PageLayout marginTop="32px" minHeight="calc(100vh - 131px - 128px - 337px)">
                <Flex.Column gap="20px">
                    <Flex.Between>
                        <Flex.Row gap="8px">
                            <TextField
                                type="number"
                                min={0}
                                value={page}
                                onChange={(e) => setPage(+e.target.value)}
                                label="Page"
                            />
                            <TextField
                                type="number"
                                min={1}
                                value={pageSize}
                                onChange={(e) => setPageSize(+e.target.value)}
                                label="PageSize"
                            />
                        </Flex.Row>
                        <Flex.Row gap="8px">
                            <Text>{now}</Text>
                            <Button onClick={() => getError(page, pageSize)} variant="contained" isLoading={isLoading}>
                                조회
                            </Button>
                        </Flex.Row>
                    </Flex.Between>
                    <BoxErrors errors={errors} refresh={() => getError(page, pageSize)} />
                </Flex.Column>
            </PageLayout>
            <AdminFooter />
        </>
    );
};

export default Home;
