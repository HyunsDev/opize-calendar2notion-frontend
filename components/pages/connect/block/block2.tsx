import { Box, Text } from 'opize-design-system';
import { BlockHeader } from './components/blockHeader';
import { NotionButton } from './components/notionBtn';

export function ConnectBlock2() {
    return (
        <Box>
            <BlockHeader title="노션 통합을 추가해주세요" subtitle="2단계 / 4단계" />
            <NotionButton onClick={() => null}>노션 통합 추가하기</NotionButton>
        </Box>
    );
}
