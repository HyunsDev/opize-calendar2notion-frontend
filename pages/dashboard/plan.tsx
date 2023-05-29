import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { PageLayout, H1, Flex, Text, cv, BoxLayout, Callout } from 'opize-design-system';
import styled from 'styled-components';
import { GCalNotionCircle } from '../../components/GCalNotionCircle';
import { Footer } from '../../components/footer';
import { DashboardHeader } from '../../components/pages/dashboard/header';
import { NotionPage } from '../../components/notionPage';
import { PlanCardFree, PlanCardPro, PlanCardSponsor } from '../../components/Plan/PlanCard/planCard';
import { useUser } from '../../hooks/useUser';

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
    const { user } = useUser();

    return (
        <>
            <DashboardHeader now="plan" />
            <BoxLayout minHeight="calc(100vh - 131px - 337px)" width="1000px" marginTop="8px">
                <Flex.Column>
                    <Title>더 빠르게, 더 다양하게 동기화 해보세요.</Title>
                    <Cards>
                        <PlanCardFree {...user} />
                        <PlanCardPro {...user} />
                        <PlanCardSponsor {...user} />
                    </Cards>
                </Flex.Column>
                <NotionPage pageId={process.env.NEXT_PUBLIC_NOTION_PAGE_PLAN || ''} isFullPage={false} />
            </BoxLayout>
            <Footer />
        </>
    );
};

export default Home;
