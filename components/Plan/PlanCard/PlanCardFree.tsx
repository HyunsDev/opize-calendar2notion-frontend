import { Button, cv, Flex } from 'opize-design-system';
import styled from 'styled-components';
import { useUser } from '../../../hooks/useUser';

const Divver = styled.div`
    padding: 28px;
    border: solid 1px ${cv.border3};
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

export function PlanCardFree() {
    const { user } = useUser();

    return (
        <Divver>
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
            <Flex.Column style={{ marginTop: '40px' }}>
                {user?.userPlan === 'PRO' ? (
                    <Button variant="contained" width="100%" size="large">
                        다운그레이드
                    </Button>
                ) : (
                    <Button variant="outlined" width="100%" size="large">
                        현재 사용중인 플랜입니다.
                    </Button>
                )}
            </Flex.Column>
        </Divver>
    );
}
