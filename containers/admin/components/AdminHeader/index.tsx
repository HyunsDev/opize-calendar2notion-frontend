import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Menu, Flex, Header } from 'opize-design-system';
import styled from 'styled-components';
import SkeletonIcon from '../../../../assets/logo.png';

import { useRouter } from 'next/router';
import C2NLogo from '../../../../assets/logo.png';
import { useUser } from '../../../../hooks/useUser';

const Img = styled(Image)`
    height: 26px;
`;

const Title = styled.div`
    font-weight: 600;
    color: #9764ff;
    font-size: 16px;
    text-decoration: none;
`;

type Path = 'dashboard' | 'users' | 'user' | 'syncbot' | 'errors' | 'tools';

const A = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
`;

const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
};

function StyledDashboardHeader({ now }: { now: Path }) {
    const { user } = useUser();
    const router = useRouter();

    return (
        <Header>
            <Header.Nav>
                <Header.Nav.Left>
                    <Link href={'/dashboard'} passHref>
                        <A>
                            <Flex.Row gap="8px">
                                <Img src={C2NLogo} height={26} width={26} />
                                <Title>Calendar2notion</Title>
                            </Flex.Row>
                        </A>
                    </Link>
                </Header.Nav.Left>
                <Header.Nav.Right>
                    <Menu>
                        <Menu.Trigger variant="tertiary" iconOnly>
                            <Image src={user?.imageUrl || SkeletonIcon} alt="유저 프로필 사진" width={32} height={32} />
                        </Menu.Trigger>
                        <Menu.Content>
                            <Menu.Option onClick={() => router.push('/dashboard')}>유저 대시보드</Menu.Option>
                            <Menu.Option onClick={() => logout()} color="red">
                                로그아웃
                            </Menu.Option>
                        </Menu.Content>
                    </Menu>
                </Header.Nav.Right>
            </Header.Nav>

            <Header.Menu
                selected={now}
                tabs={[
                    {
                        value: 'dashboard',
                        title: '대시보드',
                        onClick: () => router.push('/admin'),
                    },
                    {
                        value: 'users',
                        title: '유저 리스트',
                        onClick: () => router.push('/admin/users'),
                    },
                    {
                        value: 'user',
                        title: '유저',
                        onClick: () => router.push('/admin/user'),
                    },
                    {
                        value: 'syncbot',
                        title: '동기화봇',
                        onClick: () => router.push('/admin/syncbot'),
                    },
                    {
                        value: 'errors',
                        title: '에러',
                        onClick: () => router.push('/admin/errors'),
                    },
                    {
                        value: 'tools',
                        title: '툴',
                        onClick: () => router.push('/admin/tools'),
                    },
                ]}
            />
        </Header>
    );
}

export const AdminHeader = dynamic(() => Promise.resolve(StyledDashboardHeader), {
    ssr: false,
});
