import { ActionList, Flex, PageLayout } from 'opize-design-system';
import { AdminSearchUser } from './containers/userSearch';
import { AdminUserInfoContainer } from './containers/userInfo';
import { AdminUserCalendarContainer } from './containers/userCalendar';
import { AdminUserPaymentLogContainer } from './containers/userPaymentLog';
import { AdminUserPlanContainer } from './containers/userPlan';

function AdminUserPane() {
    return (
        <ActionList isSticky>
            <ActionList.Item href="#user-search">조회</ActionList.Item>
            <ActionList.Item href="#user-user">유저 정보</ActionList.Item>
            <ActionList.Item href="#user-calendar">유저 캘린더</ActionList.Item>
            <ActionList.Item href="#user-paymentLogs">유저 결제 기록</ActionList.Item>
            <ActionList.Item href="#user-planUpgrade">플랜 업그레이드</ActionList.Item>
        </ActionList>
    );
}

export function AdminUserContainer() {
    return (
        <PageLayout panPosition="start" marginTop="32px">
            <PageLayout.Pane>
                <AdminUserPane />
            </PageLayout.Pane>
            <PageLayout.Content>
                <Flex.Column gap="20px">
                    <AdminSearchUser />
                    <AdminUserInfoContainer />
                    <AdminUserCalendarContainer />
                    <AdminUserPaymentLogContainer />
                    <AdminUserPlanContainer />
                </Flex.Column>
            </PageLayout.Content>
        </PageLayout>
    );
}
