import { BoxLayout, Flex, Text, cv } from 'opize-design-system';
import styled, { keyframes } from 'styled-components';
import { GCalNotionCircle } from '../../../components/GCalNotionCircle';
import { IndexOpizeToken } from '../../../components/opizeToken';
import Link from 'next/link';

const Title = styled.h1`
    font-size: 44px;
    font-weight: 700;
    font-family: 'Noto Sans KR', sans-serif;
    color: #ffffff;
`;

const Buttons = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    gap: 12px;
`;

const Button2Animation = keyframes`
    0% {
        background-position: 0% center;
    }
    100% {
        background-position: 400% center;
    }
`;

const Button2 = styled.button`
    color: #ffffff;
    text-decoration: none;
    border-radius: 999px;
    padding: 10px 32px;
    font-size: 14px;
    font-weight: ${cv.fontWeightSemiBold};
    border: 2px solid #ffffff;
    outline: none;
    cursor: pointer;
    border: 0;

    transition: 200ms;
`;

const ButtonA = styled.a`
    color: #ffffff;
    text-decoration: none;
    border-radius: 999px;
    padding: 10px 32px;
    font-size: 14px;
    font-weight: ${cv.fontWeightSemiBold};
    border: 2px solid #ffffff;

    transition: 200ms;
`;

const Between = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: linear-gradient(90deg, rgb(100, 157, 255), rgb(151, 100, 255));
    padding: 80px 60px;
    border-radius: 20px;

    @media (max-width: 600px) {
        justify-content: flex-start;
        flex-direction: column;
    }
`;

const Texts = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    @media (max-width: 600px) {
        justify-content: center;
        align-items: center;
        text-align: center;
    }
`;

export const IndexLastSection = ({ isLogin }: { isLogin: boolean }) => {
    const login = () => {
        const redirectUrl = JSON.parse(process.env.NEXT_PUBLIC_OPIZE_API_REDIRECT_MAP || '{}')[window.location.host];
        window.location.href = `${process.env.NEXT_PUBLIC_OPIZE}/oauth/verify/${process.env.NEXT_PUBLIC_OPIZE_PROJECT_CODE}?redirectUrl=${redirectUrl}`;
    };

    return (
        <BoxLayout width="900px">
            <Between>
                <Texts>
                    <Title>
                        구글 캘린더를
                        <br />
                        노션과 연결해보세요!
                    </Title>
                    <Text size="16px" color="#ffffff">
                        카드도 필요 없어요
                        <br />
                        지금 바로 연결해보세요.
                    </Text>
                    <Buttons>
                        {isLogin ? (
                            <Link href={'/dashboard'} passHref>
                                <ButtonA href="/dashboard">대시보드</ButtonA>
                            </Link>
                        ) : (
                            <>
                                <Button2 onClick={login}>무료로 시작하기</Button2>
                            </>
                        )}
                    </Buttons>
                </Texts>
                <GCalNotionCircle size={1} color="#ffffff" />
            </Between>
        </BoxLayout>
    );
};
