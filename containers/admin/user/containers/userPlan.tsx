import { A, Box, Button, Flex, Select, TextField } from 'opize-design-system';
import { useAdminUser } from '../hooks/useAdminUser';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { client } from '../../../../lib/client';
import { toast } from 'react-toastify';

type PlanUpgradeForm = {
    userId: number;
    months: string;
    paymentKind: string;
    plan: string;
    priceKind: string;
    price: string;
    memo?: string;
};

export function AdminUserPlanContainer() {
    const { adminUser, refetchAdminUser } = useAdminUser();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<PlanUpgradeForm>({
        defaultValues: {
            plan: 'PRO',
        },
    });

    const { mutate } = useMutation(
        (data: PlanUpgradeForm) =>
            client.admin.user.plan.upgrade({
                userId: adminUser?.user.id || -1,
                months: data.months,
                paymentKind: data.paymentKind,
                plan: data.plan as any,
                price: +data.price,
                priceKind: data.priceKind,
                memo: data.memo,
            }),
        {
            onSuccess: () => {
                toast.info(`${adminUser?.user.name}님의 플랜 업그레이드를 완료했어요.`);
                refetchAdminUser();
            },
            onError(err: any) {
                toast.error(err?.message || '플랜 업그레이드를 실패했어요.');
            },
        }
    );

    const onSubmit = async (data: PlanUpgradeForm) => {
        if (!adminUser) {
            toast.info('유저를 먼저 조회해주세요');
            return;
        }
        mutate(data);
    };

    if (!adminUser) return <></>;

    return (
        <form onSubmit={handleSubmit(onSubmit)} id="user-planUpgrade">
            <Box
                title={`${adminUser.user.name} 유저 플랜 업그레이드`}
                footer={
                    <>
                        <p />
                        <Button variant="contained" type="submit">
                            적용
                        </Button>
                    </>
                }
            >
                <Flex.Column gap="4px" id="플랜 업그레이드">
                    <Select label="plan" {...register('plan')}>
                        <Select.Option value="FREE">free</Select.Option>
                        <Select.Option value="PRO">pro</Select.Option>
                    </Select>
                    <TextField
                        label="months"
                        {...register('months', {
                            required: '필수 항목이에요.',
                        })}
                        defaultValue="12"
                        error={errors.months?.message}
                    ></TextField>
                    <TextField
                        label="price"
                        {...register('price', {
                            required: '필수 항목이에요.',
                        })}
                        defaultValue="24000"
                        error={errors.price?.message}
                    ></TextField>
                    <TextField
                        label="priceKind"
                        {...register('priceKind', {
                            required: '필수 항목이에요.',
                        })}
                        defaultValue="KRW"
                        error={errors.priceKind?.message}
                    ></TextField>
                    <Select label="paymentKind" {...register('paymentKind')}>
                        <Select.Option value="kakaopay">카카오페이</Select.Option>
                        <Select.Option value="bankTransfer">계좌이체</Select.Option>
                        <Select.Option value="other">기타</Select.Option>
                    </Select>
                    <TextField label="memo" {...register('memo')}></TextField>
                </Flex.Column>
            </Box>
        </form>
    );
}
