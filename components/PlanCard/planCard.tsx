import styled from 'styled-components';
import { UserEntity } from '../../lib/old-client/endpoints/admin';
import { Button, Flex, cv } from 'opize-design-system';

const PlanName = styled.div`
    font-size: 40px;
    font-weight: 600;
`;

const Price = styled.div`
    margin-top: 8px;
    font-size: 16px;
    font-weight: 600;

    span {
        font-size: 14px;
        color: ${cv.default400};
    }
`;

const PriceByYear = styled.div`
    font-size: 14px;
    color: ${cv.default400};
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
    border: solid 2px ${cv.blue};
    border-radius: 8px;
    background-color: ${cv.background};
    box-shadow: 0px 6px 20px ${cv.blue_background};
    color: ${cv.foreground};
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
                    <Dot color={cv.blue} />
                    빠른 실시간 동기화
                </Item>
                <Item>
                    <Dot color={cv.blue} />
                    다중 캘린더
                </Item>
                <Item>
                    <Dot color={cv.blue} />
                    공휴일 캘린더
                </Item>
            </Flex.Column>
            {userPlan ? (
                <Flex.Column style={{ marginTop: '40px' }}>
                    {userPlan === 'PRO' ? (
                        <Button variant="secondary" width="100%" size="large">
                            현재 사용중인 플랜이에요
                        </Button>
                    ) : (
                        <Button variant="primary" width="100%" size="large">
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
    border: solid 1px ${cv.default300};
    border-radius: 8px;
    color: ${cv.foreground};
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
                    <Dot color={cv.default600} />
                    느린 동기화
                </Item>
                <Item>
                    <Dot color={cv.default600} />
                    기본 캘린더만 동기화
                </Item>
                <Item>
                    <Dot color={cv.default600} />
                    공휴일 캘린더 X
                </Item>
            </Flex.Column>
            {userPlan ? (
                <Flex.Column style={{ marginTop: '40px' }}>
                    {userPlan === 'PRO' && (
                        <Button variant="secondary" width="100%" size="large">
                            상위 플랜을 이용중이에요
                        </Button>
                    )}
                    {userPlan !== 'PRO' && (
                        <Button variant="secondary" width="100%" size="large">
                            현재 사용중인 플랜이에요
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
    border: solid 2px ${cv.yellow};
    border-radius: 8px;
    color: ${cv.foreground};
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
                    <Dot color={cv.yellow} />
                    Pro 플랜의 모든 혜택
                </Item>
                <Item>
                    <Dot color={cv.yellow} />
                    개발자의 대학 등록금 지원하기
                </Item>
                <Item>
                    <Dot color={cv.yellow} />
                    개발 기록 공유
                </Item>
            </Flex.Column>
            {userPlan ? (
                <Flex.Column style={{ marginTop: '40px' }}>
                    {userPlan === 'SPONSOR' ? (
                        <Button variant="secondary" width="100%" size="large">
                            현재 사용중인 플랜이에요
                        </Button>
                    ) : (
                        <Button variant="primary" width="100%" size="large">
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
