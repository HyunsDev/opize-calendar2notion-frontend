import { useCallback, useEffect, useState } from 'react';
import { client } from '../../../lib/client';
import { ConnectBlockBase } from '../components/blockBase';
import { BlockHeader } from '../components/blockHeader';
import { ConnectButton } from '../components/connectBtn';
import { Button, Flex, Link, SlideBox, Spinner, useSlideBox } from 'opize-design-system';
import { MigrateV1CheckUser } from '@opize/calendar2notion-object';
import { MigrationPreview, MigrationPreviewSkeleton } from '../components/migratePreview';
import { connectPageIndex } from '../connectPageIndex';
import { toast } from 'react-toastify';
import { MigrationGuideLink } from '../components/migrationGuideLink';
import Image from 'next/image';

import Img from '../../../assets/connect/Calendar2notion.png';

export function ExistCheckConnectBlock() {
    const page = connectPageIndex.CHECK_EXIST;

    const { now, move } = useSlideBox();

    const onClick = useCallback(
        async (mode: 'new' | 'exist') => {
            if (mode === 'new') {
                move(connectPageIndex.NEW_CONNECT.NOTION_API);
            } else if (mode === 'exist') {
                move(connectPageIndex.EXIST_CONNECT.NOTION_API);
            }
        },
        [move]
    );

    return (
        <SlideBox.Page pos={page}>
            <ConnectBlockBase>
                <Image src={Img} height={720} width={1280} alt="" />
                <BlockHeader
                    title="노션 데이터베이스 연결"
                    text={
                        <>
                            구글 캘린더를 기존에 사용하던 노션 데이터베이스에 연결하시겠어요? 또는 새로운 노션
                            데이터베이스를 생성할까요?
                        </>
                    }
                />

                <Flex.Column gap="8px">
                    <Button onClick={() => onClick('exist')} width="100%" size="large" variant="outlined">
                        기존 노션 데이터베이스에 연결하기
                    </Button>
                    <Button onClick={() => onClick('new')} width="100%" size="large" variant="contained">
                        새로운 노션 데이터베이스에 연결하기
                    </Button>
                </Flex.Column>
            </ConnectBlockBase>
        </SlideBox.Page>
    );
}
