import { useRecoilState } from 'recoil';
import { pageState } from './state/page.state';
import { useQuery } from 'react-query';
import { client } from '../../../lib/client';
import {
    Menu,
    Avatar,
    Button,
    Flex,
    Span,
    Table,
    Text,
    cv,
    useModal,
    Input,
    Badge,
    Tooltip,
    useCodeModal,
    Spacer,
    BoxLayout,
    ColorDot,
    Select,
} from 'opize-design-system';
import { errorWhereState } from './state/userId.state';
import { useRouter } from 'next/router';
import { GetAdminErrorsResponse } from '@opize/calendar2notion-object';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timeZone from 'dayjs/plugin/timezone';
import { ModalUserUpdate } from './model/userUpdateModal';
import { DotsThreeVertical } from '@phosphor-icons/react';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timeZone);
dayjs.locale('ko');

dayjs.tz.setDefault('Asia/Seoul');

const errorQuery = async (
    page: number,
    where?: {
        userId?: string;
        errorCode?: string;
        isUserConnected?: string;
    }
) => {
    if (page < 1) return [];

    const res = await client.admin.error.list({
        page,
        pageSize: 60,
        userId: where?.userId ? +where.userId : undefined,
        errorCode: where?.errorCode,
        isUserConnected: where?.isUserConnected ? (where.isUserConnected === 'true' ? 'true' : 'false') : undefined,
    });
    return res.errorLogs;
};

function Head() {
    const [page, setPage] = useRecoilState(pageState);
    const [where, setWhere] = useRecoilState(errorWhereState);
    const { refetch, isLoading } = useQuery(['errors', page, where], async () => errorQuery(page, where));

    const inputUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (/^[0-9]*$/.test(e.target.value)) {
            setWhere({
                ...where,
                userId: e.target.value,
            });
        }
    };

    const changeIsUserConnected = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setWhere({
            ...where,
            isUserConnected: e.target.value,
        });
    };

    const changeErrorCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWhere({
            ...where,
            errorCode: e.target.value ? e.target.value : undefined,
        });
    };

    return (
        <Flex.Column gap="20px">
            <Flex.Between>
                <Flex.Row gap="8px">
                    <Input type="number" min={1} value={page} onChange={(e) => setPage(+e.target.value)} label="Page" />
                    <Input type="text" value={where.userId} onChange={(e) => inputUserId(e)} label="userId" />
                    <Input type="text" value={where.errorCode} onChange={(e) => changeErrorCode(e)} label="ErrorCode" />
                    <Select label="유저 연결 여부" onChange={(e) => changeIsUserConnected(e)}>
                        <option value="">선택 안 함</option>
                        <option value="true">연결됨</option>
                        <option value="false">연결되지 않음</option>
                    </Select>
                </Flex.Row>
                <Flex.Row gap="8px">
                    <Text>{page} 페이지</Text>
                    <Button onClick={() => refetch()} variant="primary" isLoading={isLoading}>
                        조회
                    </Button>
                </Flex.Row>
            </Flex.Between>
        </Flex.Column>
    );
}

const colorMap = {
    NOTICE: 'default',
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
            <Table.Cell>{`${error.id}`}</Table.Cell>
            <Table.Cell>
                <Flex.Row gap="4px">
                    {error.user ? (
                        <>
                            <ColorDot
                                color={error.user.isConnected ? 'green' : error.user.lastSyncStatus ? 'red' : 'yellow'}
                            />
                            <Avatar src={error.user?.imageUrl} size={'28px'} />
                            {error.user.name}
                        </>
                    ) : (
                        <Span color={cv.default600}>(알 수 없음)</Span>
                    )}
                </Flex.Row>
            </Table.Cell>
            <Table.Cell>
                <Tooltip content={error.description}>{error.code}</Tooltip>
            </Table.Cell>
            <Table.Cell>{error.from}</Table.Cell>
            <Table.Cell>
                <Badge color={colorMap[error.level]} variant="tertiary">
                    {error.level}
                </Badge>
            </Table.Cell>
            <Table.Cell>
                {dayjs.tz(error.createdAt).tz('Asia/Seoul', true).format('MM.DD HH:mm:ss')} (
                {dayjs.tz(error.createdAt).fromNow()})
            </Table.Cell>
            <Table.Cell align="right">
                <Menu>
                    <Menu.Trigger variant="tertiary" iconOnly shape="round">
                        <DotsThreeVertical />
                    </Menu.Trigger>
                    <Menu.Content>
                        <Menu.Option
                            onClick={() => {
                                let code: string;
                                try {
                                    code = JSON.stringify(JSON.parse(error.detail || ''), null, 2);
                                } catch (err) {
                                    code = error.detail || '(Detail이 포함되어 있지 않습니다)';
                                }
                                codeModal.open(code, {
                                    stringify: false,
                                });
                            }}
                        >
                            Detail
                        </Menu.Option>
                        <Menu.Option
                            onClick={() =>
                                codeModal.open(error.stack, {
                                    stringify: false,
                                })
                            }
                        >
                            Stack
                        </Menu.Option>
                        <Menu.Option
                            onClick={() =>
                                codeModal.open(error, {
                                    stringify: true,
                                })
                            }
                        >
                            Raw
                        </Menu.Option>
                        <Menu.Option onClick={() => router.push(`/admin/user?userId=${error.user.id || 0}`)}>
                            유저 조회
                        </Menu.Option>
                        <Menu.Option
                            onClick={() =>
                                modal.open(
                                    <ModalUserUpdate
                                        userId={error.user.id}
                                        close={modal.close}
                                        refresh={() => refetch()}
                                        initValue={error.user.isConnected}
                                    />
                                )
                            }
                        >
                            동기화 상태 변경
                        </Menu.Option>
                        <Menu.Option onClick={() => deleteError(error.id)}>에러 삭제</Menu.Option>
                    </Menu.Content>
                </Menu>
            </Table.Cell>
        </Table.Row>
    );
}

function ErrorTable() {
    const [page] = useRecoilState(pageState);
    const [where] = useRecoilState(errorWhereState);

    const { data: errors, refetch } = useQuery(['errors', page, where], async () => errorQuery(page, where));

    const deleteError = async (id: number) => {
        await client.admin.error.delete({
            errorId: id,
        });
        refetch();
    };

    return (
        <Flex.Column gap="8px">
            <Table>
                <Table.Head>
                    <Table.Row>
                        <Table.Column>아이디</Table.Column>
                        <Table.Column>유저</Table.Column>
                        <Table.Column>에러 코드 및 설명</Table.Column>
                        <Table.Column>에러 위치</Table.Column>
                        <Table.Column>레벨</Table.Column>
                        <Table.Column>발생한 시간</Table.Column>
                        <Table.Column align="right"> </Table.Column>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {errors &&
                        (errors.length === 0 ? (
                            <Table.Row>
                                <Table.Cell>데이터가 없습니다.</Table.Cell>
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
                </Table.Body>
            </Table>
        </Flex.Column>
    );
}

export function ErrorsContainer() {
    return (
        <>
            <BoxLayout minHeight="calc(100vh - 131px - 128px - 337px)">
                <Flex.Column gap="8px">
                    <Head />
                    <ErrorTable />
                </Flex.Column>
            </BoxLayout>
        </>
    );
}
