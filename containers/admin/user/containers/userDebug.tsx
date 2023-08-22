import {
    Box,
    Button,
    Code,
    CodeBlock,
    Flex,
    H3,
    ItemsTable,
    Spinner,
    Switch,
    Table,
    Text,
    cv,
    useCodeModal,
    useModal,
} from 'opize-design-system';
import { useAdminUser } from '../hooks/useAdminUser';
import { useEffect, useState } from 'react';
import { client } from '../../../../lib/client';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { UserDto } from '@opize/calendar2notion-object';
import { Eye } from 'phosphor-react';

const TableContainer = styled.div`
    max-width: 100%;
    overflow-x: auto;
`;

function NotionDatabaseSummaryTable({ database }: { database: any }) {
    const codeModal = useCodeModal();

    const databaseSummary = {
        title: database?.title?.map((title: any) => title.plain_text).join(''),
        id: database?.id,
        url: database?.url,
        properties: Object.values(database?.properties || {}).map((property: any) => ({
            name: property.name,
            type: property.type,
            id: property.id,
            ...property,
        })),
    };

    const openValueModal = (key: string, value: any) => {
        let code = value;
        try {
            code = JSON.parse(value);
        } catch {
            code = value;
        }
        codeModal.open(code, {
            title: key,
        });
    };

    return (
        <TableContainer>
            <Table>
                <Table.Head>
                    <Table.Row>
                        <Table.Column>속성</Table.Column>
                        <Table.Column>키</Table.Column>
                        <Table.Column>정보</Table.Column>
                        <Table.Column align="right"> </Table.Column>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>제목</Table.Cell>
                        <Table.Cell> </Table.Cell>
                        <Table.Cell>{databaseSummary.title}</Table.Cell>
                        <Table.Cell align="right"> </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>id</Table.Cell>
                        <Table.Cell> </Table.Cell>
                        <Table.Cell>{databaseSummary.id}</Table.Cell>
                        <Table.Cell align="right"> </Table.Cell>
                    </Table.Row>
                    {databaseSummary.properties.map((property, index) => {
                        return (
                            <Table.Row key={index}>
                                <Table.Cell>{property.name}</Table.Cell>
                                <Table.Cell>
                                    <Code>{property.id}</Code>
                                </Table.Cell>
                                <Table.Cell>{property.type}</Table.Cell>
                                <Table.Cell align="right">
                                    <Button
                                        suffix={<Eye color={cv.default400} />}
                                        onClick={() => openValueModal(property.name, property)}
                                        variant="tertiary"
                                    />
                                </Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </TableContainer>
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
                            <Switch checked={!isShow} onChange={() => setIsShow(!isShow)}>
                                가리기
                            </Switch>
                            {isShow && (
                                <Switch checked={isSummary} onChange={() => setIsSummary(!isSummary)}>
                                    요약
                                </Switch>
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
