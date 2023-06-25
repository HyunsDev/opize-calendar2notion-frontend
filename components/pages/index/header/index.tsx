import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SimpleHeader, Flex, Button, cv, Token, ActionMenu, ActionMenuActionType, Spinner } from 'opize-design-system';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import C2NLogo from '../../../../assets/logo.png';
import { client } from '../../../../lib/client';
import { APIResponseError } from '../../../../lib/old-client';
import { isClient } from '../../../../utils/isClient';
import { useUser } from '../../../../hooks/useUser';
import SkeletonIcon from '../../../../assets/logo.png';

const Img = styled(Image)`
    height: 26px;
`;

const Title = styled.div`
    font-weight: ${cv.fontWeightSemiBold};
    color: #9764ff;
    font-size: 16px;
`;

export function IndexHeader() {
    const { user, isLoading } = useUser({ allowNonLogin: true });
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        setIsLogin(!!localStorage.getItem('token'));
    }, []);

    const login = () => {
        const redirectUrl = JSON.parse(process.env.NEXT_PUBLIC_OPIZE_API_REDIRECT_MAP || '{}')[window.location.host];
        window.location.href = `${process.env.NEXT_PUBLIC_OPIZE}/oauth/verify/${process.env.NEXT_PUBLIC_OPIZE_PROJECT_CODE}?redirectUrl=${redirectUrl}`;
    };

    const router = useRouter();

    useEffect(() => {
        const token = router.query.token as string;
        if (token) {
            (async () => {
                try {
                    const res = await client.user.post({
                        token,
                        redirectUrl: JSON.parse(process.env.NEXT_PUBLIC_OPIZE_API_REDIRECT_MAP || '{}')[
                            window.location.host
                        ],
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

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    const action: ActionMenuActionType[][] = [
        [
            {
                label: '로그아웃',
                color: 'red',
                onClick: () => logout(),
            },
        ],
    ];

    if (user?.isAdmin) {
        action.unshift([
            {
                label: '관리자',
                onClick: () => router.push('/admin'),
            },
        ]);
    }

    return (
        <SimpleHeader>
            <Link href={'/'} passHref>
                <Flex.Row gap="8px" as="a" style={{ textDecoration: 'none' }}>
                    <Img src={C2NLogo} height={26} width={26} />
                    <Title>Calendar2notion</Title>
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
                    <>
                        <ActionMenu
                            variant="text"
                            borderRadius={999}
                            width="fit-content"
                            actions={action}
                            icon={
                                isLoading ? (
                                    <Spinner size={32} />
                                ) : (
                                    <Image
                                        src={user?.imageUrl || SkeletonIcon}
                                        alt="유저 프로필 사진"
                                        width={32}
                                        height={32}
                                    />
                                )
                            }
                        ></ActionMenu>
                        <Link href={'/dashboard'} passHref>
                            <Button variant="contained" as="a">
                                대시보드
                            </Button>
                        </Link>
                    </>
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
