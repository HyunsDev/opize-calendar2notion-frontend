import { A, Box, Button, CodeBlock, Flex } from 'opize-design-system';
import { useUser } from '../../../../../../hooks/useUser';
import { GetUserResponse } from '@opize/calendar2notion-object';

function NotionDatabaseNotFoundErrorBox({ user }: { user: GetUserResponse }) {
    return (
        <Box
            title="노션 데이터베이스를 찾을 수 없어 동기화가 중단되었어요."
            footer={
                <>
                    <p />

                    <Flex.Row gap="8px">
                        <Button onClick={() => window.open('/guide-notion-database-not-found')}>
                            해결 가이드 열기
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() =>
                                window.open(`https://notion.so/${user.notionDatabaseId.replaceAll('-', '')}`)
                            }
                        >
                            노션 열기
                        </Button>
                    </Flex.Row>
                </>
            }
        >
            1. 노션에서 Opize Calendar2notion 또는 C2N TEST v4 Public이 있는지 확인해주세요
            <br />
            2. 데이터베이스가 삭제되었을 경우 휴지통에서 복구해주세요.
        </Box>
    );
}

function NotionValidationErrorBox({ user }: { user: GetUserResponse }) {
    return (
        <Box
            title="노션 속성이 올바르지 않아 동기화가 중단되었어요"
            footer={
                <>
                    <p />
                    <Flex.Row gap="8px">
                        <Button onClick={() => window.open('/guide-notion-validation-error')}>해결 가이드 열기</Button>
                        <Button
                            variant="contained"
                            onClick={() =>
                                window.open(`https://notion.so/${user.notionDatabaseId.replaceAll('-', '')}`)
                            }
                        >
                            노션 열기
                        </Button>
                    </Flex.Row>
                </>
            }
        >
            가이드에 따라 속성을 원래대로 수정하여 다시 동기화를 재개해주세요
        </Box>
    );
}

export function ErrorBox() {
    const { user } = useUser();
    const errorCode = user?.lastSyncStatus;

    if (!user) {
        return <></>;
    }

    if (errorCode === 'notion_api_database_not_found') {
        return <NotionDatabaseNotFoundErrorBox user={user} />;
    }

    if (errorCode === 'notion_validation_error') {
        return <NotionValidationErrorBox user={user} />;
    }

    if (errorCode === 'notion_api_page_not_found') {
        return <NotionDatabaseNotFoundErrorBox user={user} />;
    }

    return (
        <Box title="에러가 발생했어요">
            <p>알 수 없는 에러가 발생했어요. 아래 정보와 함께 개발자에게 문의해주세요</p>
            <CodeBlock>
                {JSON.stringify(
                    {
                        id: user?.id,
                        email: user?.email,
                        googleEmail: user?.googleEmail,
                        code: user?.lastSyncStatus,
                    },
                    null,
                    2
                )}
            </CodeBlock>
        </Box>
    );
}
