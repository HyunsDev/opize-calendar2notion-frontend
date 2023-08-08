import {
    Box,
    Button,
    Code,
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
import { UserDto } from '@opize/calendar2notion-object';

const CodeBlock = styled.pre`
    border-radius: 4px;
    font-size: 12px;
    word-break: break-all;
    white-space: pre-wrap;
`;

function NotionDatabaseSummaryTable({ database }: { database: any }) {
    const databaseSummary = {
        title: database?.title?.map((title: any) => title.plain_text).join(''),
        id: database?.id,
        url: database?.url,
        properties: Object.values(database?.properties || {}).map((property: any) => ({
            name: property.name,
            type: property.type,
            id: property.id,
        })),
    };

    return (
        <Table>
            <Table.THead>
                <Table.Row>
                    <Table.Head width="130px">속성</Table.Head>
                    <Table.Head width="100px">키</Table.Head>
                    <Table.Head>정보</Table.Head>
                </Table.Row>
            </Table.THead>
            <Table.TBody>
                <Table.Row>
                    <Table.Data width="130px">제목</Table.Data>
                    <Table.Data width="100px"></Table.Data>
                    <Table.Data>{databaseSummary.title}</Table.Data>
                </Table.Row>
                <Table.Row>
                    <Table.Data width="130px">id</Table.Data>
                    <Table.Data width="100px"></Table.Data>
                    <Table.Data>{databaseSummary.id}</Table.Data>
                </Table.Row>
                <Table.Row>
                    <Table.Data width="130px">url</Table.Data>
                    <Table.Data width="100px"></Table.Data>
                    <Table.Data>{databaseSummary.url}</Table.Data>
                </Table.Row>
                {databaseSummary.properties.map((property, index) => {
                    return (
                        <Table.Row key={index}>
                            <Table.Data width="130px">{property.name}</Table.Data>
                            <Table.Data width="100px">
                                <Code>{property.id}</Code>
                            </Table.Data>
                            <Table.Data>{property.type}</Table.Data>
                        </Table.Row>
                    );
                })}
            </Table.TBody>
        </Table>
    );
}

function NotionDatabaseBox({ user }: { user: UserDto }) {
    const [isShow, setIsShow] = useState(true);
    const [isSummary, setIsSummary] = useState(true);

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
        <>
            <Box
                title="노션 데이터베이스"
                footer={
                    <>
                        <Flex.Row gap="8px">
                            <Switch text="가리기" checked={!isShow} onChange={() => setIsShow(!isShow)} />
                            {isShow && (
                                <Switch text="요약" checked={isSummary} onChange={() => setIsSummary(!isSummary)} />
                            )}
                        </Flex.Row>
                        <Button onClick={() => refetch()}>조회</Button>
                    </>
                }
            >
                {isLoading ? (
                    <Flex.Center>
                        <Spinner />
                    </Flex.Center>
                ) : isShow ? (
                    isSummary ? (
                        <NotionDatabaseSummaryTable database={data} />
                    ) : (
                        <CodeBlock>{JSON.stringify(data, null, 2)}</CodeBlock>
                    )
                ) : (
                    <>가려졌습니다</>
                )}
            </Box>
        </>
    );
}

export function AdminUserDebugContainer() {
    const { adminUser } = useAdminUser();

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
