import styled from 'styled-components';
import { BoxLayout, H1, H2, cv } from 'opize-design-system';
import { PlanCardFree, PlanCardPro, PlanCardSponsor } from '../../../components/PlanCard/planCard';

const Cards = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const Title = styled.h2`
    font-weight: 700;
    font-family: 'Noto Sans KR', sans-serif;
    color: ${cv.foreground};
    font-size: 24px;
`;

export const IndexPlanSection = () => {
    return (
        <BoxLayout width="900px">
            <Title>플랜</Title>

            <Cards>
                <PlanCardFree />
                <PlanCardPro />
                <PlanCardSponsor />
            </Cards>
        </BoxLayout>
    );
};
