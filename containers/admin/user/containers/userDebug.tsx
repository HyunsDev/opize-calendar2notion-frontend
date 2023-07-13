import {
    Box,
    Button,
    Flex,
    H3,
    ItemsTable,
    Spinner,
    Switch,
    Table,
    Text,
    useCodeModal,
    useModal,
} from 'opize-design-system';
import { useAdminUser } from '../hooks/useAdminUser';
import { useEffect, useState } from 'react';
import { client } from '../../../../lib/client';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { UserDto } from '../../../../lib/client/dto';

const CodeBlock = styled.pre`
    border-radius: 4px;
    font-size: 12px;
    word-break: break-all;
    white-space: pre-wrap;
`;

function NotionDatabaseBox({ user }: { user: UserDto }) {
    const [isShow, setIsShow] = useState(false);
    const { refetch, data, isLoading } = useQuery(
        ['admin', 'tools', 'getNotionDatabase', user.id],
        () => client.admin.tools.getNotionDatabase({ userId: user.id }),
        {
            enabled: false,
        }
    );

    if (!user.notionDatabaseId) {
        return (
            <Box title="노션 데이터베이스">
                <Flex.Center>
                    <Text>아직 노션 데이터베이스가 없습니다.</Text>
                </Flex.Center>
            </Box>
        );
    }

    return (
        <Box
            title="노션 데이터베이스"
            footer={
                <>
                    <Switch text="가리기" checked={!isShow} onChange={() => setIsShow(!isShow)} />
                    <Button onClick={() => refetch()}>조회</Button>
                </>
            }
        >
            {isLoading ? (
                <Flex.Center>
                    <Spinner />
                </Flex.Center>
            ) : isShow ? (
                <CodeBlock>{JSON.stringify(data, null, 2)}</CodeBlock>
            ) : (
                <>가려졌습니다</>
            )}
        </Box>
    );
}

export function AdminUserDebugContainer() {
    const { adminUser } = useAdminUser();
    const modal = useModal();

    if (!adminUser) return <></>;

    return (
        <Flex.Column gap="8px" id="user-debug">
            <Flex.Row gap="8px">
                <H3>Debug</H3>
            </Flex.Row>
            <NotionDatabaseBox user={adminUser.user} />
        </Flex.Column>
    );
}
