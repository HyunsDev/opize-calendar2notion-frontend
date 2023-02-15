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
    Spinner,
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
    font-weight: ${cv.fontWeightSemiBold};
    color: #9764ff;
    font-size: 16px;
    text-decoration: none;
`;

type Path = 'dashboard' | 'plan' | 'setting';

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
    const router = useRouter();
    const { user, isLoading } = useUser();

    useEffect(() => {
        if (user && user.status !== 'FINISHED') {
            router.push('/connect');
        }
    }, [router, user, user?.status]);

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
        <Header>
            <Header.Notice>아직 Beta 버전으로, 불안정한 부분이 있을 수 있어요.</Header.Notice>
            <Header.Nav>
                <Header.Nav.Left>
                    <Link href={'/dashboard'} passHref>
                        <A>
                            <Flex.Row gap="8px">
                                <Img src={C2NLogo} height={26} width={26} />
                                <Title>Calendar2notion (Beta)</Title>
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
                </Header.Nav.Right>
            </Header.Nav>
            <Header.SubMenu
                selected={now}
                menu={{
                    dashboard: {
                        text: '대시보드',
                        onClick: () => router.push('/dashboard'),
                    },
                    plan: {
                        text: '구독',
                        onClick: () => router.push('/dashboard/plan'),
                    },
                    setting: {
                        text: '설정',
                        onClick: () => router.push('/dashboard/setting'),
                    },
                }}
            />
        </Header>
    );
}

export const DashboardHeader = dynamic(() => Promise.resolve(StyledDashboardHeader), {
    ssr: false,
});
