import { OpizeWrapper } from 'opize-design-system';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Flip, ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';

import 'opize-design-system/dist/style/font.css';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <OpizeWrapper>
            <QueryClientProvider client={queryClient}>
                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
                    <Component {...pageProps} />
                </GoogleOAuthProvider>
                <ReactQueryDevtools initialIsOpen={true} />
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    draggable
                    transition={Flip}
                />
            </QueryClientProvider>
        </OpizeWrapper>
    );
}

export default MyApp;
