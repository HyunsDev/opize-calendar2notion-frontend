import { Box, Link, Text } from 'opize-design-system';
import { BlockHeader } from './components/blockHeader';
import { NotionButton } from './components/notionBtn';

export function ConnectBlock3() {
    return (
        <Box>
            <BlockHeader
                title="노션 캘린더를 복제해주세요"
                subtitle="3단계 / 4단계"
                text={
                    <>
                        또는 <Link href="/">이미 사용하고 있는 데이터베이스</Link>를 쓸 수 있어요
                    </>
                }
            />
            <NotionButton onClick={() => null}>데이터베이스 템플릿</NotionButton>
        </Box>
    );
}
