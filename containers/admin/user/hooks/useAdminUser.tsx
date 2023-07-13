import { useQuery } from 'react-query';
import { client } from '../../../../lib/client';
import { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import { AdminUserSearchState } from '../state/adminUser.state';
import { toast } from 'react-toastify';

let flag = false;
export function useAdminUser() {
    const [adminUserSearch] = useRecoilState(AdminUserSearchState);

    const {
        data: adminUser,
        refetch,
        isLoading: isAdminUserLoading,
    } = useQuery(
        [
            'admin',
            'user',
            {
                [adminUserSearch.select]: adminUserSearch.text,
            },
        ],
        () =>
            client.admin.user.findOne({
                [adminUserSearch.select]: adminUserSearch.text,
            }),
        {
            onError: (err: any) => {
                if (flag) return;

                setTimeout(() => {
                    console.error(err);
                    if (err.code === 404) {
                        toast.warn(err?.message || '유저를 조회할 수 없습니다.');
                    } else {
                        toast.error(err?.message || '유저를 조회할 수 없습니다.');
                    }
                    flag = false;
                }, 0);
                flag = true;
            },
            enabled: false,
            retry: false,
        }
    );

    const refetchAdminUser = useCallback(() => {
        refetch();
    }, [refetch]);

    return {
        adminUser,
        refetchAdminUser,
        isAdminUserLoading,
    };
}
