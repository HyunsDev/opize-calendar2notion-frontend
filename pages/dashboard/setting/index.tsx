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

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.locale('ko');

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

function BoxIsWork() {
    const { user, refetch } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        setIsLoading(true);
        await client.user.patch({
            userId: 'me',
            isWork: false,
        });
        refetch && (await refetch());
        setIsLoading(false);
    };

    return (
        <Box
            title="교착 상태 해결"
            footer={
                <>
                    <A href="">자세히 알아보기</A>
                    <Button
                        variant="contained"
                        color="red"
                        isLoading={isLoading}
                        disabled={isLoading}
                        onClick={onClick}
                    >
                        교착상태 해결
                    </Button>
                </>
            }
        >
            <Text>
                교착 상태에 빠진 것 같나요? 일반적으로 <b>첫 동기화가 아닌 동기화</b>는 1분 내로 완료되는 것이
                정상이에요. 그러나 현재 2시간 이상 동기화가 진행중이에요. 만약 노션이나 구글 캘린더에서 동기화가
                정상적으로 이루어지지 않고 있다고 생각되면 아래 버튼을 눌러 교착상태를 해결해주세요.
            </Text>
            <Text>
                정상적으로 동기화되고 있는 상황에서 이 버튼을 클릭하면 동기화가 오류가 발생할 수 있어요! 만약 누르기
                주저된다면 언제든 우측 하단 버튼을 통해 운영진에게 문의해주세요.
            </Text>
        </Box>
    );
}

const Home: NextPage = () => {
    const { user } = useUser();
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
                        {dayjs(user?.lastCalendarSync) < dayjs().add(-2, 'hours') && user?.isWork && <BoxIsWork />}

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
