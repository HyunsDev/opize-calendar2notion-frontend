import { useRecoilState } from 'recoil';
import { pageState } from './state/page.state';
import { useQuery } from 'react-query';
import { client } from '../../../lib/client';
import {
    ActionMenu,
    Avatar,
    Button,
    Flex,
    PageLayout,
    Span,
    StatusBadge,
    Table,
    Text,
    TextField,
    ToolTip,
    cv,
    useCodeModal,
    useModal,
} from 'opize-design-system';
import { userIdState } from './state/userId.state';
import { useRouter } from 'next/router';
import { GetAdminErrorsResponse } from '../../../lib/client/endpoint';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timeZone from 'dayjs/plugin/timezone';
import { ModalUserUpdate } from './model/userUpdateModal';
import styled from 'styled-components';
import { DotsThreeVertical } from 'phosphor-react';
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timeZone);
dayjs.locale('ko');

dayjs.tz.setDefault('Asia/Seoul');

const Pre = styled.pre`
    color: ${cv.text2};
    font-size: 12px;
    word-wrap: break-word;
    white-space: pre-wrap;
    word-break: break-all;
`;

const errorQuery = async (page: number, userId?: string) => {
    if (page < 1) return [];

    console.log(page);

    const res = await client.admin.error.list({
        page,
        pageSize: 60,
        userId: userId ? +userId : undefined,
    });
    console.log(res.errorLogs[0]);
    return res.errorLogs;
};

function Head() {
    const [page, setPage] = useRecoilState(pageState);
    const [userId, setUserId] = useRecoilState(userIdState);
    const { refetch, isLoading } = useQuery(['errors', page], async () => errorQuery(page, userId));

    const inputUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (/^[0-9]*$/.test(e.target.value)) {
            setUserId(e.target.value);
        }
    };

    return (
        <Flex.Column gap="20px">
            <Flex.Between>
                <Flex.Row gap="8px">
                    <TextField
                        type="number"
                        min={1}
                        value={page}
                        onChange={(e) => setPage(+e.target.value)}
                        label="Page"
                    />
                    <TextField type="text" value={userId} onChange={(e) => inputUserId(e)} label="Search User" />
                </Flex.Row>
                <Flex.Row gap="8px">
                    <Text>{page} 페이지</Text>
                    <Button onClick={() => refetch()} variant="contained" isLoading={isLoading}>
                        조회
                    </Button>
                </Flex.Row>
            </Flex.Between>
        </Flex.Column>
    );
}

const colorMap = {
    NOTICE: 'gray',
    WARN: 'yellow',
    ERROR: 'red',
    CRIT: 'red',
    EMERGENCY: 'red',
} as const;
function ErrorTableRow({
    error,
    refetch,
    deleteError,
}: {
    error: GetAdminErrorsResponse['errorLogs'][number];
    refetch: Function;
    deleteError: (id: number) => Promise<void>;
}) {
    const codeModal = useCodeModal();
    const modal = useModal();
    const router = useRouter();

    return (
        <Table.Row key={error.id}>
            <Table.Data width="70px">{`${error.id}`}</Table.Data>
            <Table.Data>
                <Flex.Row gap="4px">
                    {error.user && <Avatar src={error.user?.imageUrl} size={28} />}
                    {error.user ? (
                        <StatusBadge
                            color={error.user.isConnected ? 'green' : error.user.lastSyncStatus ? 'red' : 'yellow'}
                            text={error.user.name}
                        />
                    ) : (
                        <Span color={cv.text4}>(알 수 없음)</Span>
                    )}
                </Flex.Row>
            </Table.Data>
            <Table.Data>
                <ToolTip text={error.description}>{error.code}</ToolTip>
            </Table.Data>
            <Table.Data>{error.from}</Table.Data>
            <Table.Data>
                <StatusBadge color={colorMap[error.level]} text={error.level} />
            </Table.Data>
            <Table.Data>
                {dayjs.tz(error.createdAt).tz('Asia/Seoul', true).format('MM.DD HH:mm:ss')} (
                {dayjs.tz(error.createdAt).fromNow()})
            </Table.Data>
            <Table.Data $align="flex-end" width="50px">
                <ActionMenu
                    actions={[
                        [
                            {
                                label: 'Detail',
                                onClick: () => {
                                    let code: string;
                                    try {
                                        code = JSON.stringify(JSON.parse(error.detail || ''), null, 2);
                                    } catch (err) {
                                        code = error.detail || '(Detail이 포함되어 있지 않습니다)';
                                    }

                                    modal.open(<Pre>{code}</Pre>, {
                                        width: 500,
                                    });
                                },
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
                                onClick: () => router.push(`/admin/user?userId=${error.user.id || 0}`),
                            },
                            {
                                label: '동기화 상태 변경',
                                onClick: () =>
                                    modal.open(
                                        <ModalUserUpdate
                                            userId={error.user.id}
                                            close={modal.close}
                                            refresh={() => refetch()}
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
                    icon={<DotsThreeVertical />}
                    variant="text"
                />
            </Table.Data>
        </Table.Row>
    );
}

function ErrorTable() {
    const [page, setPage] = useRecoilState(pageState);
    const [userId, setUserId] = useRecoilState(userIdState);

    const { data: errors, refetch } = useQuery(['errors', page], async () => errorQuery(page, userId));

    const deleteError = async (id: number) => {
        await client.admin.error.delete({
            errorId: id,
        });
        refetch();
    };

    return (
        <Flex.Column gap="8px">
            <Table>
                <Table.THead>
                    <Table.Row>
                        <Table.Head width="70px">아이디</Table.Head>
                        <Table.Head>유저</Table.Head>
                        <Table.Head>에러 코드 및 설명</Table.Head>
                        <Table.Head>에러 위치</Table.Head>
                        <Table.Head>레벨</Table.Head>
                        <Table.Head>발생한 시간</Table.Head>
                        <Table.Head $align="flex-end" width="50px"></Table.Head>
                    </Table.Row>
                </Table.THead>
                <Table.TBody>
                    {errors &&
                        (errors.length === 0 ? (
                            <Table.Row>
                                <Table.Data>데이터가 없습니다.</Table.Data>
                            </Table.Row>
                        ) : (
                            errors.map((error) => (
                                <ErrorTableRow
                                    key={error.id}
                                    error={error}
                                    refetch={refetch}
                                    deleteError={deleteError}
                                />
                            ))
                        ))}
                </Table.TBody>
            </Table>
        </Flex.Column>
    );
}

export function ErrorsContainer() {
    const [page, setPage] = useRecoilState(pageState);
    const [userId, setUserId] = useRecoilState(userIdState);
    const { data: errors, refetch, isLoading } = useQuery(['errors', page], async () => errorQuery(page, userId));

    return (
        <PageLayout marginTop="32px" minHeight="calc(100vh - 131px - 128px - 337px)">
            <Flex.Column gap="8px">
                <Head />
                <ErrorTable />
            </Flex.Column>
        </PageLayout>
    );
}
