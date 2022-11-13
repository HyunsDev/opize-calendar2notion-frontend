import { Box, Button, cv, Flex, Link, Text, TextField } from 'opize-design-system';
import { useEffect, useState } from 'react';
import { APIResponseError, client } from '../../../../lib/client';
import { BlockHeader } from './components/blockHeader';
import { NotionButton } from './components/notionBtn';
import Image from 'next/image';
import Img from '../../../../assets/connect/placeholder.png';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useUser } from '../../../../hooks/useUser';

const StyledButton = styled.button`
    width: 100%;
    height: 44px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    border: solid 1px ${cv.border4};
    gap: 8px;
    transition: 200ms;

    &:hover {
        background-color: #eeeeee;
    }
`;

export function ConnectBlock2({ setCursor }: { setCursor: (cursor: number) => void }) {
    const [templateId, setTemplateId] = useState('');
    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const res = await client.user.connect.getNotionDatabases({
                    userId: 'me',
                });
` `
                let isFindDatabase = false;
                for (const database of res.databases) {
                    if (database.title[0].plain_text === 'Calendar2notion Template') {
                        isFindDatabase = true;
                        setTemplateId(database.id);
                        console.log('템플릿 감지');
                        break;
                    }
                }

                if (!isFindDatabase) {
                    toast.warn('"개발자가 제공한 템플릿 사용"을 체크해주세요!');
                    setCursor(1);
                }
            } catch (err) {
                console.log(err);
                if (err instanceof APIResponseError) {
                    if (err.body.code === 'need_notion_oauth') return;
                    toast.error(`${err.body.message} (${err.body.code})`);
                } else {
                    toast.error('서버에 연결할 수 없어요.');
                }
            }
        })();
    }, [setCursor]);

    const startSync = async () => {
        if (!templateId) return;
        await client.user.connect.notionDatabase({
            userId: 'me',
            id: templateId,
        });
        toast.info('동기화가 성공적으로 시작되었어요!');
        router.push('/dashboard?hello=true');
    };

    return (
        <Flex.Column gap="20px">
            <Image src={Img} height={720} width={1280} alt="" />
            <BlockHeader title={'모든 준비가 완료되었어요!'} />
            <StyledButton onClick={startSync}>{'동기화 시작하기'}</StyledButton>
        </Flex.Column>
    );
}
