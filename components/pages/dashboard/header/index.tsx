import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
    Avatar,
    Button,
    cv,
    Flex,
    Header,
    Menu,
    PageLayout,
    Spacer,
    Spinner,
    Text,
    useTopLoading,
} from 'opize-design-system';
import styled from 'styled-components';
import SkeletonIcon from '../../../../assets/logo.png';

import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import C2NLogo from '../../../../assets/logo.png';
import { useUser } from '../../../../hooks/useUser';
import { toast } from 'react-toastify';

const Img = styled(Image)`
    height: 26px;
`;

const Title = styled.div`
    font-weight: 600;
    color: #9764ff;
    font-size: 16px;
    text-decoration: none;
`;

type Path = 'dashboard' | 'plan' | 'setting' | 'roadmap';

const A = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
`;

const MenuProfileContainer = styled.div`
    width: 230px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    margin-bottom: 8px;
`;

const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
};

function StyledDashboardHeader({ now }: { now: Path }) {
    const router = useRouter();
    const { user, isLoading } = useUser();

    useEffect(() => {
        if (user && user.status !== 'FINISHED') {
            router.push('/connect');
        }
    }, [router, user, user?.status]);

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
                        <Menu.Trigger variant="tertiary" iconOnly shape="round">
                            <Image src={user?.imageUrl || SkeletonIcon} alt="유저 프로필 사진" width={32} height={32} />
                        </Menu.Trigger>
                        <Menu.Content>
                            <MenuProfileContainer>
                                <Avatar src={user?.imageUrl} size="32px" />
                                <Flex.Column>
                                    <Text>{user?.name}</Text>
                                    <Text size="14px">{user?.email}</Text>
                                </Flex.Column>
                            </MenuProfileContainer>
                            {user?.isAdmin && (
                                <Menu.Option onClick={() => router.push('/admin')}>운영진 대시보드</Menu.Option>
                            )}
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
                        onClick: () => router.push('/dashboard'),
                    },
                    {
                        value: 'plan',
                        title: '구독',
                        onClick: () => router.push('/dashboard/plan'),
                    },
                    {
                        value: 'roadmap',
                        title: '로드맵',
                        onClick: () => router.push('/dashboard/roadmap'),
                    },
                    {
                        value: 'setting',
                        title: '설정',
                        onClick: () => router.push('/dashboard/setting'),
                    },
                ]}
            />
        </Header>
    );
}

export const DashboardHeader = dynamic(() => Promise.resolve(StyledDashboardHeader), {
    ssr: false,
});
