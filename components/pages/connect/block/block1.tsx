import { Box, Text } from 'opize-design-system';
import { BlockHeader } from './components/blockHeader';
import { GoogleLoginButton } from './components/googleLoginBtn';

export function ConnectBlock1() {
    return (
        <Box>
            <BlockHeader
                title="먼저 구글 캘린더에 로그인할게요."
                subtitle="1단계 / 4단계"
                text="반드시 구글 캘린더 권한을 체크해주세요!"
            />
            <GoogleLoginButton onClick={() => null}>구글로 계속하기</GoogleLoginButton>
        </Box>
    );
}
