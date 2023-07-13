import type { NextPage } from 'next';
import React, { useState } from 'react';
import {
    PageLayout,
    Flex,
    PageHead,
    ActionList,
    useModal,
    Table,
    Avatar,
    Span,
    cv,
    StatusBadge,
    Text,
    Button,
    ActionMenu,
    useCodeModal,
    Select,
    Checkbox,
    TextField,
} from 'opize-design-system';
import styled from 'styled-components';
import { AdminFooter } from '../../components/pages/admin/footer';
import { AdminHeader } from '../../components/pages/admin/header';
import { client } from '../../lib/client';
import { toast } from 'react-toastify';
import { Footer } from '../../components/footer';
import { UserDto } from '../../lib/client/dto';
import { Check, DotsThreeVertical } from 'phosphor-react';
import { useRouter } from 'next/router';
import { GetAdminFindUsersWhere } from '../../lib/client/endpoint';

const Home: NextPage = () => {
    const modal = useModal();
    const codeModal = useCodeModal();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [where, setWhere] = useState<GetAdminFindUsersWhere>({});
    const [users, setUsers] = useState<UserDto[]>([]);

    const findUsers = async () => {
        try {
            setIsLoading(true);
            const res = await client.admin.user.find({
                page: page,
                where: where,
            });
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
            <PageLayout panPosition="start" marginTop="32px">
                <PageLayout.Pane>
                    <Flex.Column gap="8px">
                        <Flex.Column gap="8px">
                            <Text>조건</Text>
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
                                <Select.Option value={''}>-</Select.Option>
                                <Select.Option value={'FIRST'}>FIRST</Select.Option>
                                <Select.Option value={'GOOGLE_SET'}>GOOGLE_SET</Select.Option>
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
                                <Select.Option value={''}>-</Select.Option>
                                <Select.Option value={'true'}>연결됨</Select.Option>
                                <Select.Option value={'false'}>연결하지 않음</Select.Option>
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
                                <Select.Option value={''}>-</Select.Option>
                                <Select.Option value={'FREE'}>FREE</Select.Option>
                                <Select.Option value={'PRO'}>PRO</Select.Option>
                                <Select.Option value={'SPONSOR'}>SPONSOR</Select.Option>
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
                                <Select.Option value={''}>-</Select.Option>
                                <Select.Option value={'true'}>동기화중</Select.Option>
                                <Select.Option value={'false'}>동기화중이 아님</Select.Option>
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
                                <Select.Option value={''}>-</Select.Option>
                                <Select.Option value={'true'}>운영진</Select.Option>
                                <Select.Option value={'false'}>운영진이 아님</Select.Option>
                            </Select>
                            <TextField
                                placeholder="페이지"
                                label="페이지"
                                value={page}
                                onChange={(e) => setPage(+e.target.value)}
                                type="number"
                            />
                        </Flex.Column>

                        <Button onClick={() => findUsers()} width="100%" variant="contained" disabled={isLoading}>
                            조회
                        </Button>
                    </Flex.Column>
                </PageLayout.Pane>
                <PageLayout.Content>
                    <Table>
                        <Table.THead>
                            <Table.Row>
                                <Table.Head width="70px">아이디</Table.Head>
                                <Table.Head>유저 정보</Table.Head>
                            </Table.Row>
                        </Table.THead>
                        <Table.TBody>
                            {users.length === 0 ? (
                                <Table.Row>
                                    <Table.Data>데이터가 없습니다.</Table.Data>
                                </Table.Row>
                            ) : (
                                users.map((user) => (
                                    <Table.Row key={user.id}>
                                        <Table.Data width="70px">{user.id}</Table.Data>
                                        <Table.Data>
                                            <Flex.Row gap="4px">
                                                {user && <Avatar src={user?.imageUrl} size={28} />}
                                                {user ? (
                                                    <StatusBadge
                                                        color={
                                                            user.isConnected
                                                                ? 'green'
                                                                : user.lastSyncStatus
                                                                ? 'red'
                                                                : 'yellow'
                                                        }
                                                        text={user.name}
                                                    />
                                                ) : (
                                                    <Span color={cv.text4}>(알 수 없음)</Span>
                                                )}
                                            </Flex.Row>
                                        </Table.Data>
                                        <Table.Data $align="flex-end" width="50px">
                                            <ActionMenu
                                                actions={[
                                                    [
                                                        {
                                                            label: 'Raw',
                                                            onClick: () => codeModal('Raw', user, 800),
                                                        },
                                                        {
                                                            label: '유저 조회',
                                                            onClick: () =>
                                                                router.push(`/admin/user?userId=${user.id || 0}`),
                                                        },
                                                    ],
                                                ]}
                                                icon={<DotsThreeVertical />}
                                                variant="text"
                                            />
                                        </Table.Data>
                                    </Table.Row>
                                ))
                            )}
                        </Table.TBody>
                    </Table>
                </PageLayout.Content>
            </PageLayout>
            <Footer />
        </>
    );
};

export default Home;
