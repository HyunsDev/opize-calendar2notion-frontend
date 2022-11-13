import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
    ActionMenu,
    ActionMenuActionType,
    Button,
    cv,
    Flex,
    Header,
    PageLayout,
    Spacer,
    useTopLoading,
} from 'opize-design-system';
import styled from 'styled-components';
import SkeletonIcon from '../../../../assets/logo.png';

import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import C2NLogo from '../../../../assets/logo.png';
import { useUser } from '../../../../hooks/useUser';

const Img = styled(Image)`
    height: 26px;
`;

const Title = styled.div`
    font-weight: ${cv.fontWeightSemiBold};
    color: #9764ff;
    font-size: 16px;
    text-decoration: none;
`;

type Path = 'dashboard' | 'user' | 'syncbot';

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

    const action: ActionMenuActionType[][] = [
        [
            {
                label: '유저 대시보드',
                onClick: () => router.push('/dashboard'),
            },
        ],
        [
            {
                label: '로그아웃',
                color: 'red',
                onClick: () => logout(),
            },
        ],
    ];

    return (
        <Header>
            <Header.Notice />
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
                    <ActionMenu
                        variant="text"
                        borderRadius={999}
                        width="fit-content"
                        actions={action}
                        icon={
                            <Image src={user?.imageUrl || SkeletonIcon} alt="유저 프로필 사진" width={32} height={32} />
                        }
                    ></ActionMenu>
                </Header.Nav.Right>
            </Header.Nav>
            <Header.SubMenu
                selected={now}
                menu={{
                    dashboard: {
                        text: '대시보드',
                        onClick: () => router.push('/admin'),
                    },
                    user: {
                        text: '유저',
                        onClick: () => router.push('/admin/user'),
                    },
                    syncbot: {
                        text: '동기화봇',
                        onClick: () => router.push('/admin/syncbot'),
                    },
                }}
            />
        </Header>
    );
}

export const AdminHeader = dynamic(() => Promise.resolve(StyledDashboardHeader), {
    ssr: false,
});
