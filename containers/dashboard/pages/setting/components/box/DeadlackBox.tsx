import { useState } from 'react';
import { useUser } from '../../../../../../hooks/useUser';
import { client } from '../../../../../../lib/client';
import { A, Box, Button, Text } from 'opize-design-system';

export function DeadlockBox() {
    const { user, refetch } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        setIsLoading(true);
        await client.user.patch({
            userId: 'me',
            isWork: false,
        });
        refetch && (await refetch());
        setIsLoading(false);
    };

    return (
        <Box
            title="교착 상태 해결"
            footer={
                <>
                    <A href="">자세히 알아보기</A>
                    <Button
                        variant="contained"
                        color="red"
                        isLoading={isLoading}
                        disabled={isLoading}
                        onClick={onClick}
                    >
                        교착상태 해결
                    </Button>
                </>
            }
        >
            <Text>
                교착 상태에 빠진 것 같나요? 일반적으로 <b>첫 동기화가 아닌 동기화</b>는 1분 내로 완료되는 것이
                정상이에요. 그러나 현재 2시간 이상 동기화가 진행중이에요. 만약 노션이나 구글 캘린더에서 동기화가
                정상적으로 이루어지지 않고 있다고 생각되면 아래 버튼을 눌러 교착상태를 해결해주세요.
            </Text>
            <Text>
                정상적으로 동기화되고 있는 상황에서 이 버튼을 클릭하면 동기화가 오류가 발생할 수 있어요! 만약 누르기
                주저된다면 언제든 우측 하단 버튼을 통해 운영진에게 문의해주세요.
            </Text>
        </Box>
    );
}
