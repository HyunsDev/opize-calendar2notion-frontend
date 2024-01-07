import type { NextPage } from 'next';
import React, { useState } from 'react';
import {
    PageLayout,
    Flex,
    PageHead,
    useModal,
    Table,
    Avatar,
    Span,
    cv,
    Text,
    Button,
    useCodeModal,
    Select,
    Input,
    Switch,
    Menu,
    Spacer,
    ColorDot,
} from 'opize-design-system';
import { AdminHeader } from '../../containers/admin/components/AdminHeader';
import { client } from '../../lib/client';
import { toast } from 'react-toastify';
import { Footer } from '../../components/footer';
import { UserDto } from '@opize/calendar2notion-object';
import { DotsThreeVertical } from '@phosphor-icons/react';
import { useRouter } from 'next/router';
import { GetAdminFindUsersWhere } from '@opize/calendar2notion-object';

const Home: NextPage = () => {
    const modal = useModal();
    const codeModal = useCodeModal();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [where, setWhere] = useState<GetAdminFindUsersWhere>({});
    const [users, setUsers] = useState<UserDto[]>([]);

    const [isExpired, setIsExpired] = useState(false);

    const findUsers = async () => {
        try {
            setIsLoading(true);
            let res: any;

            if (isExpired) {
                res = await client.admin.user.expirationUsers({});
            } else {
                res = await client.admin.user.find({
                    page: page,
                    where: where,
                });
            }

            setUsers(res.users);
            setIsLoading(false);
        } catch (err: any) {
            setIsLoading(false);
            if (err.code === 'BAD_REQUEST') {
                toast.warn(err?.message || '잘못된 조회 조건입니다.');
            } else {
                toast.error(err?.message || '유저를 조회할 수 없습니다.');
            }
        }
    };

    return (
        <>
            <AdminHeader now="users" />
            <PageHead title="유저 리스트"></PageHead>
            <Spacer height="32px" />
            <PageLayout>
                <PageLayout.Pane>
                    <Flex.Column gap="8px">
                        <Flex.Column gap="8px">
                            <Text>조건</Text>
                            {!isExpired ? (
                                <>
                                    {' '}
                                    <Select
                                        label="연결 단계 (status)"
                                        onChange={(e) =>
                                            setWhere((where) => {
                                                if (e.target.value === '') {
                                                    return {
                                                        ...where,
                                                        status: undefined,
                                                    };
                                                }
                                                return {
                                                    ...where,
                                                    status: e.target.value as GetAdminFindUsersWhere['status'],
                                                };
                                            })
                                        }
                                    >
                                        <option value={''}>-</option>
                                        <option value={'FIRST'}>FIRST</option>
                                        <option value={'GOOGLE_SET'}>GOOGLE_SET</option>
                                    </Select>
                                    <Select
                                        label="연결 여부 (isConnected)"
                                        onChange={(e) =>
                                            setWhere((where) => {
                                                if (e.target.value === '') {
                                                    return {
                                                        ...where,
                                                        isConnected: undefined,
                                                    };
                                                }
                                                return {
                                                    ...where,
                                                    isConnected: e.target.value === 'true',
                                                };
                                            })
                                        }
                                    >
                                        <option value={''}>-</option>
                                        <option value={'true'}>연결됨</option>
                                        <option value={'false'}>연결하지 않음</option>
                                    </Select>
                                    <Select
                                        label="플랜 (userPlan)"
                                        onChange={(e) =>
                                            setWhere((where) => {
                                                if (e.target.value === '') {
                                                    return {
                                                        ...where,
                                                        userPlan: undefined,
                                                    };
                                                }
                                                return {
                                                    ...where,
                                                    userPlan: e.target.value as GetAdminFindUsersWhere['userPlan'],
                                                };
                                            })
                                        }
                                    >
                                        <option value={''}>-</option>
                                        <option value={'FREE'}>FREE</option>
                                        <option value={'PRO'}>PRO</option>
                                        <option value={'SPONSOR'}>SPONSOR</option>
                                    </Select>
                                    <Select
                                        label="동기화 상태 여부 (isWork)"
                                        onChange={(e) =>
                                            setWhere((where) => {
                                                if (e.target.value === '') {
                                                    return {
                                                        ...where,
                                                        isWork: undefined,
                                                    };
                                                }
                                                return {
                                                    ...where,
                                                    isWork: e.target.value === 'true',
                                                };
                                            })
                                        }
                                    >
                                        <option value={''}>-</option>
                                        <option value={'true'}>동기화중</option>
                                        <option value={'false'}>동기화중이 아님</option>
                                    </Select>
                                    <Select
                                        label="운영진 (isAdmin)"
                                        onChange={(e) =>
                                            setWhere((where) => {
                                                if (e.target.value === '') {
                                                    return {
                                                        ...where,
                                                        isAdmin: undefined,
                                                    };
                                                }
                                                return {
                                                    ...where,
                                                    isAdmin: e.target.value === 'true',
                                                };
                                            })
                                        }
                                    >
                                        <option value={''}>-</option>
                                        <option value={'true'}>운영진</option>
                                        <option value={'false'}>운영진이 아님</option>
                                    </Select>
                                    <Input
                                        placeholder="페이지"
                                        label="페이지"
                                        value={page}
                                        onChange={(e) => setPage(+e.target.value)}
                                        type="number"
                                    />
                                </>
                            ) : (
                                <></>
                            )}

                            <Switch
                                label="플랜 만료 여부"
                                checked={isExpired}
                                onChange={(e) => setIsExpired(e.target.checked)}
                            />
                        </Flex.Column>

                        <Button onClick={() => findUsers()} width="100%" variant="primary" disabled={isLoading}>
                            조회
                        </Button>
                    </Flex.Column>
                </PageLayout.Pane>
                <PageLayout.Content>
                    <Table>
                        <Table.Head>
                            <Table.Row>
                                <Table.Column>아이디</Table.Column>
                                <Table.Column>유저 정보</Table.Column>
                                <Table.Column> </Table.Column>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {users.length === 0 ? (
                                <Table.Row>
                                    <Table.Cell>데이터가 없습니다.</Table.Cell>
                                </Table.Row>
                            ) : (
                                users.map((user) => (
                                    <Table.Row key={user.id}>
                                        <Table.Cell>{user.id}</Table.Cell>
                                        <Table.Cell>
                                            <Flex.Row gap="4px">
                                                {user && <Avatar src={user?.imageUrl} size={'28px'} />}
                                                {user ? (
                                                    <>
                                                        <ColorDot
                                                            color={
                                                                user.isConnected
                                                                    ? 'green'
                                                                    : user.lastSyncStatus
                                                                    ? 'red'
                                                                    : 'yellow'
                                                            }
                                                        />
                                                        {user.name} ({user.email})
                                                    </>
                                                ) : (
                                                    <Span color={cv.gray300}>(알 수 없음)</Span>
                                                )}
                                            </Flex.Row>
                                        </Table.Cell>
                                        <Table.Cell align="right">
                                            <Menu>
                                                <Menu.Trigger iconOnly variant="tertiary" shape="round">
                                                    <DotsThreeVertical />
                                                </Menu.Trigger>
                                                <Menu.Content>
                                                    <Menu.Option
                                                        onClick={() =>
                                                            codeModal.open(user, {
                                                                stringify: true,
                                                            })
                                                        }
                                                    >
                                                        Raw
                                                    </Menu.Option>
                                                    <Menu.Option
                                                        onClick={() =>
                                                            router.push(`/admin/user?userId=${user.id || 0}`)
                                                        }
                                                    >
                                                        유저 조회
                                                    </Menu.Option>
                                                </Menu.Content>
                                            </Menu>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            )}
                        </Table.Body>
                    </Table>
                </PageLayout.Content>
            </PageLayout>
            <Footer />
        </>
    );
};

export default Home;
