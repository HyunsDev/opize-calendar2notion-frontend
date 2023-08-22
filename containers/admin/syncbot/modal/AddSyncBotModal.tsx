import { useForm } from 'react-hook-form';
import { client } from '../../../../lib/client';
import { APIResponseError } from 'endpoint-client';
import { toast } from 'react-toastify';
import { Button, Flex, Input, Modal, useModal } from 'opize-design-system';
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
            <Modal>
                <Modal.Header>동기화봇 추가</Modal.Header>
                <Modal.Content>
                    <Flex.Column gap="16px">
                        <Input
                            label="prefix"
                            error={errors.prefix?.message}
                            {...register('prefix', {
                                required: '필수 항목입니다.',
                            })}
                        />
                        <Input
                            label="이름"
                            error={errors.name?.message}
                            {...register('name', {
                                required: '필수 항목입니다.',
                            })}
                        />
                        <Input
                            label="url"
                            error={errors.url?.message}
                            {...register('url', {
                                required: '필수 항목입니다.',
                            })}
                        />
                        <Input
                            label="controlSecret"
                            error={errors.controlSecret?.message}
                            {...register('controlSecret', {
                                required: '필수 항목입니다.',
                            })}
                        />
                    </Flex.Column>
                </Modal.Content>
                <Modal.Footer>
                    <Button onClick={() => modal.close()}>취소</Button>
                    <Button type="submit">생성</Button>
                </Modal.Footer>
            </Modal>
        </form>
    );
}
