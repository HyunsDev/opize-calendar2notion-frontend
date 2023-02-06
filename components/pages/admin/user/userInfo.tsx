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
} from 'opize-design-system';
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getAdminUserResponse } from '../../../../lib/client/endpoints/admin';
import { toast } from 'react-toastify';
import { APIResponseError, client } from '../../../../lib/client';
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
            await client.admin.patchUser({
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

export function UserBox({ user, fetchUser }: { user: getAdminUserResponse; fetchUser: () => void }) {
    const modal = useModal();
    const codeModal = useCodeModal();

    return (
        <Flex.Column id="user-user" gap="8px">
            <Flex.Row gap="8px">
                <Label>User</Label>
                {user.user && (
                    <Token
                        variant="outlined"
                        color={user.user && !user.user.isConnected ? 'yellow' : user.user.isWork ? 'blue' : 'green'}
                    >
                        {user.user && !user.user.isConnected
                            ? '연결 해제됨'
                            : user.user.isWork
                            ? '동기화 작업 중'
                            : '연결됨'}
                    </Token>
                )}
            </Flex.Row>
            <ItemsTable>
                {user.user ? (
                    Object.entries(user?.user).map(([key, value]) => (
                        <ItemsTable.Row key={key}>
                            <ItemsTable.Row.Text
                                flex={1}
                                text={`${key}${Object.keys(editableUserAttr).includes(key) ? '' : '*'}`}
                            />
                            <ItemsTable.Row.Text flex={2} subText={`${value}`} />
                            {
                                <ItemsTable.Row.Buttons
                                    buttons={
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
                            }
                        </ItemsTable.Row>
                    ))
                ) : (
                    <ItemsTable.Row>
                        <Text size="14px">유저 정보가 없습니다</Text>
                    </ItemsTable.Row>
                )}
            </ItemsTable>
        </Flex.Column>
    );
}

export function CalendarBox({ user }: { user: any }) {
    const modal = useModal();
    return (
        <Flex.Column id="user-calendar" gap="8px">
            <Label>Calendars</Label>
            <ItemsTable>
                {user.calendars && user.calendars.length !== 0 ? (
                    user?.calendars.map((calendar: any) => (
                        <ItemsTable.Row key={calendar.id}>
                            <ItemsTable.Row.Text text={`${calendar.googleCalendarName}`} subText={calendar.id + ''} />
                            <ItemsTable.Row.Text text={calendar.googleCalendarId} subText={'googleCalendarId'} />
                            <ItemsTable.Row.Text
                                text={calendar.notionPropertyId || 'not yet'}
                                subText={'notionPropertyId'}
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
            <UserBox user={user} fetchUser={fetchUser} />
            <CalendarBox user={user} />
            <PaymentLogBox user={user} />
        </Flex.Column>
    );
}
