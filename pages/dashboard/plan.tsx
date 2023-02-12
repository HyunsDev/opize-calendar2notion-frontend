import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { PageLayout, H1, Flex, Text, cv, BoxLayout } from 'opize-design-system';
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

const Home: NextPage = () => {
    return (
        <>
            <DashboardHeader now="plan" />
            <BoxLayout minHeight="calc(100vh - 131px - 337px)" width="1000px">
                <Flex.Column>
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
