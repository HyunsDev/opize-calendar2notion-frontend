import { useCallback } from 'react';
import { ConnectBlockBase } from '../components/blockBase';
import { BlockHeader } from '../components/blockHeader';
import { Button, Flex, SlideBox } from 'opize-design-system';
import { connectPageIndex } from '../connectPageIndex';
import Image from 'next/image';

import Img from '../../../assets/connect/Calendar2notion.png';
import { useSlideBox } from '../state/page.state';

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
        <SlideBox.Page index={page}>
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
                    <Button onClick={() => onClick('exist')} width="100%" size="medium" variant="secondary">
                        기존 노션 데이터베이스에 연결하기
                    </Button>
                    <Button onClick={() => onClick('new')} width="100%" size="medium" variant="primary">
                        새로운 노션 데이터베이스에 연결하기
                    </Button>
                </Flex.Column>
            </ConnectBlockBase>
        </SlideBox.Page>
    );
}
