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
    H3,
} from 'opize-design-system';
import styled from 'styled-components';
import { GCalNotionCircle } from '../../components/GCalNotionCircle';
import { AdminFooter } from '../../components/pages/admin/footer';
import { AdminHeader } from '../../components/pages/admin/header';

import Logo from '../../assets/logo.png';

function BoxBots() {
    return (
        <ItemsTable>
            <ItemsTable.Row>
                <ItemsTable.Row.Avatar
                    icon={<Image src={Logo} width={28} height={28} alt="" />}
                    name="동기화봇1"
                    label="https://pi2-api-calendar2notion.opize.me"
                />
                <ItemsTable.Row.Status status="good" text="정상" />
                <ItemsTable.Row.Buttons
                    buttons={[
                        [
                            {
                                label: '상세 정보',
                                onClick: () => {},
                            },
                            {
                                label: '정지',
                                onClick: () => {},
                                color: 'red',
                            },
                            {
                                label: '종료',
                                onClick: () => {},
                                color: 'red',
                            },
                        ],
                    ]}
                />
            </ItemsTable.Row>
        </ItemsTable>
    );
}

function BoxRealTask() {
    return (
        <Flex.Column gap="20px">
            <Flex.Column>
                <H3>작업 중</H3>
                <ItemsTable>
                    <ItemsTable.Row>
                        <ItemsTable.Row.Text flex={1} text="@324" subText="phw3071@gmail.com" />
                        <ItemsTable.Row.Text flex={2} text="working" subText="동기화봇1 - 2022.11.04 16:36:20" />
                        <ItemsTable.Row.Status flex={1} status="good" text="작업 중" />
                    </ItemsTable.Row>
                </ItemsTable>
            </Flex.Column>

            <Flex.Column>
                <H3>작업 완료</H3>
                <ItemsTable>
                    <ItemsTable.Row>
                        <ItemsTable.Row.Text flex={1} text="@324" subText="phw3071@gmail.com" />
                        <ItemsTable.Row.Text
                            flex={2}
                            text="[sync 6.774s] 0 0 0 0 0"
                            subText="동기화봇1 - 2022.11.04 16:36:20"
                        />
                        <ItemsTable.Row.Status flex={1} status="done" text="작업 완료" />
                    </ItemsTable.Row>
                </ItemsTable>
            </Flex.Column>
        </Flex.Column>
    );
}

const Home: NextPage = () => {
    return (
        <>
            <AdminHeader now="syncbot" />
            <PageHead title="동기화봇"></PageHead>
            <PageLayout marginTop="32px">
                <Flex.Column gap="20px">
                    <BoxBots />
                    <BoxRealTask />
                </Flex.Column>
            </PageLayout>
            <AdminFooter />
        </>
    );
};

export default Home;
