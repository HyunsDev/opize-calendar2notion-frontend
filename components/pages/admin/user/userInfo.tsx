import React, { useState } from 'react';
import {
    Flex,
    Button,
    CodeBlock,
    ItemsTable,
    useModal,
    Box,
    Text,
    cv,
    TextField,
    useCodeModal,
    Switch,
    Select,
    Token,
    Table,
    ActionMenu,
} from 'opize-design-system';
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { toast } from 'react-toastify';
import { getAdminUserResponse } from '../../../../lib/client/endpoint';
import { client } from '../../../../lib/client';
import { APIResponseError } from '../../../../lib/old-client';
import { CalendarObject, UserObject } from '../../../../lib/client/object';
import { DotsThreeVertical } from 'phosphor-react';
dayjs.extend(relativeTime);
dayjs.locale('ko');

const Label = styled.div`
    font-weight: ${cv.fontWeightSemiBold};
    font-size: 16px;
    margin-left: 4px;
    color: ${cv.text3};
`;

const editableUserAttr = {
    userId: 'number',
    name: 'string',
    email: 'string',
    imageUrl: 'string',
    opizeId: 'number',
    opizeAccessToken: 'string',
    googleId: 'string',
    googleAccessToken: 'string',
    googleEmail: 'string',
    googleRefreshToken: 'string',
    notionAccessToken: 'string',
    notionBotId: 'string',
    notionDatabaseId: 'string',
    lastCalendarSync: 'string',
    lastSyncStatus: 'string',
    status: ['FIRST', 'GOOGLE_SET', 'NOTION_API_SET', 'NOTION_SET', 'FINISHED'],
    isConnected: 'boolean',
    userPlan: ['FREE', 'PRO'],
    userTimeZone: 'string',
    notionProps: 'string',
    isWork: 'boolean',
};

function ModalUserUpdate({
    userKey,
    user,
    initValue,
    fetchUser,
    close,
}: {
    user: getAdminUserResponse;
    userKey: keyof typeof editableUserAttr;
    initValue: any;
    fetchUser: () => void;
    close: () => void;
}) {
    const [value, setValue] = useState(initValue);

    const apply = async () => {
        try {
            const _value = editableUserAttr[userKey] === 'number' ? +value : value;
            await client.admin.user.patch({
                userId: user.user.id,
                [userKey]: _value,
            });
            fetchUser();
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

    let field: React.ReactNode = <></>;
    if (editableUserAttr[userKey] === 'string') {
        field = <TextField label={userKey} value={value} onChange={(e) => setValue(e.target.value)} />;
    } else if (editableUserAttr[userKey] === 'number') {
        field = <TextField label={userKey} value={value} onChange={(e) => setValue(e.target.value)} type="number" />;
    } else if (editableUserAttr[userKey] === 'boolean') {
        field = <Switch checked={value} onChange={(e) => setValue(!value)} />;
    } else if (Array.isArray(editableUserAttr[userKey])) {
        field = (
            <Select value={value} onChange={(e) => setValue(e.target.value)}>
                {(editableUserAttr[userKey] as string[]).map((e, i) => (
                    <Select.Option key={i} value={e}>
                        {e}
                    </Select.Option>
                ))}
            </Select>
        );
    }

    return (
        <Flex.Column gap="8px">
            {field}
            <Button onClick={() => apply()} variant="contained">
                적용
            </Button>
        </Flex.Column>
    );
}

export function UserTable({ user, fetchUser }: { user: getAdminUserResponse; fetchUser: () => void }) {
    const modal = useModal();
    const codeModal = useCodeModal();

    let userStatusToken: React.ReactNode = <></>;
    if (user.user) {
        if (user.user.isConnected) {
            if (user.user.isWork) {
                userStatusToken = (
                    <Token variant="outlined" color="blue">
                        동기화 작업 중
                    </Token>
                );
            } else {
                userStatusToken = (
                    <Token variant="outlined" color="green">
                        연결됨
                    </Token>
                );
            }
        } else {
            if (!user.user.lastSyncStatus) {
                userStatusToken = (
                    <Token variant="outlined" color="yellow">
                        연결 해제됨
                    </Token>
                );
            } else {
                userStatusToken = (
                    <Token variant="outlined" color="red">
                        오류로 인한 정지
                    </Token>
                );
            }
        }
    }

    return (
        <Flex.Column id="user-user" gap="8px">
            <Flex.Row gap="8px">
                <Label>User</Label>
                {userStatusToken}
            </Flex.Row>
            <Table>
                <Table.THead>
                    <Table.Row>
                        <Table.Head width="200px">Key</Table.Head>
                        <Table.Head>Value</Table.Head>
                        <Table.Head $align="flex-end" width="50px"></Table.Head>
                    </Table.Row>
                </Table.THead>
                <Table.TBody>
                    {user.user ? (
                        Object.entries(user?.user).map(([key, value]) => (
                            <Table.Row key={key}>
                                <Table.Data width="200px">
                                    {key}
                                    {Object.keys(editableUserAttr).includes(key) ? '' : '*'}
                                </Table.Data>
                                <Table.Data>
                                    <Text
                                        style={{
                                            wordBreak: 'break-all',
                                        }}
                                    >
                                        {JSON.stringify(value)}
                                    </Text>
                                </Table.Data>
                                <Table.Data $align="flex-end" width="50px">
                                    <ActionMenu
                                        icon={<DotsThreeVertical />}
                                        variant="text"
                                        actions={
                                            Object.keys(editableUserAttr).includes(key)
                                                ? [
                                                      [
                                                          {
                                                              label: '값',
                                                              onClick: () => codeModal(key, value, '500px'),
                                                          },
                                                          {
                                                              label: '수정',
                                                              onClick: () =>
                                                                  modal.open(
                                                                      <ModalUserUpdate
                                                                          user={user}
                                                                          userKey={key as keyof typeof editableUserAttr}
                                                                          initValue={value}
                                                                          fetchUser={fetchUser}
                                                                          close={modal.close}
                                                                      />,
                                                                      {
                                                                          width: '500px',
                                                                      }
                                                                  ),
                                                          },
                                                      ],
                                                  ]
                                                : [
                                                      [
                                                          {
                                                              label: 'Value',
                                                              onClick: () => codeModal(key, value, '500px'),
                                                          },
                                                      ],
                                                  ]
                                        }
                                    />
                                </Table.Data>
                            </Table.Row>
                        ))
                    ) : (
                        <Table.Row>
                            <Table.Data>
                                <Text size="14px">유저 정보가 없습니다</Text>
                            </Table.Data>
                        </Table.Row>
                    )}
                </Table.TBody>
            </Table>
        </Flex.Column>
    );
}

export function CalendarBox({
    user,
}: {
    user: {
        user: UserObject;
        calendars: CalendarObject[];
    };
}) {
    const modal = useModal();
    return (
        <Flex.Column id="user-calendar" gap="8px">
            <Label>Calendars - {user?.calendars?.length || 0}</Label>
            <ItemsTable>
                {user.calendars && user.calendars.length !== 0 ? (
                    user?.calendars.map((calendar) => (
                        <ItemsTable.Row key={calendar.id}>
                            <ItemsTable.Row.Text
                                text={`${calendar.googleCalendarName}`}
                                subText={calendar.id + ` ${calendar.accessRole === 'reader' && '(읽기 전용)'}`}
                            />
                            <ItemsTable.Row.Status
                                status={calendar.status === 'CONNECTED' ? 'good' : 'stateless'}
                                text={calendar.status}
                            />
                            <ItemsTable.Row.Buttons
                                buttons={[
                                    [
                                        {
                                            label: 'Raw',
                                            onClick: () =>
                                                modal.open(<CodeBlock>{JSON.stringify(calendar, null, 2)}</CodeBlock>, {
                                                    width: 400,
                                                }),
                                        },
                                    ],
                                ]}
                            />
                        </ItemsTable.Row>
                    ))
                ) : (
                    <ItemsTable.Row>
                        <Text size="14px">calendar가 없습니다</Text>
                    </ItemsTable.Row>
                )}
            </ItemsTable>
        </Flex.Column>
    );
}

export function PaymentLogBox({ user }: { user: any }) {
    const modal = useModal();
    return (
        <Flex.Column id="user-paymentLogs" gap="8px">
            <Label>PaymentLogs</Label>
            <ItemsTable>
                {user.paymentLogs && user.paymentLogs.length !== 0 ? (
                    user?.paymentLogs.map((paymentLog: any) => (
                        <ItemsTable.Row key={paymentLog.id}>
                            <ItemsTable.Row.Text text={paymentLog.plan} subText={paymentLog.id + ''} />
                            <ItemsTable.Row.Text
                                text={`${paymentLog.price} ${paymentLog.priceKind}`}
                                subText={`${paymentLog.paymentKind} | ${paymentLog.months}개월`}
                            />
                            <ItemsTable.Row.Text
                                text={`결제: ${dayjs(paymentLog.paymentTime).fromNow()}`}
                                subText={`다음 결제일: ${dayjs(paymentLog.expirationTime).fromNow()}`}
                            />
                            <ItemsTable.Row.Text text={paymentLog.memo} subText={'memo'} />

                            <ItemsTable.Row.Buttons
                                buttons={[
                                    [
                                        {
                                            label: 'Raw',
                                            onClick: () =>
                                                modal.open(
                                                    <CodeBlock>{JSON.stringify(paymentLog, null, 2)}</CodeBlock>,
                                                    {
                                                        width: 400,
                                                    }
                                                ),
                                        },
                                    ],
                                ]}
                            />
                        </ItemsTable.Row>
                    ))
                ) : (
                    <ItemsTable.Row>
                        <Text size="14px">PaymentLog가 없습니다</Text>
                    </ItemsTable.Row>
                )}
            </ItemsTable>
        </Flex.Column>
    );
}

export function AdminUserInfo({ user, fetchUser }: { user: any; fetchUser: () => void }) {
    return (
        <Flex.Column gap="60px">
            <UserTable user={user} fetchUser={fetchUser} />
            <CalendarBox user={user} />
            <PaymentLogBox user={user} />
        </Flex.Column>
    );
}
