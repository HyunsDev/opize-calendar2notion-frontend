import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {
    PageLayout,
    H1,
    Flex,
    Text,
    cv,
    Button,
    Link as A,
    PageHead,
    ActionList,
    TextField,
    CodeBlock,
    Box,
    Select,
    ItemsTable,
    useCodeModal,
    useModal,
} from 'opize-design-system';
import styled from 'styled-components';
import { GCalNotionCircle } from '../../components/GCalNotionCircle';
import { AdminFooter } from '../../components/pages/admin/footer';
import { AdminHeader } from '../../components/pages/admin/header';

const CodeBlockDiv = styled.div`
    max-width: 892px;
    overflow-x: auto;
`;

function BoxPlanUpgrade() {
    return (
        <Box
            title="플랜 업그레이드"
            footer={
                <>
                    <A>자세히 알아보기</A>
                    <Button variant="outlined">적용</Button>
                </>
            }
        >
            <Flex.Column gap="4px" id="플랜 업그레이드">
                <TextField label="description"></TextField>
                <Select label="plan">
                    <Select.Option value="free">free</Select.Option>
                    <Select.Option value="pro">pro</Select.Option>
                </Select>
                <TextField label="term"></TextField>
                <TextField label="price"></TextField>
                <TextField label="priceKind"></TextField>
                <Select label="paymentKind">
                    <Select.Option value="kakaopay">카카오페이</Select.Option>
                    <Select.Option value="bankTransfer">계좌이체</Select.Option>
                    <Select.Option value="other">기타</Select.Option>
                </Select>
            </Flex.Column>
        </Box>
    );
}

const DummyData = {
    id: 259,
    name: '박현우 (Hyuns)',
    email: 'phw3071@gmail.com',
    imageUrl: 'https://lh3.googleusercontent.com/a/ALm5wu3kiOClrKyNKLFFUTmdkuRoRSTcRB88LV6Sli6rHg=s96-c',
    googleId: '107547078246347803754',
    googleAccessToken:
        'ya29.a0Aa4xrXNyQyVCR-MFxDEskuJFYUnOPhbXhatjPhlXjvKT1Z755eeLJRB_HiB5G3x9ruwoZPtH4tsQCKPanQ0dcEm05HzZbej-W2dDD7J49y57mAVP9y-PvGNpCNIsC5-SnJhK37aY4EYCZrDZPFvaq0imUk28aCgYKATASARISFQEjDvL969dqoTmnV6qQEuUxMr8uQw0163',
    googleRefreshToken:
        '1//0e2_9ztZMSEtxCgYIARAAGA4SNwF-L9IrEUOtqO6PIjr7sr5mR2UP4-iT5GeKTSfNBAMUtYm-o8xAX31KuTOVhwrSpo0T4UXZ6nA',
    notionAccessToken: 'secret_viRA1NuNwLSJTlWZQxcIm41QsNscyeUv3rVXAxwcZBW',
    notionBotId: '2e621e16-8218-45fd-a900-8f5a47061181',
    notionDatabaseId: '7ec4de93-624c-4a17-b8aa-64cdad25889c',
    lastCalendarSync: '2022-11-04T06:49:41.000Z',
    lastSyncStatus: null,
    status: 'finish',
    isConnected: true,
    notionManagePageId: 'e38ee692-493a-4190-bc12-0b1448597f07',
    userPlan: 'pro',
    userDonate: 0,
    userTimeZone: 'Asia/Seoul',
    isOccupied: false,
    isWork: false,
    isAdmin: true,
    createdAt: '2021-09-04T14:51:04.000Z',
    updatedAt: '2022-11-04T06:49:46.000Z',
};

const Home: NextPage = () => {
    const modal = useModal();

    return (
        <>
            <AdminHeader now="user" />
            <PageHead title="유저"></PageHead>
            <PageLayout panPosition="start" marginTop="32px">
                <PageLayout.Pane>
                    <ActionList isSticky>
                        <ActionList.Item href="#조회">조회</ActionList.Item>
                        <ActionList.Item href="#플랜 업그레이드">플랜 업그레이드</ActionList.Item>
                    </ActionList>
                </PageLayout.Pane>
                <PageLayout.Content>
                    <Flex.Column gap="20px">
                        <Flex.Between gap="8px" id="조회">
                            <TextField placeholder="ID or Email" />
                            <Button variant="contained" width="100px">
                                조회
                            </Button>
                        </Flex.Between>
                        <ItemsTable>
                            {Object.entries(DummyData).map(([key, value]) => (
                                <ItemsTable.Row key={key}>
                                    <ItemsTable.Row.Text flex={1} text={key} />
                                    <ItemsTable.Row.Text flex={2} subText={`${value}`} />
                                </ItemsTable.Row>
                            ))}
                            <ItemsTable.Row>
                                <ItemsTable.Row.Component>
                                    <Button
                                        onClick={() =>
                                            modal.open(<CodeBlock>{JSON.stringify(DummyData, null, 4)}</CodeBlock>, {
                                                title: 'user',
                                                width: 900,
                                            })
                                        }
                                    >
                                        codeModal
                                    </Button>
                                </ItemsTable.Row.Component>
                            </ItemsTable.Row>
                        </ItemsTable>
                        <BoxPlanUpgrade />
                    </Flex.Column>
                </PageLayout.Content>
            </PageLayout>
            <AdminFooter />
        </>
    );
};

export default Home;
