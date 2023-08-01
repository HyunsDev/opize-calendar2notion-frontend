import { useForm } from 'react-hook-form';
import { client } from '../../../../lib/client';
import { APIResponseError } from 'endpoint-client';
import { toast } from 'react-toastify';
import { Button, Flex, TextField, useModal } from 'opize-design-system';
import { useQueryClient } from 'react-query';

type AddSyncBotForm = {
    name: string;
    url: string;
    prefix: string;
    controlSecret: string;
};
export function AddSyncBotModal() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<AddSyncBotForm>();
    const modal = useModal();
    const queryClient = useQueryClient();

    const submit = async (data: AddSyncBotForm) => {
        try {
            await client.syncbot.post(data);
            queryClient.invalidateQueries(['admin', 'syncBot']);
            close();
        } catch (err) {
            if (err instanceof APIResponseError) {
                toast.warn(err.body.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <Flex.Column gap="16px">
                <TextField
                    label="prefix"
                    error={errors.prefix?.message}
                    {...register('prefix', {
                        required: '필수 항목입니다.',
                    })}
                />
                <TextField
                    label="이름"
                    error={errors.name?.message}
                    {...register('name', {
                        required: '필수 항목입니다.',
                    })}
                />
                <TextField
                    label="url"
                    error={errors.url?.message}
                    {...register('url', {
                        required: '필수 항목입니다.',
                    })}
                />
                <TextField
                    label="controlSecret"
                    error={errors.controlSecret?.message}
                    {...register('controlSecret', {
                        required: '필수 항목입니다.',
                    })}
                />
                <Button type="submit">생성</Button>
            </Flex.Column>
        </form>
    );
}
