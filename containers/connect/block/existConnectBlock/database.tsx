import { Button, Flex, SlideBox, Input, useModal } from 'opize-design-system';
import { connectPageIndex } from '../../connectPageIndex';
import { ConnectBlockBase } from '../../components/blockBase';
import { BlockHeader } from '../../components/blockHeader';
import { useState } from 'react';

import Image from 'next/image';
import Img from '../../../../assets/connect/Calendar2notion.png';
import { useMutation } from 'react-query';
import { client } from '../../../../lib/client';
import { APIResponseError } from 'endpoint-client';
import { WrongPropsModal } from './modal/wrongPropsModal';
import { ExistConnectGuideLink } from '../../components/existConnectGuideLink';
import { DatabaseNotFoundModal } from './modal/databaseNotFoundModal';
import { useSlideBox } from '../../state/page.state';

const databaseIdParser = (url: string) => {
    let _url = url.split('?')[0];
    const databaseId = _url.split(/\/|\-/)[_url.split(/\/|\-/).length - 1];
    if (databaseId.length !== 32) return null;
    return databaseId;
};

export function ExistConnectDatabaseBlock() {
    const modal = useModal();
    const { now, move } = useSlideBox();
    const [isLoading, setIsLoading] = useState(false);
    const [databaseUrl, setDatabaseUrl] = useState('');
    const databaseId = databaseIdParser(databaseUrl);

    const { mutate } = useMutation(
        (databaseId: string) =>
            client.user.connect.existNotionDatabase({
                databaseId: databaseId,
                userId: 'me',
            }),
        {
            onMutate: () => {
                setIsLoading(true);
            },
            onSuccess: () => {
                move(connectPageIndex.EXIST_CONNECT.FINISH);
            },
            onError: (err) => {
                if (!databaseId) {
                    return;
                }

                if (err instanceof APIResponseError) {
                    if (err.body.code === 'wrong_props') {
                        modal.open(<WrongPropsModal wrongProps={err.body.props} databaseId={databaseId} />);
                    }

                    if (err.body.code === 'database_not_found') {
                        modal.open(<DatabaseNotFoundModal databaseId={databaseId} />);
                    }
                }
                console.log('error');
            },
            onSettled: () => {
                setIsLoading(false);
            },
        }
    );

    const connect = async () => {
        if (!databaseId) return;
        mutate(databaseId);
    };

    return (
        <SlideBox.Page index={connectPageIndex.EXIST_CONNECT.DATABASE}>
            <ConnectBlockBase>
                <Image src={Img} height={720} width={1280} alt="" />
                <BlockHeader title={'데이터베이스에 연결할게요'} text={'길게는 몇 분정도 걸릴 수 있어요'}></BlockHeader>
                <Flex.Column gap="8px">
                    <Input
                        value={databaseUrl}
                        onChange={(e) => setDatabaseUrl(e.target.value)}
                        placeholder="데이터베이스 주소"
                    />
                    <Button
                        onClick={() => connect()}
                        size="medium"
                        width="100%"
                        variant="primary"
                        isLoading={isLoading}
                        disabled={!databaseId}
                    >
                        {!databaseId ? '데이터베이스 주소를 입력해주세요' : '데이터베이스에 연결하기'}
                    </Button>
                    <ExistConnectGuideLink />
                </Flex.Column>
            </ConnectBlockBase>
        </SlideBox.Page>
    );
}
