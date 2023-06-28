import { Endpoint } from 'endpoint-client';
import { CalendarDto, PaymentLogDto, UserDto } from '../../../dto';

// POST /admin/users/:userId/plan
export type postAdminUserPlanUpdateParameter = {
    userId: number;
    plan: 'FREE' | 'PRO';
    months: string;
    price: number;
    priceKind: string;
    paymentKind: string;
    memo?: string;
};
export const postAdminUserPlanUpdate: Endpoint<postAdminUserPlanUpdateParameter, postAdminUserPlanUpdateResponse> = {
    method: 'POST',
    path: (e) => `/admin/users/${e.userId}/plan`,
    bodyParams: ['memo', 'months', 'paymentKind', 'plan', 'price', 'priceKind'],
    pathParams: ['userId'],
    queryParams: [],
};
export type postAdminUserPlanUpdateResponse = {};
