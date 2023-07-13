import { CodeBlock, Flex, H3, ItemsTable, useModal } from 'opize-design-system';
import { useAdminUser } from '../hooks/useAdminUser';

function CalendarRow({ calendar }: { calendar: any }) {
    const modal = useModal();

    return (
        <ItemsTable.Row>
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
    );
}

export function AdminUserCalendarContainer() {
    const { adminUser } = useAdminUser();
    if (!adminUser) return <></>;

    return (
        <Flex.Column gap="8px" id="user-calendar">
            <Flex.Row gap="8px">
                <H3>Calendar - {adminUser.user.calendars?.length || 'X'}</H3>
            </Flex.Row>
            <ItemsTable>
                {adminUser.user.calendars && adminUser.user.calendars.length !== 0 ? (
                    adminUser.user.calendars.map((calendar: any) => (
                        <CalendarRow key={calendar.id} calendar={calendar} />
                    ))
                ) : (
                    <>Calendar가 없습니다.</>
                )}
            </ItemsTable>
        </Flex.Column>
    );
}
