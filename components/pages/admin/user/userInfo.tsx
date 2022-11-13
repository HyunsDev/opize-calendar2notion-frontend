import React from 'react';
import { Flex, Button, CodeBlock, ItemsTable, useModal, Box, Text, cv } from 'opize-design-system';
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.locale('ko');

const Label = styled.div`
    font-weight: ${cv.fontWeightSemiBold};
    font-size: 16px;
    margin-left: 4px;
    color: ${cv.text3};
`;

export function UserBox({ user }: { user: any }) {
    return (
        <Flex.Column id="user-user">
            <Label>User</Label>
            <ItemsTable>
                {user.user &&
                    Object.entries(user?.user).map(([key, value]) => (
                        <ItemsTable.Row key={key}>
                            <ItemsTable.Row.Text flex={1} text={key} />
                            <ItemsTable.Row.Text flex={2} subText={`${value}`} />
                        </ItemsTable.Row>
                    ))}
            </ItemsTable>
        </Flex.Column>
    );
}

export function CalendarBox({ user }: { user: any }) {
    const modal = useModal();
    return (
        <Flex.Column id="user-calendar">
            <Label>Calendars</Label>
            <ItemsTable>
                {user.calendars &&
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
                    ))}
            </ItemsTable>
        </Flex.Column>
    );
}

export function PaymentLogBox({ user }: { user: any }) {
    const modal = useModal();
    return (
        <Flex.Column id="user-paymentLogs">
            <Label>PaymentLogs</Label>
            <ItemsTable>
                {user.paymentLogs &&
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
                    ))}
            </ItemsTable>
        </Flex.Column>
    );
}

export function AdminUserInfo({ user }: { user: any }) {
    return (
        <Flex.Column gap="60px">
            <UserBox user={user} />
            <CalendarBox user={user} />
            <PaymentLogBox user={user} />
        </Flex.Column>
    );
}
