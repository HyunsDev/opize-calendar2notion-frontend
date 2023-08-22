import { Badge, Flex, H3, ItemsTable, Menu, useCodeModal } from 'opize-design-system';
import { useAdminUser } from '../hooks/useAdminUser';

function CalendarRow({ calendar }: { calendar: any }) {
    const codeModal = useCodeModal();

    return (
        <ItemsTable.Row>
            <ItemsTable.Row.Text
                text={`${calendar.googleCalendarName}`}
                subText={calendar.id + ` ${calendar.accessRole === 'reader' && '(읽기 전용)'}`}
            />
            <ItemsTable.Row.Component>
                <Badge variant="secondary" dot color={calendar.status === 'CONNECTED' ? 'green' : 'default'}>
                    {calendar.status}
                </Badge>
            </ItemsTable.Row.Component>
            <ItemsTable.Row.Menu>
                <Menu.Option onClick={() => codeModal.open(calendar)}>Raw</Menu.Option>
            </ItemsTable.Row.Menu>
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
                    <ItemsTable.Row>Calendar가 없습니다.</ItemsTable.Row>
                )}
            </ItemsTable>
        </Flex.Column>
    );
}
