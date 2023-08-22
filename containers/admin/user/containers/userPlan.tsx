import { Box, Button, Flex, Select, Input } from 'opize-design-system';
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
                        <Button variant="primary" type="submit">
                            적용
                        </Button>
                    </>
                }
            >
                <Flex.Column gap="4px" id="플랜 업그레이드">
                    <Select label="plan" {...register('plan')}>
                        <option value="FREE">free</option>
                        <option value="PRO">pro</option>
                    </Select>
                    <Input
                        label="months"
                        {...register('months', {
                            required: '필수 항목이에요.',
                        })}
                        defaultValue="12"
                        error={errors.months?.message}
                    ></Input>
                    <Input
                        label="price"
                        {...register('price', {
                            required: '필수 항목이에요.',
                        })}
                        defaultValue="24000"
                        error={errors.price?.message}
                    ></Input>
                    <Input
                        label="priceKind"
                        {...register('priceKind', {
                            required: '필수 항목이에요.',
                        })}
                        defaultValue="KRW"
                        error={errors.priceKind?.message}
                    ></Input>
                    <Select label="paymentKind" {...register('paymentKind')}>
                        <option value="kakaopay">카카오페이</option>
                        <option value="bankTransfer">계좌이체</option>
                        <option value="other">기타</option>
                    </Select>
                    <Input label="memo" {...register('memo')}></Input>
                </Flex.Column>
            </Box>
        </form>
    );
}
