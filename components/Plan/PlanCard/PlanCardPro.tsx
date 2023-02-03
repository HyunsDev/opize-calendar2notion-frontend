import { Button, cv, Flex } from 'opize-design-system';
import styled from 'styled-components';
import { useUser } from '../../../hooks/useUser';

const Divver = styled.div`
    padding: 28px;
    border: solid 2px ${cv.blue1};
    border-radius: 8px;
    background-color: ${cv.bg_element1};
    box-shadow: 0px 6px 20px ${cv.bg_blue1};
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

export function PlanCardPro() {
    const { user } = useUser();

    return (
        <Divver>
            <PlanName>Pro</PlanName>
            <Price>
                2000₩<span>/개월</span>
            </Price>
            <PriceByYear>24000₩/연</PriceByYear>
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
            <Flex.Column style={{ marginTop: '40px' }}>
                {user?.userPlan === 'PRO' ? (
                    <Button variant="outlined" width="100%" size="large" color="blue">
                        현재 사용중인 플랜입니다
                    </Button>
                ) : (
                    <Button variant="contained" width="100%" size="large" color="blue">
                        업그레이드
                    </Button>
                )}
            </Flex.Column>
        </Divver>
    );
}
