import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SimpleHeader, Flex, Button, Menu } from 'opize-design-system';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import C2NLogo from '../../../../assets/logo.png';
import { client } from '../../../../lib/client';
import { APIResponseError } from '../../../../lib/old-client';
import { useUser } from '../../../../hooks/useUser';
import SkeletonIcon from '../../../../assets/logo.png';

const Img = styled(Image)`
    height: 26px;
`;

const Title = styled.div`
    font-weight: 600;
    color: #9764ff;
    font-size: 16px;
`;

const TitleA = styled.a`
    display: flex;
    gap: 8px;
    text-decoration: none;
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

    return (
        <SimpleHeader>
            <SimpleHeader.Left>
                <Link href={'/'} passHref>
                    <TitleA>
                        <Img src={C2NLogo} height={26} width={26} />
                        <Title>Calendar2notion</Title>
                    </TitleA>
                </Link>
            </SimpleHeader.Left>
            <SimpleHeader.Right>
                <Flex.Row gap="20px">
                    <Link href={'/about'} passHref>
                        <SimpleHeader.A>소개</SimpleHeader.A>
                    </Link>
                    <Link href={'/guide'} passHref>
                        <SimpleHeader.A>가이드</SimpleHeader.A>
                    </Link>

                    <Link href={'/plan'} passHref>
                        <SimpleHeader.A>플랜</SimpleHeader.A>
                    </Link>
                </Flex.Row>

                <Flex.Row gap="4px">
                    {isLogin ? (
                        <>
                            <Menu>
                                <Menu.Trigger variant="tertiary" iconOnly>
                                    <Image
                                        src={user?.imageUrl || SkeletonIcon}
                                        alt="유저 프로필 사진"
                                        width={32}
                                        height={32}
                                    />
                                </Menu.Trigger>
                                <Menu.Content>
                                    {user?.isAdmin && (
                                        <Menu.Option onClick={() => router.push('/admin')}>운영진 대시보드</Menu.Option>
                                    )}
                                    <Menu.Option onClick={() => logout()} color="red">
                                        로그아웃
                                    </Menu.Option>
                                </Menu.Content>
                            </Menu>
                            <Link href={'/dashboard'} passHref>
                                <Button as="a" variant="primary" size="small">
                                    대시보드
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Button variant="tertiary" onClick={login} size="small">
                                로그인
                            </Button>
                            <Button variant="primary" onClick={login} size="small">
                                무료로 시작하기
                            </Button>
                        </>
                    )}
                </Flex.Row>
            </SimpleHeader.Right>
        </SimpleHeader>
    );
}
