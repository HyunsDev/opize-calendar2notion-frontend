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
} from 'opize-design-system';
import styled from 'styled-components';
import { GCalNotionCircle } from '../../../components/GCalNotionCircle';
import { DashboardFooter } from '../../../components/pages/dashboard/footer';
import { DashboardHeader } from '../../../components/pages/dashboard/header';
import { DashboardSettingSidebar } from '../../../components/pages/dashboard/setting/sidebar';

import NotionImage from '../../../assets/notion.png';
import { GCalIcon } from '../../../components/GCalIcon';
import { timeZones } from '../../../components/pages/dashboard/timezone';

function BoxSync() {
    return (
        <Box
            title="동기화"
            footer={
                <>
                    <div />
                    <Button variant="outlined">적용</Button>
                </>
            }
        >
            <Text>
                일시적으로 동기화를 중단할 수 있어요.
                <br />
                주의! 3주 이상 동기화가 중단되었다가 실행하는 경우 과거에 변경된 내용이 반영되지 않을 수 있어요
            </Text>
            <Switch text="동기화 중" />
        </Box>
    );
}

function BoxAccount() {
    return (
        <Box title="아래 계정과 데이터베이스에 연결되어 있어요">
            <ItemsTable>
                <ItemsTable.Row>
                    <ItemsTable.Row.Avatar icon={GCalIcon} name="Google Calendar" label="" />
                    <ItemsTable.Row.Text text="phw3071@gmail.com" subText="https://calendar.google.com" />
                    <ItemsTable.Row.Buttons buttons={[]} />
                </ItemsTable.Row>
                <ItemsTable.Row>
                    <ItemsTable.Row.Avatar
                        icon={<Image src={NotionImage} alt="" width={32} height={32} />}
                        name="Notion"
                        label=""
                    />
                    <ItemsTable.Row.Text
                        text="phw3071@gmail.com"
                        subText="https://notion.so/7ec4de93624c4a17b8aa64cdad25889c"
                    />
                    <ItemsTable.Row.Buttons buttons={[]} />
                </ItemsTable.Row>
            </ItemsTable>
        </Box>
    );
}

function BoxTimeZone() {
    return (
        <Box
            title="시간대를 선택해주세요"
            footer={
                <>
                    <div />
                    <Button variant="outlined">적용</Button>
                </>
            }
        >
            <Select>
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
    return (
        <Box
            title="노션 데이터베이스 속성"
            footer={
                <>
                    <A>자세히 알아보기</A>
                    <Button variant="outlined">적용</Button>
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
    return (
        <>
            <DashboardHeader now="setting" />
            <PageHead title="설정"></PageHead>
            <PageLayout panPosition="start" marginTop="16px">
                <PageLayout.Pane>
                    <DashboardSettingSidebar now="sync" />
                </PageLayout.Pane>
                <PageLayout.Content>
                    <Flex.Column gap="16px">
                        <BoxAccount />
                        <BoxSync />
                        <BoxTimeZone />
                        <BoxProps />
                    </Flex.Column>
                </PageLayout.Content>
            </PageLayout>
            <DashboardFooter />
        </>
    );
};

export default Home;
