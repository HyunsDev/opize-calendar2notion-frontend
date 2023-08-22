import { useState } from 'react';
import { client } from '../../../../lib/client';
import { toast } from 'react-toastify';
import { APIResponseError } from '../../../../lib/old-client';
import { Button, Flex, Switch } from 'opize-design-system';

export function ModalUserUpdate({
    userId,
    initValue,
    refresh,
    close,
}: {
    userId: number;
    initValue: any;
    refresh: () => void;
    close: () => void;
}) {
    const [value, setValue] = useState(initValue);

    const apply = async () => {
        try {
            await client.admin.user.patch({
                userId,
                isConnected: value,
            });
            refresh();
            toast.info('적용 완료');
            close();
        } catch (err: any) {
            if (err instanceof APIResponseError) {
                console.error(err);
                toast.error(err.body.message);
            } else {
                console.error(err);
                toast.error(err.message);
            }
        }
    };

    return (
        <Flex.Column gap="8px">
            <Switch checked={value} onChange={() => setValue(!value)} />
            <Button onClick={() => apply()} variant="primary">
                적용
            </Button>
        </Flex.Column>
    );
}
