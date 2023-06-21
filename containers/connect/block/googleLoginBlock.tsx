import { Box, Button, Flex, SlideBox, Text, useSlideBox, useTopLoading } from 'opize-design-system';
import Image from 'next/image';
import Img from '../../../../assets/connect/placeholder.png';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { client } from '../../../lib/client';
import { useUser } from '../../../hooks/useUser';
import { ConnectBlockBase } from '../components/blockBase';
import { APIResponseError } from '../../../lib/old-client';
import { useMigrationModal } from '../../../components/pages/connect/hook/useMigrationModal';
import { YoutubeEmbed } from '../components/youtubeEmbed';
import { BlockHeader } from '../components/blockHeader';
import { GoogleLoginButton } from '../components/googleLoginBtn';
import { connectPageIndex } from '../connectPageIndex';

export function GoogleLoginConnectBlock() {
    const page = connectPageIndex.GOOGLE_LOGIN;

    const { start: loadingStart, end: loadingEnd } = useTopLoading();
    const { move } = useSlideBox();

    const googleLogin = useGoogleLogin({
        onSuccess: async (data) => {
            try {
                loadingStart();
                const callbackVersion = JSON.parse(process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_VERSION_MAP || '{}')[
                    window.location.host
                ];

                await client.user.connect.googleApi({
                    userId: 'me',
                    code: data.code,
                    callbackVersion,
                });
                loadingEnd();
                move(connectPageIndex.CHECK_MIGRATION);
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
                    console.error(err);
                }
            }
        },
        scope: 'profile email https://www.googleapis.com/auth/calendar',
        flow: 'auth-code',
    });

    return (
        <SlideBox.Page pos={page}>
            <ConnectBlockBase>
                <YoutubeEmbed url={'https://www.youtube.com/embed/hdu19m0xMr4?autoplay=1&loop=1'} />
                <BlockHeader title="먼저 구글 캘린더에 로그인할게요." text="반드시 구글 캘린더 권한을 체크해주세요!" />
                <GoogleLoginButton onClick={() => googleLogin()}>구글로 계속하기</GoogleLoginButton>
            </ConnectBlockBase>
        </SlideBox.Page>
    );
}
