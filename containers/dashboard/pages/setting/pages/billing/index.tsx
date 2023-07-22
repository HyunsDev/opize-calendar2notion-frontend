import { Flex, H2, H3, ItemsTable, PageLayout, Table } from 'opize-design-system';
import { Container } from '../../components/Container';
import { useUser } from '../../../../../../hooks/useUser';
import { PaymentLogDto } from '@opize/calendar2notion-object';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timeZone from 'dayjs/plugin/timezone';
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timeZone);

function RenewalBox() {
    const { user } = useUser();
    const lastTransaction = user?.paymentLogs?.[0];

    if (!user || !lastTransaction) {
        return <></>;
    }

    if (dayjs(lastTransaction?.expirationTime) < dayjs()) {
        return (
            <Flex.Column gap="8px">
                <H2>구독이 {dayjs(lastTransaction?.expirationTime).fromNow()}에 만료되었어요</H2>
            </Flex.Column>
        );
    }

    return (
        <Flex.Column gap="8px">
            <H2>{dayjs(lastTransaction?.expirationTime).fromNow()} 구독을 갱신하게 돼요</H2>
        </Flex.Column>
    );
}

function TransactionItem({ transaction }: { transaction: PaymentLogDto }) {
    return (
        <Table.Row>
            <Table.Data>
                {transaction.plan} 플랜 {transaction.months}개월
            </Table.Data>
            <Table.Data>{dayjs(transaction.paymentTime).format('YYYY.MM.DD')}</Table.Data>
            <Table.Data>{dayjs(transaction.expirationTime).format('YYYY.MM.DD')}</Table.Data>
            <Table.Data>
                {transaction.price} {transaction.priceKind}
            </Table.Data>
        </Table.Row>
    );
}

function TransactionHistoryBox() {
    const { user } = useUser();
    const transactions = user?.paymentLogs;

    if (!user) {
        return <></>;
    }

    return (
        <Flex.Column gap="8px">
            <H3>구독 기록</H3>
            <Table>
                <Table.THead>
                    <Table.Row>
                        <Table.Head>구독</Table.Head>
                        <Table.Head>구독 날짜</Table.Head>
                        <Table.Head>만료 날짜</Table.Head>
                        <Table.Head>금액</Table.Head>
                    </Table.Row>
                </Table.THead>

                <Table.TBody>
                    {transactions?.map((transaction) => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                    ))}
                </Table.TBody>
            </Table>
        </Flex.Column>
    );
}

export function BillingContainer() {
    return (
        <Container now="billing">
            <Flex.Column gap="16px">
                <RenewalBox />
                <TransactionHistoryBox />
            </Flex.Column>
        </Container>
    );
}
