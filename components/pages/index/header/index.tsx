import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SimpleHeader, Flex, Button, cv, Token } from 'opize-design-system';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import C2NLogo from '../../../../assets/logo.png';
import { APIResponseError, client } from '../../../../lib/client';
import { isClient } from '../../../../utils/isClient';

const Img = styled(Image)`
    height: 26px;
`;

const Title = styled.div`
    font-weight: ${cv.fontWeightSemiBold};
    color: #9764ff;
    font-size: 16px;
`;

export function IndexHeader() {
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        setIsLogin(!!localStorage.getItem('token'));
    }, []);

    const login = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_OPIZE}/oauth/verify/${process.env.NEXT_PUBLIC_OPIZE_PROJECT_CODE}?redirectUrl=${process.env.NEXT_PUBLIC_OPIZE_API_REDIRECT_URL}`;
    };

    const router = useRouter();

    useEffect(() => {
        const token = router.query.token as string;
        if (token) {
            (async () => {
                try {
                    const res = await client.user.post({
                        token,
                    });
                    localStorage.setItem('token', res.token);
                    client.updateAuth(res.token);
                    setIsLogin(true);
                } catch (err) {
                    console.log(err);
                    if (err instanceof APIResponseError) {
                        toast.error(`서버와 연결할 수 없어요. ${err.status}`);
                        console.error(err);
                    } else {
                        toast.error('문제가 발생했어요.');
                        console.error(err);
                    }
                }
            })();
            router.replace('.');
        }
    }, [router, router.query.token]);

    return (
        <SimpleHeader>
            <Link href={'/'} passHref>
                <Flex.Row gap="8px" as="a" style={{ textDecoration: 'none' }}>
                    <Img src={C2NLogo} height={26} width={26} />
                    <Title>Calendar2notion (Beta)</Title>
                </Flex.Row>
            </Link>

            <SimpleHeader.Nav>
                <Link href={'/about'} passHref>
                    <SimpleHeader.Nav.Link>소개</SimpleHeader.Nav.Link>
                </Link>
                <Link href={'/guide'} passHref>
                    <SimpleHeader.Nav.Link>가이드</SimpleHeader.Nav.Link>
                </Link>

                <Link href={'/plan'} passHref>
                    <SimpleHeader.Nav.Link>플랜</SimpleHeader.Nav.Link>
                </Link>
            </SimpleHeader.Nav>
            <Flex.Row gap="4px">
                {isLogin ? (
                    <Link href={'/dashboard'} passHref>
                        <Button variant="contained" as="a">
                            대시보드
                        </Button>
                    </Link>
                ) : (
                    <>
                        <Button variant="text" onClick={login}>
                            로그인
                        </Button>
                        <Button variant="contained" onClick={login}>
                            무료로 시작하기
                        </Button>
                    </>
                )}
            </Flex.Row>
        </SimpleHeader>
    );
}
