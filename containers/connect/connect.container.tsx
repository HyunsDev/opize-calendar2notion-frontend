import { useRouter } from 'next/router';
import { useUser } from '../../hooks/useUser';
import { useEffect } from 'react';
import { A, Button, CenterLayout, Flex, SlideBox, cv, ButtonGroup } from 'opize-design-system';
import styled from 'styled-components';
import Image from 'next/image';

import C2NLogo from '../../assets/logo.png';
import { GoogleLoginConnectBlock } from './block/googleLoginBlock';
import { MigrateCheckConnectBlock } from './block/migrateCheckBlock';
import { NewConnectNotionApiBlock } from './block/newConnectBlock/notionApiBlock';
import { NewConnectFinishBlock } from './block/newConnectBlock/finishBlock';
import { MigrateConnectNotionApiBlock } from './block/migrateConnectBlock/notionApiBlock';
import { MigrateConnectMigrationBlock } from './block/migrateConnectBlock/databaseMigration1';
import { MigrateConnectFinishBlock } from './block/migrateConnectBlock/finishBlock';
import { ExistCheckConnectBlock } from './block/existCheckBlock';
import { ExistConnectNotionApiBlock } from './block/existConnectBlock/notionApiBlock';
import { ExistConnectDatabaseBlock } from './block/existConnectBlock/database';
import { ExistConnectFinishBlock } from './block/existConnectBlock/finishBlock';
import { useSlideBox } from './state/page.state';

const Box = styled.div`
    border: solid 1px ${cv.default200};
    border-radius: 8px;
    padding: 30px 0px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    width: 100%;

    @media (max-width: 767px) {
        border: solid 0px ${cv.default200};
    }
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: 600;
    color: #9764ff;
`;

const Title = styled.h1`
    font-size: 20px;
    font-weight: 400;
`;

export function SlideBoxContainer() {
    const router = useRouter();
    const { user } = useUser();
    const { now, move } = useSlideBox();

    useEffect(() => {
        if (user?.status === 'FINISHED') {
            router.push('/dashboard');
        }
    }, [router, user?.status]);

    return (
        <CenterLayout width="420px" minHeight="100vh">
            <Box>
                <Logo>
                    <Image src={C2NLogo} height={24} width={24} alt="" /> Calendar2notion
                </Logo>
                <Title>바로 연결해볼까요?</Title>

                <SlideBox now={now} setNow={move}>
                    <GoogleLoginConnectBlock />
                    <MigrateCheckConnectBlock />
                    <ExistCheckConnectBlock />

                    <NewConnectNotionApiBlock />
                    <NewConnectFinishBlock />

                    <MigrateConnectNotionApiBlock />
                    <MigrateConnectMigrationBlock />
                    <MigrateConnectFinishBlock />

                    <ExistConnectNotionApiBlock />
                    <ExistConnectDatabaseBlock />
                    <ExistConnectFinishBlock />
                </SlideBox>
            </Box>
            <Flex.Center style={{ width: '100%', marginTop: '8px', fontSize: '14px' }}>
                <Flex.Row gap="16px">
                    <A>가이드</A>
                    <A>개인정보 처리방침</A>
                    <A>약관</A>
                </Flex.Row>
            </Flex.Center>
        </CenterLayout>
    );
}
