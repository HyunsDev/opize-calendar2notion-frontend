import { Box, Flex, Text, useTopLoading } from 'opize-design-system';
import { BlockHeader } from './components/blockHeader';
import { GoogleLoginButton } from './components/googleLoginBtn';
import Image from 'next/image';
import Img from '../../../../assets/connect/placeholder.png';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { APIResponseError, client, isHTTPResponseError } from '../../../../lib/client';
import { useUser } from '../../../../hooks/useUser';

export function ConnectBlock0({ setCursor }: { setCursor: (cursor: number) => void }) {
    const { start: loadingStart, end: loadingEnd } = useTopLoading();
    const { user } = useUser();

    const googleLogin = useGoogleLogin({
        onSuccess: async (data) => {
            try {
                loadingStart();
                console.log(data.code, data.scope);
                await client.user.connect.googleApi({
                    userId: 'me',
                    code: data.code,
                });
                loadingEnd();
                setCursor(1);
            } catch (err: unknown) {
                loadingEnd();

                if (err instanceof APIResponseError) {
                    if (err.body.code === 'already_account_exist') {
                        toast.error('이미 구글 계정이 등록되어있어요.');
                    } else if (err.body.code === 'need_google_calendar_permission') {
                        toast.warn('구글 캘린더 권한이 필요해요. 로그인 화면에서 구글 캘린더 체크박스를 체크해주세요.');
                    } else {
                        toast.error('서버에 문제가 발생했어요.');
                    }
                } else {
                    toast.error('알 수 없는 문제가 발생했어요.');
                }
            }
        },
        scope: 'profile email https://www.googleapis.com/auth/calendar',
        flow: 'auth-code',
    });

    return (
        <Flex.Column gap="20px">
            <Image src={Img} height={720} width={1280} alt="" />
            <BlockHeader title="먼저 구글 캘린더에 로그인할게요." text="반드시 구글 캘린더 권한을 체크해주세요!" />
            <GoogleLoginButton onClick={() => googleLogin()}>구글로 계속하기</GoogleLoginButton>
        </Flex.Column>
    );
}
