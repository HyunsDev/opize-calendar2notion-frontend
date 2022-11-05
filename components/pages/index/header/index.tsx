import Image from 'next/image';
import { useRouter } from 'next/router';
import { SimpleHeader, Flex, Button, cv } from 'opize-design-system';
import { useEffect } from 'react';
import styled from 'styled-components';
import C2NLogo from '../../../../assets/logo.png';

const Img = styled(Image)`
    height: 26px;
`;

const Title = styled.div`
    font-weight: ${cv.fontWeightSemiBold};
    color: #9764ff;
    font-size: 16px;
`;

export function IndexHeader() {
    const login = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_OPIZE}/oauth/verify/calendar2notion?redirectUrl=${process.env.NEXT_PUBLIC_OPIZE_API_REDIRECT_URL}`;
    };

    const router = useRouter();

    useEffect(() => {
        const token = router.query.token;
        if (token) {
        }
    }, [router.query.token]);

    return (
        <SimpleHeader>
            <Flex.Row gap="8px">
                <Img src={C2NLogo} height={26} width={26} />
                <Title>Calendar2notion</Title>
            </Flex.Row>

            <SimpleHeader.Nav>
                <SimpleHeader.Nav.Link href="/">소개</SimpleHeader.Nav.Link>
                <SimpleHeader.Nav.Link href="/">가이드</SimpleHeader.Nav.Link>
                <SimpleHeader.Nav.Link href="/">플랜</SimpleHeader.Nav.Link>
            </SimpleHeader.Nav>
            <Flex.Row gap="4px">
                <Button variant="text" onClick={login}>
                    로그인
                </Button>
                <Button variant="contained">무료로 시작하기</Button>
            </Flex.Row>
        </SimpleHeader>
    );
}
