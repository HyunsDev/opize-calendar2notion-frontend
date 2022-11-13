import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {
    PageLayout,
    H1,
    Flex,
    Text,
    ActionList,
    PageHead,
    Box,
    Button,
    Link as A,
    Switch,
    Span,
} from 'opize-design-system';
import styled from 'styled-components';
import { GCalNotionCircle } from '../../../components/GCalNotionCircle';
import { DashboardFooter } from '../../../components/pages/dashboard/footer';
import { DashboardHeader } from '../../../components/pages/dashboard/header';
import { DashboardSettingSidebar } from '../../../components/pages/dashboard/setting/sidebar';

function BoxSyncNoticeEmail() {
    return (
        <Box
            title="동기화 알림"
            footer={
                <>
                    <div />
                    <Button variant="contained">적용</Button>
                </>
            }
        >
            <Text>
                동기화 중 문제가 생기면 <Span weight="semibold">phw3071@gmail.com</Span>로 문의 메일을 보내드릴게요
            </Text>
            <Switch text="메일 받기" />
        </Box>
    );
}

function BoxAccount() {
    return (
        <Box
            title="계정 삭제"
            footer={
                <>
                    <A>자세히 알아보기</A>
                    <Button variant="contained" color="red">
                        계정 삭제
                    </Button>
                </>
            }
        >
            <Text>
                계정을 삭제할 경우 더 이상 동기화가 진행되지 않아요.
                <br />
                삭제한 계정은 다시 되돌릴 수 없고, 이전 노션 데이터베이스에 다시 연결할 수 없어요. 신중하게
                생각해주세요!
            </Text>
        </Box>
    );
}

function BoxNotion() {
    return (
        <Box
            title="노션 데이터베이스 초기화"
            footer={
                <>
                    <A>자세히 알아보기</A>
                    <Button variant="contained" color="red">
                        초기화
                    </Button>
                </>
            }
        >
            <Text>
                Calendar2notion을 사용하면서 문제가 발생한 경우 노션 데이터베이스를 초기화해서 해결할 수 있어요.
                <br />
                데이터베이스를 초기화하는 경우, 이전 데이터베이스와의 동기화가 해제되며 새로운 데이터베이터에 연결하게
                되요.
            </Text>
        </Box>
    );
}

const Home: NextPage = () => {
    return (
        <>
            <DashboardHeader now="setting" />
            <PageHead title="설정"></PageHead>
            <PageLayout panPosition="start" marginTop="16px" minHeight="calc(100vh - 131px - 128px - 337px)">
                <PageLayout.Pane>
                    <DashboardSettingSidebar now="account" />
                </PageLayout.Pane>
                <PageLayout.Content>
                    <Flex.Column gap="16px">
                        <BoxSyncNoticeEmail />
                        <BoxNotion />
                        <BoxAccount />
                    </Flex.Column>
                </PageLayout.Content>
            </PageLayout>
            <DashboardFooter />
        </>
    );
};

export default Home;
