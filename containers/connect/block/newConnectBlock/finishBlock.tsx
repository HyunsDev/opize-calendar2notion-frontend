import { Box, Button, cv, Flex, Link, SlideBox, Text, TextField, useSlideBox } from 'opize-design-system';
import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';
import Img from '../../../../assets/connect/Calendar2notion.png';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { client } from '../../../../lib/client';
import { useUser } from '../../../../hooks/useUser';
import { ConnectBlockBase } from '../../components/blockBase';
import { BlockHeader } from '../../components/blockHeader';
import { ConnectButton } from '../../components/connectBtn';
import { connectPageIndex } from '../../connectPageIndex';
import { APIResponseError } from 'endpoint-client';

export function NewConnectFinishBlock() {
    const page = connectPageIndex.NEW_CONNECT.FINISH;

    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser();
    const router = useRouter();
    const { now, move } = useSlideBox();

    const checkTemplate = useCallback(async () => {
        try {
            const res = await client.user.connect.getNotionDatabases({
                userId: 'me',
            });
            let isFindDatabase = false;
            for (const database of res.databases) {
                if (database.title[0].plain_text === 'Calendar2notion Template') {
                    isFindDatabase = true;
                    return database.id;
                }
            }

            return false;
        } catch (err) {
            if (err instanceof APIResponseError) {
                if (err.body.code === 'need_notion_oauth') {
                    move(connectPageIndex.NEW_CONNECT.NOTION_API);
                    toast.error('Notion 데이터베이스를 다시 선택해주세요');
                    return;
                }
                toast.error(`${err.body.message} (${err.body.code})`);
            }
        }
    }, [move]);

    useEffect(() => {
        if (page === now) {
            (async () => {
                try {
                    if (user && user.status === 'NOTION_API_SET' && !(await checkTemplate())) {
                        toast.warn('"개발자가 제공한 템플릿 사용"을 체크해주세요!');
                        move(101);
                    }
                } catch (err) {
                    console.log(err);
                    if (err instanceof APIResponseError) {
                        console.log(err.body);

                        if (err.body.code === 'need_notion_oauth') {
                            move(connectPageIndex.NEW_CONNECT.NOTION_API);
                            toast.error('Notion 데이터베이스를 다시 선택해주세요');
                            return;
                        }
                        toast.error(`${err.body.message} (${err.body.code})`);
                    } else {
                        toast.error('서버에 연결할 수 없어요.');
                    }
                }
            })();
        }
    }, [checkTemplate, move, now, page, user]);

    const startSync = async () => {
        setIsLoading(true);
        try {
            const templateId = await checkTemplate();

            if (!templateId) return;
            await client.user.connect.notionDatabase({
                userId: 'me',
                id: templateId,
            });

            toast.info('계정이 성공적으로 연결되었어요!');
            router.push('/dashboard?hello=true');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SlideBox.Page pos={page}>
            <ConnectBlockBase>
                <Image src={Img} height={720} width={1280} alt="" />
                <BlockHeader title={'모든 준비가 완료되었어요!'} />
                <Button
                    onClick={startSync}
                    disabled={isLoading}
                    isLoading={isLoading}
                    width="100%"
                    size="large"
                    variant="outlined"
                >
                    {'동기화 시작하기'}
                </Button>
            </ConnectBlockBase>
        </SlideBox.Page>
    );
}
