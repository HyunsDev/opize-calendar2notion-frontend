import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Button, Flex, Select, TextField } from 'opize-design-system';
import { useRecoilState } from 'recoil';
import { AdminUserSearchState } from '../state/adminUser.state';
import { useAdminUser } from '../hooks/useAdminUser';

export function AdminSearchUser() {
    const router = useRouter();
    const ref = useRef<HTMLInputElement>(null);
    const [adminUserSearch, setAdminUserSearch] = useRecoilState(AdminUserSearchState);
    const { refetchAdminUser, isAdminUserLoading } = useAdminUser();

    useEffect(() => {
        if (ref.current) ref.current.focus();
    }, []);

    useEffect(() => {
        const userId = router.query.userId as string;
        if (userId) {
            setAdminUserSearch({
                select: 'id',
                text: userId,
            });
            refetchAdminUser();
        }
    }, [refetchAdminUser, router.query.userId, setAdminUserSearch]);

    const onkeydown = async (e: React.KeyboardEvent) => {
        if (e.code === 'Enter') refetchAdminUser();
        if (e.code === 'Escape') setText('');
    };

    const setSelect = (select: string) => {
        setAdminUserSearch((prev) => ({
            ...prev,
            select,
        }));
    };

    const setText = (text: string) => {
        setAdminUserSearch((prev) => ({
            ...prev,
            text,
        }));
    };

    return (
        <Flex.Between gap="8px" id="user-search">
            <Select onChange={(e) => setSelect(e.target.value)} defaultValue={adminUserSearch.select}>
                <Select.Option value="id">id</Select.Option>
                <Select.Option value="opizeId">opizeId</Select.Option>
                <Select.Option value="email">email</Select.Option>
                <Select.Option value="googleEmail">googleEmail</Select.Option>
            </Select>
            <TextField
                placeholder={adminUserSearch.select}
                onChange={(e) => setText(e.target.value)}
                value={adminUserSearch.text}
                onKeyDown={onkeydown}
                ref={ref}
            />
            <Button
                variant={'contained'}
                width="100px"
                onClick={() => refetchAdminUser()}
                isLoading={isAdminUserLoading}
            >
                조회
            </Button>
        </Flex.Between>
    );
}
