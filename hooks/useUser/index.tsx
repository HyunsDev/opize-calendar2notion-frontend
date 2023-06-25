import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { client } from '../../lib/client';
import { APIResponseError } from 'endpoint-client';

export function useUser({ allowNonLogin = false }: { allowNonLogin?: boolean } = {}) {
    const {
        data: user,
        error,
        refetch,
        isLoading,
    } = useQuery(['user', 'self'], () => client.user.get({ userId: 'me' }), {
        enabled: typeof window !== 'undefined' && !!localStorage.getItem('token'),
        retry: 2,
    });
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token && !allowNonLogin) {
            toast.warn('로그인이 필요해요');
            router.push('/');
            return;
        }
    }, [allowNonLogin, router]);

    if (error && error instanceof APIResponseError) {
        if (error.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/';
        }

        return {
            user: null,
            isError: true,
            error: error,
        };
    }

    return {
        user,
        isError: false,
        error: undefined,
        refetch: refetch,
        isLoading,
    };
}
