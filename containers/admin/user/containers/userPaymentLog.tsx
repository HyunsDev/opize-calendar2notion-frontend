import { CodeBlock, Flex, H3, ItemsTable, useModal } from 'opize-design-system';
import { useAdminUser } from '../hooks/useAdminUser';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.locale('ko');

function PaymentLogRow({ paymentLog }: { paymentLog: any }) {
    const modal = useModal();

    return (
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
                                modal.open(<CodeBlock>{JSON.stringify(paymentLog, null, 2)}</CodeBlock>, {
                                    width: 400,
                                }),
                        },
                    ],
                ]}
            />
        </ItemsTable.Row>
    );
}

export function AdminUserPaymentLogContainer() {
    const { adminUser } = useAdminUser();
    if (!adminUser) return <></>;

    return (
        <Flex.Column gap="8px" id="user-paymentLogs">
            <Flex.Row gap="8px">
                <H3>Payment Log</H3>
            </Flex.Row>
            <ItemsTable>
                {adminUser.user.paymentLogs && adminUser.user.paymentLogs.length !== 0 ? (
                    adminUser.user.paymentLogs.map((paymentLog: any) => (
                        <PaymentLogRow key={paymentLog.id} paymentLog={paymentLog} />
                    ))
                ) : (
                    <ItemsTable.Row>paymentLogs가 없습니다.</ItemsTable.Row>
                )}
            </ItemsTable>
        </Flex.Column>
    );
}
