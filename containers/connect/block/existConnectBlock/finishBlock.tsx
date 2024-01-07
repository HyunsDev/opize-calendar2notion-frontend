import { Button, Flex, SlideBox } from 'opize-design-system';
import { useState } from 'react';

import Image from 'next/image';
import Img from '../../../../assets/connect/Calendar2notion.png';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { ConnectBlockBase } from '../../components/blockBase';
import { BlockHeader } from '../../components/blockHeader';
import { connectPageIndex } from '../../connectPageIndex';
import { MigrationGuideLink } from '../../components/migrationGuideLink';
import { ExistConnectGuideLink } from '../../components/existConnectGuideLink';

export function ExistConnectFinishBlock() {
    const page = connectPageIndex.EXIST_CONNECT.FINISH;

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const startSync = async () => {
        setIsLoading(true);
        try {
            toast.info('계정이 성공적으로 연결되었어요!');
            router.push('/dashboard?hello=true');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SlideBox.Page index={page}>
            <ConnectBlockBase>
                <Image src={Img} height={720} width={1280} alt="" />
                <BlockHeader title={'모든 준비가 완료되었어요!'} />
                <Flex.Column gap="8px">
                    <Button
                        onClick={startSync}
                        disabled={isLoading}
                        isLoading={isLoading}
                        width="100%"
                        size="medium"
                        variant="secondary"
                    >
                        {'동기화 시작하기'}
                    </Button>
                    <ExistConnectGuideLink />
                </Flex.Column>
            </ConnectBlockBase>
        </SlideBox.Page>
    );
}
