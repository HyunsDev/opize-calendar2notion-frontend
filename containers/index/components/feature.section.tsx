import { BoxLayout, Flex } from 'opize-design-system';
import styled from 'styled-components';

import Calendar3DIcon from './assets/Calendar_perspective_matte_s.png';
import Clock3DIcon from './assets/Clock_perspective_matte_s.png';
import Notebook3DIcon from './assets/Notebook_perspective_matte_s.png';
import Image from 'next/image';

const FeatureDiv = styled.div<{ backgroundColor: string }>`
    background: ${(props) => props.backgroundColor};
    padding: 80px 60px;
    border-radius: 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 720px) {
        flex-direction: column;
        padding: 40px 20px;
    }
`;

const FeatureSubtitle = styled.p<{ color: string }>`
    color: ${(props) => props.color};
    font-weight: 700;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 24px;
    @media (max-width: 720px) {
        font-size: 16px;
    }
`;

const FeatureTitle = styled.p<{ color: string }>`
    font-size: 40px;
    color: ${(props) => props.color};
    line-height: 1.3;
    font-weight: 700;
    font-family: 'Noto Sans KR', sans-serif;
    @media (max-width: 720px) {
        font-size: 30px;
    }
`;

const FeatureDescription = styled.p<{ color: string }>`
    margin-top: 8px;
    color: ${(props) => props.color};
`;

const FeatureIconDiv = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`;

const Feature = ({
    backgroundColor,
    title,
    subtitle,
    description,
    titleColor,
    subtitleColor,
    descriptionColor,
    icon,
}: {
    backgroundColor: string;

    title: React.ReactNode;
    subtitle: React.ReactNode;
    description: React.ReactNode;

    titleColor: string;
    subtitleColor: string;
    descriptionColor: string;

    icon: any;
}) => {
    return (
        <FeatureDiv backgroundColor={backgroundColor}>
            <Flex.Column style={{ width: '100%' }}>
                <FeatureSubtitle color={subtitleColor}>{subtitle}</FeatureSubtitle>
                <FeatureTitle color={titleColor}>{title}</FeatureTitle>
                <FeatureDescription color={descriptionColor}>{description}</FeatureDescription>
            </Flex.Column>
            <FeatureIconDiv>
                <Image src={icon} width={200} height={200} alt="시계 이미지" />
            </FeatureIconDiv>
        </FeatureDiv>
    );
};

export const IndexFeatureSection = () => {
    return (
        <BoxLayout width="900px">
            <Flex.Column gap="20px">
                <Feature
                    title={
                        <>
                            단 1분만에, <br />
                            손쉽게 연결하기
                        </>
                    }
                    subtitle={<>연결하기</>}
                    description={
                        <>
                            오래 걸리지 않아요 <br />
                            물론, 전혀 어렵지도 않습니다
                        </>
                    }
                    backgroundColor="#e7effc"
                    titleColor="#26292e"
                    subtitleColor="#649dff"
                    descriptionColor="#9da2aa"
                    icon={Clock3DIcon}
                />

                <Feature
                    title={
                        <>
                            지난 기록도, <br />
                            전부 가져오세요
                        </>
                    }
                    subtitle={<>기록 가져오기</>}
                    description={
                        <>
                            이미 구글 캘린더에 작성된
                            <br />
                            내용도 가져옵니다.
                        </>
                    }
                    backgroundColor="linear-gradient(90deg,#649dff,#9764ff);"
                    titleColor="#ffffff"
                    subtitleColor="#e7effc"
                    descriptionColor="#ffffff"
                    icon={Calendar3DIcon}
                />

                <Feature
                    title={
                        <>
                            노션에는 없던
                            <br />
                            공휴일 확인하기
                        </>
                    }
                    subtitle={<>공휴일 캘린더</>}
                    description={
                        <>
                            노션에서도 공휴일을
                            <br />
                            확인해보세요
                        </>
                    }
                    backgroundColor="#26292e"
                    titleColor="#ffffff"
                    subtitleColor="#629DFF"
                    descriptionColor="#9da2aa"
                    icon={Notebook3DIcon}
                />
            </Flex.Column>
        </BoxLayout>
    );
};
