import { Box, Button, Link, Text, TextField } from 'opize-design-system';
import { BlockHeader } from './components/blockHeader';
import { NotionButton } from './components/notionBtn';

export function ConnectBlock4() {
    return (
        <Box
            footerTemplate={{
                text: '',
                button: {
                    children: '선택',
                    variant: 'contained',
                },
            }}
        >
            <BlockHeader
                title="데이터베이스를 선택해주세요"
                subtitle="4단계 / 4단계"
                text="Calendar2notion - opize 통합을 추가하고, 아래서 데이터베이스의 링크를 입력해주세요"
            />
            <TextField placeholder="https://notion.so/xxxxxxx?v=xxxxxx"></TextField>
        </Box>
    );
}
