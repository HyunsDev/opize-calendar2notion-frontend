import { useRouter } from 'next/router';
import { useUser } from '../../hooks/useUser';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { A, Button, CenterLayout, Flex, SlideBox, Text, TextField, cv, useSlideBox } from 'opize-design-system';
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

const Box = styled.div`
    border: solid 1px ${cv.border4};
    border-radius: 8px;
    padding: 30px 0px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    width: 100%;

    @media (max-width: 767px) {
        border: solid 0px ${cv.border4};
    }
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: ${cv.fontWeightSemiBold};
    color: #9764ff;
`;

const Title = styled.h1`
    font-size: 20px;
    font-weight: ${cv.fontWeightRegular};
`;

export function SlideBoxContainer() {
    const router = useRouter();
    const { user } = useUser();

    /**
     * new: 새로운 데이터베이스에 연결
     * migrate: 기존 Calendar2notion에서 마이그레이션
     * exist: 기존 노션 데이터베이스에 연결
     */
    const [connectMode, setConnectMode] = useState<'unset' | 'new' | 'migrate' | 'exist'>('unset');

    const { now, move } = useSlideBox();

    const [notionDatabaseId, setNotionDatabaseId] = useState<string | null>(null);

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

                <SlideBox>
                    <GoogleLoginConnectBlock />
                    <MigrateCheckConnectBlock
                        setConnectMode={setConnectMode}
                        setNotionDatabaseId={setNotionDatabaseId}
                    />

                    <NewConnectNotionApiBlock />
                    <NewConnectFinishBlock />

                    <MigrateConnectNotionApiBlock />
                    <MigrateConnectMigrationBlock />
                    <MigrateConnectFinishBlock />
                </SlideBox>
            </Box>
            <Flex.Center style={{ width: '100%', marginTop: '4px' }}>
                <Flex.Row gap="16px">
                    <A>가이드</A>
                    <A>개인정보 처리방침</A>
                    <A>약관</A>
                </Flex.Row>
            </Flex.Center>

            {/* <Flex.Center>
                <Button onClick={() => move(now - 1)}>+1</Button>
                <Text style={{ width: '100px', textAlign: 'center' }}>{connectMode}</Text>
                <TextField value={now} onChange={(e) => move(+e.target.value)} />
                <Button onClick={() => move(now + 1)}>+1</Button>
            </Flex.Center> */}
        </CenterLayout>
    );
}
