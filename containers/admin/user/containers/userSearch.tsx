import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { Button, Flex, Select, Input } from 'opize-design-system';
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
            setTimeout(() => {
                refetchAdminUser();
            }, 0);
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
            <Select onChange={(e) => setSelect(e.target.value)} value={adminUserSearch.select} width="120px">
                <option value="id">id</option>
                <option value="opizeId">opizeId</option>
                <option value="email">email</option>
                <option value="googleEmail">googleEmail</option>
            </Select>
            <Input
                placeholder={adminUserSearch.select}
                onChange={(e) => setText(e.target.value)}
                value={adminUserSearch.text}
                onKeyDown={onkeydown}
                ref={ref}
            />
            <Button variant={'primary'} width="100px" onClick={() => refetchAdminUser()} isLoading={isAdminUserLoading}>
                조회
            </Button>
        </Flex.Between>
    );
}
