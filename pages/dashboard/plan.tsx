import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { PageLayout, H1, Flex, Text, cv } from 'opize-design-system';
import styled from 'styled-components';
import { GCalNotionCircle } from '../../components/GCalNotionCircle';
import { DashboardFooter } from '../../components/pages/dashboard/footer';
import { DashboardHeader } from '../../components/pages/dashboard/header';
import { PlanCardFree } from '../../components/Plan/PlanCard/PlanCardFree';
import { PlanCardPro } from '../../components/Plan/PlanCard/PlanCardPro';
import { PlanCardSponsor } from '../../components/Plan/PlanCard/PlanCardSponsor';

const Title = styled.div`
    margin-top: 32px;
    font-size: 36px;
    font-weight: ${cv.fontWeightSemiBold};
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
            <DashboardHeader now="plan" />
            <PageLayout minHeight="calc(100vh - 131px - 337px)" width="1000px">
                <Flex.Column>
                    <Title>더 빠르게, 더 다양하게 동기화 해보세요.</Title>
                    <Cards>
                        <PlanCardFree />
                        <PlanCardPro />
                        <PlanCardSponsor />
                    </Cards>
                </Flex.Column>
            </PageLayout>
            <DashboardFooter />
        </>
    );
};

export default Home;
