import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { PageLayout, H1, Flex, Text, ActionList, PageHead, ItemsTable, Button, cv, Box } from 'opize-design-system';
import styled from 'styled-components';
import { GCalIcon } from '../../../components/GCalIcon';
import { GCalNotionCircle } from '../../../components/GCalNotionCircle';
import { DashboardFooter } from '../../../components/pages/dashboard/footer';
import { DashboardHeader } from '../../../components/pages/dashboard/header';
import { DashboardSettingSidebar } from '../../../components/pages/dashboard/setting/sidebar';

const Right = styled.div`
    display: flex;
    justify-content: end;
    width: 100%;
    align-items: center;
    gap: 8px;
`;

function BoxCalendars() {
    return (
        <ItemsTable>
            <ItemsTable.Row>
                <ItemsTable.Row.Avatar icon={GCalIcon} name="가족" label="" />

                <ItemsTable.Row.Component>
                    <Right>
                        <Text color={cv.text3}>32일 전에 연결됨</Text>
                        <Button>연결하기</Button>
                    </Right>
                </ItemsTable.Row.Component>
            </ItemsTable.Row>

            <ItemsTable.Row>
                <ItemsTable.Row.Avatar icon={GCalIcon} name="가족" label="(읽기 전용)" />
                <ItemsTable.Row.Component>
                    <Right>
                        <Text color={cv.text3}>32일 전에 연결됨</Text>
                        <Button>연결하기</Button>
                    </Right>
                </ItemsTable.Row.Component>
            </ItemsTable.Row>
        </ItemsTable>
    );
}

const Home: NextPage = () => {
    return (
        <>
            <DashboardHeader now="setting" />
            <PageHead title="설정"></PageHead>
            <PageLayout panPosition="start" marginTop="16px">
                <PageLayout.Pane>
                    <DashboardSettingSidebar now="calendar" />
                </PageLayout.Pane>
                <PageLayout.Content>
                    <Flex.Column gap="16px">
                        <BoxCalendars />
                    </Flex.Column>
                </PageLayout.Content>
            </PageLayout>
            <DashboardFooter />
        </>
    );
};

export default Home;
