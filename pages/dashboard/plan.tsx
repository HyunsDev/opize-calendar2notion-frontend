import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { PageLayout, H1, Flex, Text, cv, BoxLayout, Callout } from 'opize-design-system';
import styled from 'styled-components';
import { GCalNotionCircle } from '../../components/GCalNotionCircle';
import { Footer } from '../../components/footer';
import { DashboardHeader } from '../../components/pages/dashboard/header';
import { PlanCardFree } from '../../components/Plan/PlanCard/PlanCardFree';
import { PlanCardPro } from '../../components/Plan/PlanCard/PlanCardPro';
import { PlanCardSponsor } from '../../components/Plan/PlanCard/PlanCardSponsor';
import { NotionPage } from '../../components/notionPage';

const Title = styled.div`
    margin-top: 32px;
    font-size: 36px;
    font-weight: ${cv.fontWeightSemiBold};
    color: ${cv.text1};
`;

const Cards = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 32px;
    gap: 20px;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
    }
`;

const A = styled.a``;

const Home: NextPage = () => {
    return (
        <>
            <DashboardHeader now="plan" />
            <BoxLayout minHeight="calc(100vh - 131px - 337px)" width="1000px" marginTop="8px">
                <Flex.Column>
                    <Callout icon="📢">
                        베타 버전에서는 플랜을 구독할 수 없어요. <br /> 테스트를 위한 플랜을 지급해드리니 필요하신 분은{' '}
                        <A href="https://open.kakao.com/me/hyunsdev" target={'_blank'} style={{ fontSize: '14px' }}>
                            1:1 오픈채팅방
                        </A>
                        이나{' '}
                        <A href="https://open.kakao.com/o/gIBnhE4e" target={'_blank'} style={{ fontSize: '14px' }}>
                            베타 오픈채팅방
                        </A>
                        에서 알려주세요!
                    </Callout>
                    <Title>더 빠르게, 더 다양하게 동기화 해보세요.</Title>
                    <Cards>
                        <PlanCardFree />
                        <PlanCardPro />
                        <PlanCardSponsor />
                    </Cards>
                </Flex.Column>
                <NotionPage pageId={process.env.NEXT_PUBLIC_NOTION_PAGE_PLAN || ''} isFullPage={false} />
            </BoxLayout>
            <Footer />
        </>
    );
};

export default Home;
