import { Button, Flex, cv } from 'opize-design-system';
import styled from 'styled-components';
import { UserEntity } from '../../../lib/old-client/endpoints/admin';

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

const PlanCardProDiv = styled.div`
    padding: 28px;
    border: solid 2px ${cv.blue1};
    border-radius: 8px;
    background-color: ${cv.bg_element1};
    box-shadow: 0px 6px 20px ${cv.bg_blue1};
    color: ${cv.text1};
`;
export function PlanCardPro({ userPlan }: { userPlan?: UserEntity['userPlan'] }) {
    return (
        <PlanCardProDiv>
            <PlanName>Pro</PlanName>
            <Price>
                24000₩<span>/연</span>
            </Price>
            <PriceByYear>2000₩/개월</PriceByYear>
            <Desc>다양한 캘린더와 공휴일 캘린더를 포함한 노션 전문가용 플랜</Desc>
            <Flex.Column gap="8px" style={{ marginTop: '40px' }}>
                <Item>
                    <Dot color={cv.blue1} />
                    빠른 실시간 동기화
                </Item>
                <Item>
                    <Dot color={cv.blue1} />
                    다중 캘린더
                </Item>
                <Item>
                    <Dot color={cv.blue1} />
                    공휴일 캘린더
                </Item>
            </Flex.Column>
            {userPlan ? (
                <Flex.Column style={{ marginTop: '40px' }}>
                    {userPlan === 'PRO' ? (
                        <Button variant="outlined" width="100%" size="large" color="blue">
                            현재 사용중인 플랜입니다
                        </Button>
                    ) : (
                        <Button variant="contained" width="100%" size="large" color="blue">
                            업그레이드
                        </Button>
                    )}
                </Flex.Column>
            ) : (
                <></>
            )}
        </PlanCardProDiv>
    );
}

const PlanCardFreeDiv = styled.div`
    padding: 28px;
    border: solid 1px ${cv.border3};
    border-radius: 8px;
    color: ${cv.text1};
`;

export function PlanCardFree({ userPlan }: { userPlan?: UserEntity['userPlan'] }) {
    return (
        <PlanCardFreeDiv>
            <PlanName>Free</PlanName>
            <Price>
                0₩<span>/연</span>
            </Price>
            <PriceByYear>0₩/개월</PriceByYear>
            <Desc>누구나 자유롭게 사용할 수 있는 무료 플랜</Desc>
            <Flex.Column gap="8px" style={{ marginTop: '40px' }}>
                <Item>
                    <Dot color={cv.text4} />
                    느린 동기화
                </Item>
                <Item>
                    <Dot color={cv.text4} />
                    기본 캘린더만 동기화
                </Item>
                <Item>
                    <Dot color={cv.text4} />
                    공휴일 캘린더 X
                </Item>
            </Flex.Column>
            {userPlan ? (
                <Flex.Column style={{ marginTop: '40px' }}>
                    {userPlan === 'PRO' ? (
                        <Button variant="contained" width="100%" size="large">
                            다운그레이드
                        </Button>
                    ) : (
                        <Button variant="outlined" width="100%" size="large">
                            현재 사용중인 플랜입니다.
                        </Button>
                    )}
                </Flex.Column>
            ) : (
                <></>
            )}
        </PlanCardFreeDiv>
    );
}

const PlanCardSponsorDiv = styled.div`
    padding: 28px;
    border: solid 2px ${cv.yellow1};
    border-radius: 8px;
    color: ${cv.text1};
`;

export function PlanCardSponsor({ userPlan }: { userPlan?: UserEntity['userPlan'] }) {
    return (
        <PlanCardSponsorDiv>
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
            {userPlan ? (
                <Flex.Column style={{ marginTop: '40px' }}>
                    {userPlan === 'SPONSOR' ? (
                        <Button variant="outlined" width="100%" size="large" color="gray">
                            현재 사용중인 플랜입니다
                        </Button>
                    ) : (
                        <Button variant="contained" width="100%" size="large" color="gray">
                            업그레이드
                        </Button>
                    )}
                </Flex.Column>
            ) : (
                <></>
            )}
        </PlanCardSponsorDiv>
    );
}
