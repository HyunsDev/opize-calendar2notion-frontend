import React, { useState } from 'react';
import { Flex, Button, Link as A, TextField, Box, Select } from 'opize-design-system';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { client } from '../../../../lib/client';

type PlanUpgradeForm = {
    months: string;
    paymentKind: string;
    plan: string;
    priceKind: string;
    price: string;
    memo?: string;
};
export function AdminUserPlanUpgrade({ userId, fetchUser }: { userId: number; fetchUser: () => void }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<PlanUpgradeForm>({
        defaultValues: {
            plan: 'PRO',
        },
    });

    const onSubmit = async (data: PlanUpgradeForm) => {
        if (!userId) {
            toast.info('유저를 먼저 조회해주세요');
            return;
        }

        try {
            await client.admin.userPlanUpdate({
                userId: userId,
                months: data.months,
                paymentKind: data.paymentKind,
                plan: data.plan as any,
                price: +data.price,
                priceKind: data.priceKind,
                memo: data.memo,
            });
            await fetchUser();
            toast.info('플랜 업그레이드가 완료되었어요.');
        } catch (err: any) {
            toast.error(err.message || '');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box
                title={userId ? `${userId} 유저 플랜 업그레이드` : '유저를 먼저 조회해주세요'}
                footer={
                    <>
                        <A>자세히 알아보기</A>
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
