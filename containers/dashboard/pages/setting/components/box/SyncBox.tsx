import { useState } from 'react';
import { useUser } from '../../../../../../hooks/useUser';
import { client } from '../../../../../../lib/client';
import { Box, Switch, Text } from 'opize-design-system';

export function SyncBox() {
    const { user, refetch } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    const onChange = async () => {
        setIsLoading(true);
        await client.user.patch({
            userId: 'me',
            isConnected: !user?.isConnected,
        });
        refetch && (await refetch());
        setIsLoading(false);
    };

    return (
        <Box title="동기화">
            <Text>
                일시적으로 동기화를 중단할 수 있어요.
                <br />
                주의! 3주 이상 동기화가 중단되었다가 실행하는 경우 과거에 변경된 내용이 반영되지 않을 수 있어요
            </Text>
            <Switch
                text={isLoading ? '동기화 상태 변경 중' : user?.isConnected ? '동기화 중' : '동기화 해제됨'}
                checked={user?.isConnected}
                onChange={onChange}
                disabled={isLoading}
            />
        </Box>
    );
}
