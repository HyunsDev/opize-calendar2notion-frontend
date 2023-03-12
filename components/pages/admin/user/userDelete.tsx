import { Box, Button, useDialog, useModal } from 'opize-design-system';
import { Warning } from 'phosphor-react';
import { toast } from 'react-toastify';
import { client } from '../../../../lib/client';
import { getAdminFindUserResponse } from '../../../../lib/client/endpoint';
import { UserObject } from '../../../../lib/client/object';

export function AdminUserDelete({ user, fetchUser }: { user: getAdminFindUserResponse; fetchUser: () => void }) {
    const dialog = useDialog();

    const deleteUser = async () => {
        if (!user?.user) {
            toast.info('유저를 먼저 선택해주세요');
            return;
        }
        try {
            await client.admin.deleteUser({ userId: user.user.id });
            await fetchUser();
            toast.info('유저를 성공적으로 삭제했어요.');
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    const onClick = () => {
        if (!user?.user) {
            toast.info('유저를 먼저 선택해주세요');
            return;
        }
        dialog({
            title: '정말로 유저를 삭제하시겠어요?',
            content: '이 작업은 되돌릴 수 없어요.',
            icon: <Warning size={32} />,
            buttons: [
                {
                    onClick: () => deleteUser(),
                    variant: 'contained',
                    children: '유저 삭제',
                    color: 'red',
                },
            ],
        });
    };

    return (
        <Box title="유저 삭제">
            <Button variant="text" color="red" onClick={onClick}>
                유저 삭제
            </Button>
        </Box>
    );
}
