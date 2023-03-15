import { Button, cv, Flex } from 'opize-design-system';
import styled from 'styled-components';
import { useUser } from '../../../hooks/useUser';

const Divver = styled.div`
    padding: 28px;
    border: solid 2px ${cv.yellow1};
    border-radius: 8px;
    color: ${cv.text1};
`;

const PlanName = styled.div`
    font-size: 40px;
    font-weight: ${cv.fontWeightSemiBold};
`;

const Price = styled.div`
    margin-top: 8px;
    font-size: 16px;
    font-weight: ${cv.fontWeightSemiBold};

    span {
        font-size: 14px;
        color: ${cv.text3};
    }
`;

const PriceByYear = styled.div`
    font-size: 14px;
    color: ${cv.text3};
`;

const Desc = styled.div`
    margin-top: 20px;
    font-size: 16px;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;
const Dot = styled.div<{ color: string }>`
    width: 12px;
    height: 12px;
    border-radius: 9999px;
    background-color: ${(props) => props.color};
`;

export function PlanCardSponsor() {
    const { user } = useUser();

    return (
        <Divver>
            <PlanName>Sponsor</PlanName>
            <Price>
                240000₩ + α<span>/연</span>
            </Price>
            <PriceByYear>20000₩ + α/개월</PriceByYear>
            <Desc>대학교 1학년 1인 개발자를 후원하기 위한 플랜</Desc>
            <Flex.Column gap="8px" style={{ marginTop: '40px' }}>
                <Item>
                    <Dot color={cv.yellow1} />
                    Pro 플랜의 모든 혜택
                </Item>
                <Item>
                    <Dot color={cv.yellow1} />
                    개발자의 대학 등록금 지원하기
                </Item>
                <Item>
                    <Dot color={cv.yellow1} />
                    개발 기록 공유
                </Item>
            </Flex.Column>
            <Flex.Column style={{ marginTop: '40px' }}>
                {user?.userPlan === 'SPONSOR' ? (
                    <Button variant="outlined" width="100%" size="large" color="gray">
                        현재 사용중인 플랜입니다
                    </Button>
                ) : (
                    <Button variant="contained" width="100%" size="large" color="gray">
                        업그레이드
                    </Button>
                )}
            </Flex.Column>
        </Divver>
    );
}
