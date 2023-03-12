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
    Switch,
    Button,
    ItemsTable,
    Select,
    Link as A,
    useModal,
} from 'opize-design-system';
import styled from 'styled-components';
import { GCalNotionCircle } from '../../../components/GCalNotionCircle';
import { Footer } from '../../../components/footer';
import { DashboardHeader } from '../../../components/pages/dashboard/header';
import { DashboardSettingSidebar } from '../../../components/pages/dashboard/setting/sidebar';

import NotionImage from '../../../assets/notion.png';
import { GCalIcon } from '../../../components/GCalIcon';
import { timeZones } from '../../../components/pages/dashboard/timezone';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useToast } from 'react-toastify';
import { useUser } from '../../../hooks/useUser';
import { client } from '../../../lib/client';

function BoxSync() {
    const { user, refetch } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    const onChange = async () => {
        setIsLoading(true);
        await client.user.patch({
            userId: 'me',
            isConnected: !user?.isConnected,
        });
        refetch && (await refetch());
        setIsLoading(false);
    };

    return (
        <Box title="동기화">
            <Text>
                일시적으로 동기화를 중단할 수 있어요.
                <br />
                주의! 3주 이상 동기화가 중단되었다가 실행하는 경우 과거에 변경된 내용이 반영되지 않을 수 있어요
            </Text>
            <Switch
                text={isLoading ? '동기화 상태 변경 중' : user?.isConnected ? '동기화 중' : '동기화 해제됨'}
                checked={user?.isConnected}
                onChange={onChange}
                disabled={isLoading}
            />
        </Box>
    );
}

function BoxAccount() {
    const { user } = useUser();

    return (
        <Box title="아래 계정과 데이터베이스에 연결되어 있어요">
            <ItemsTable>
                <ItemsTable.Row>
                    <ItemsTable.Row.Avatar icon={GCalIcon} name="Google Calendar" label="" />
                    <ItemsTable.Row.Text
                        text={user?.googleEmail}
                        subText={
                            <A to="https://calendar.google.com" target={'_blank'}>
                                https://calendar.google.com
                            </A>
                        }
                    />
                </ItemsTable.Row>
                <ItemsTable.Row>
                    <ItemsTable.Row.Avatar
                        icon={<Image src={NotionImage} alt="" width={32} height={32} />}
                        name="Notion"
                        label=""
                    />
                    <ItemsTable.Row.Text
                        subText={
                            <A to={`https://notion.so/${user?.notionDatabaseId.replaceAll('-', '')}`} target={'_blank'}>
                                https://notion.so/{user?.notionDatabaseId.replaceAll('-', '')}
                            </A>
                        }
                    />
                </ItemsTable.Row>
            </ItemsTable>
        </Box>
    );
}

function BoxTimeZone() {
    const { user } = useUser();

    return (
        <Box
            title="시간대를 선택해주세요"
            footer={
                <>
                    <div />
                    <Button variant="contained">적용</Button>
                </>
            }
        >
            <Select defaultValue={user?.userTimeZone}>
                {timeZones.map((e) => (
                    <Select.Option value={e.value} key={e.value}>
                        {e.label}
                    </Select.Option>
                ))}
            </Select>
        </Box>
    );
}

const Width100 = styled.div`
    width: max(300px, 50%);
`;
function BoxProps() {
    const { user } = useUser();
    const props = user?.notionProps;

    return (
        <Box
            title="노션 데이터베이스 속성"
            footer={
                <>
                    <A>자세히 알아보기</A>
                    <Button variant="contained">적용</Button>
                </>
            }
        >
            <Text>
                노션 속성을 연결할 수 있어요. 잘못 바꿀경우 문제가 발생할 수 있으니 꼭 <A>가이드</A>를 확인해주세요!
                <br />
                아이디로 연결되므로 노션에서 속성 이름을 변경해도 괜찮아요.
            </Text>
            <Flex.Column gap="8px">
                <Flex.Between>
                    <Text>캘린더</Text>
                    <Width100>
                        <Select>
                            <Select.Option value={'title'}>title (32d1)</Select.Option>
                        </Select>
                    </Width100>
                </Flex.Between>

                <Flex.Between>
                    <Text>날짜</Text>
                    <Width100>
                        <Select>
                            <Select.Option value={'title'}>title (32d1)</Select.Option>
                        </Select>
                    </Width100>
                </Flex.Between>

                <Flex.Between>
                    <Text>삭제 버튼</Text>
                    <Width100>
                        <Select>
                            <Select.Option value={'title'}>title (32d1)</Select.Option>
                        </Select>
                    </Width100>
                </Flex.Between>

                <Flex.Between>
                    <Text>상세</Text>
                    <Width100>
                        <Select>
                            <Select.Option value={'title'}>title (32d1)</Select.Option>
                        </Select>
                    </Width100>
                </Flex.Between>

                <Flex.Between>
                    <Text>장소</Text>
                    <Width100>
                        <Select>
                            <Select.Option value={'title'}>title (32d1)</Select.Option>
                        </Select>
                    </Width100>
                </Flex.Between>
            </Flex.Column>
        </Box>
    );
}

const Home: NextPage = () => {
    const [isShowAdvancedSettings, setShowAdvancedSettings] = useState(false);

    return (
        <>
            <DashboardHeader now="setting" />
            <PageHead title="설정"></PageHead>
            <PageLayout panPosition="start" marginTop="16px" minHeight="calc(100vh - 131px - 128px - 337px)">
                <PageLayout.Pane>
                    <DashboardSettingSidebar now="sync" />
                </PageLayout.Pane>
                <PageLayout.Content>
                    <Flex.Column gap="16px">
                        <BoxAccount />
                        <BoxSync />

                        {/* <BoxTimeZone /> */}
                        {/* <Switch
                            text="고급 설정 표시"
                            checked={isShowAdvancedSettings}
                            onChange={() => setShowAdvancedSettings((pre) => !pre)}
                        />
                        {isShowAdvancedSettings && <BoxProps />} */}
                    </Flex.Column>
                </PageLayout.Content>
            </PageLayout>
            <Footer />
        </>
    );
};

export default Home;
