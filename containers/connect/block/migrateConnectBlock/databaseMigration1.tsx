import { useRouter } from 'next/router';
import { Button, SlideBox, useDialog, useModal, useSlideBox, useTopLoading } from 'opize-design-system';
import { connectPageIndex } from '../../connectPageIndex';
import { ConnectBlockBase } from '../../components/blockBase';
import { BlockHeader } from '../../components/blockHeader';
import { useState } from 'react';
import axios from 'axios';

import Image from 'next/image';
import Img from '../../../../assets/connect/Calendar2notion.png';
import { client } from '../../../../lib/client';
import { APIResponseError } from 'endpoint-client';

export function MigrateConnectMigrationBlock({ notionDatabaseId }: { notionDatabaseId: string }) {
    const { move } = useSlideBox();
    const [isLoading, setIsLoading] = useState(false);
    const dialog = useDialog();

    const migrate = async () => {
        try {
            setIsLoading(true);
            const res = await client.migrate.v1.calendarMigrate({
                userId: 'me',
            });
            console.log(res);
            setIsLoading(false);
            move(connectPageIndex.MIGRATE_CONNECT.FINISH);
        } catch (err) {
            console.error(err);
            setIsLoading(false);

            if (err instanceof APIResponseError) {
                dialog({
                    title: err.body.message,
                    content: err.body.description,
                    buttons: [
                        {
                            children: '노션 열기',
                            onClick: () => {
                                window.open(notionDatabaseId, '_blank');
                            },
                        },
                        {
                            children: '확인',
                            onClick: () => {},
                        },
                    ],
                });
            }
        }
    };

    return (
        <SlideBox.Page pos={connectPageIndex.MIGRATE_CONNECT.MIGRATION}>
            <ConnectBlockBase>
                <Image src={Img} height={720} width={1280} alt="" />
                <BlockHeader
                    title={'데이터베이스 마이그레이션 할게요'}
                    text={'길게는 몇 분정도 걸릴 수 있어요'}
                ></BlockHeader>
                <Button onClick={migrate} size="large" width="100%" variant="outlined" isLoading={isLoading}>
                    마이그레이션
                </Button>
            </ConnectBlockBase>
        </SlideBox.Page>
    );
}
