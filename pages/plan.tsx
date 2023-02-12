import type { NextPage } from 'next';
import { Footer } from '../components/footer';
import { IndexHeader } from '../components/pages/index/header';
import React from 'react';
import { NotionPage } from '../components/notionPage';
import { BoxLayout, cv, Flex, PageLayout } from 'opize-design-system';
import { PlanCardFree } from '../components/Plan/PlanCard/PlanCardFree';
import styled from 'styled-components';
import { PlanCardPro } from '../components/Plan/PlanCard/PlanCardPro';
import { PlanCardSponsor } from '../components/Plan/PlanCard/PlanCardSponsor';

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
    return (
        <>
            <IndexHeader />
            <BoxLayout minHeight="calc(100vh - 131px - 337px)" width="1000px" marginTop="64px">
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
