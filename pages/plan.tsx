import type { NextPage } from 'next';
import { Footer } from '../components/footer';
import { IndexHeader } from '../containers/index/components/IndexHeader';
import { NotionPage } from '../components/notionPage';
import { BoxLayout, cv, Flex } from 'opize-design-system';
import styled from 'styled-components';
import { useUser } from '../hooks/useUser';
import { PlanCardFree, PlanCardPro, PlanCardSponsor } from '../components/PlanCard/planCard';

const Title = styled.div`
    margin-top: 32px;
    font-size: 36px;
    font-weight: 600;
    color: ${cv.foreground};
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
            <BoxLayout minHeight="calc(100vh - 131px - 337px)" width="1000px">
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
