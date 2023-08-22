import { Flex, PageLayout, A, Spacer, PaneList } from 'opize-design-system';
import { AdminSearchUser } from './containers/userSearch';
import { AdminUserInfoContainer } from './containers/userInfo';
import { AdminUserCalendarContainer } from './containers/userCalendar';
import { AdminUserPaymentLogContainer } from './containers/userPaymentLog';
import { AdminUserPlanContainer } from './containers/userPlan';
import { AdminUserDebugContainer } from './containers/userDebug';

function AdminUserPane() {
    return (
        <PaneList>
            <PaneList.Item href="#user-search">조회</PaneList.Item>
            <PaneList.Item href="#user-user">유저 정보</PaneList.Item>
            <PaneList.Item href="#user-calendar">유저 캘린더</PaneList.Item>
            <PaneList.Item href="#user-paymentLogs">유저 결제 기록</PaneList.Item>
            <PaneList.Item href="#user-planUpgrade">플랜 업그레이드</PaneList.Item>
        </PaneList>
    );
}

export function AdminUserContainer() {
    return (
        <>
            <Spacer height="32px" />
            <PageLayout>
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
                        <AdminUserDebugContainer />
                    </Flex.Column>
                </PageLayout.Content>
            </PageLayout>
        </>
    );
}
