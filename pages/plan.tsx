import type { NextPage } from 'next';
import { Footer } from '../components/footer';
import { IndexHeader } from '../components/pages/index/header';
import React from 'react';
import { NotionPage } from '../components/notionPage';
import { BoxLayout, cv, Flex, PageLayout } from 'opize-design-system';
import styled from 'styled-components';
import { useUser } from '../hooks/useUser';
import { PlanCardFree, PlanCardPro, PlanCardSponsor } from '../components/Plan/PlanCard/planCard';

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
`;

const Home: NextPage = () => {
    const { user } = useUser({ allowNonLogin: true });

    return (
        <>
            <IndexHeader />
            <BoxLayout minHeight="calc(100vh - 131px - 337px)" width="1000px" marginTop="64px">
                <Flex.Column>
                    <Title>더 빠르게, 더 다양하게 동기화 해보세요.</Title>
                    <Cards>
                        <PlanCardFree userPlan={user?.userPlan} />
                        <PlanCardPro userPlan={user?.userPlan} />
                        <PlanCardSponsor userPlan={user?.userPlan} />
                    </Cards>
                </Flex.Column>
                <NotionPage pageId={process.env.NEXT_PUBLIC_NOTION_PAGE_PLAN || ''} isFullPage={false} />
            </BoxLayout>
            <Footer />
        </>
    );
};

export default Home;
