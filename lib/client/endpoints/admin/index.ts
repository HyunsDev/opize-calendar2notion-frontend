import { Endpoint } from '../../types/endpoint';

// GET /admin/find-user
export type getAdminFindUserParameter = {
    email?: string;
    googleEmail?: string;
    id?: number;
    opizeId?: number;
};
export const getAdminFindUser: Endpoint<getAdminFindUserParameter> = {
    method: 'get',
    path: (e) => `/admin/find-user`,
    bodyParams: [],
    pathParams: [],
    queryParams: ['email', 'googleEmail', 'id', 'opizeId'],
};
export type getAdminFindUserResponse = any;

// GET /admin/working-users
export type getAdminWorkingUsersParameter = {};
export const getAdminWorkingUsers: Endpoint<getAdminWorkingUsersParameter> = {
    method: 'get',
    path: () => '/admin/working-users',
    bodyParams: [],
    pathParams: [],
    queryParams: [],
};
export type getAdminWorkingUsersResponse = any[];

// Get /admin/user/:userId
export type getAdminUserParameter = {
    userId: number;
};
export const getAdminUser: Endpoint<getAdminUserParameter> = {
    method: 'get',
    path: (e) => `/admin/user/${e.userId}`,
    bodyParams: [],
    pathParams: ['userId'],
    queryParams: [],
};
export type getAdminUserResponse = {
    user: {
        [key: string]: any;
    };
    calendars: any[];
    paymentLogs: any[];
};

// DELETE /admin/user/:userId
export type deleteAdminUserParameter = {
    userId: number;
};
export const deleteAdminUser: Endpoint<deleteAdminUserParameter> = {
    method: 'delete',
    path: (e) => `/admin/user/${e.userId}`,
    bodyParams: [],
    pathParams: ['userId'],
    queryParams: [],
};
export type deleteAdminUserResponse = {};

// Patch /admin/user/:userId
export type patchAdminUserParameter = {
    userId: number;
    name?: string;
    email?: string;
    imageUrl?: string;
    opizeId?: number;
    opizeAccessToken?: string;
    googleId?: string;
    googleAccessToken?: string;
    googleEmail?: string;
    googleRefreshToken?: string;
    notionAccessToken?: string;
    notionBotId?: string;
    notionDatabaseId?: string;
    lastCalendarSync?: string;
    lastSyncStatus?: string;
    status?: 'FIRST' | 'GOOGLE_SET' | 'NOTION_API_SET' | 'NOTION_SET' | 'FINISHED';
    isConnected?: boolean;
    userPlan?: 'FREE' | 'PRO';
    userTimeZone?: string;
    notionProps?: string;
    isWork?: boolean;
};
export const patchAdminUser: Endpoint<patchAdminUserParameter> = {
    method: 'patch',
    path: (e) => `/admin/user/${e.userId}`,
    bodyParams: [
        'email',
        'googleAccessToken',
        'googleEmail',
        'googleId',
        'googleRefreshToken',
        'imageUrl',
        'isConnected',
        'isWork',
        'lastCalendarSync',
        'lastSyncStatus',
        'name',
        'notionAccessToken',
        'notionBotId',
        'notionDatabaseId',
        'notionProps',
        'opizeAccessToken',
        'opizeId',
        'status',
        'userId',
        'userPlan',
        'userTimeZone',
    ],
    pathParams: ['userId'],
    queryParams: [],
};
export type patchAdminUserResponse = any;

// POST /admin/user/:userId/plan
export type postAdminUserPlanUpdateParameter = {
    userId: number;
    plan: 'FREE' | 'PRO';
    months: string;
    price: number;
    priceKind: string;
    paymentKind: string;
    memo?: string;
};
export const postAdminUserPlanUpdate: Endpoint<postAdminUserPlanUpdateParameter> = {
    method: 'post',
    path: (e) => `/admin/user/${e.userId}/plan`,
    bodyParams: ['memo', 'months', 'paymentKind', 'plan', 'price', 'priceKind'],
    pathParams: ['userId'],
    queryParams: [],
};
export type postAdminUserPlanUpdateResponse = {};

// GET /admin/statistics
export type getAdminStatisticsParameter = {};
export const getAdminStatistics: Endpoint<getAdminStatisticsParameter> = {
    method: 'get',
    path: () => '/admin/statistics',
    bodyParams: [],
    pathParams: [],
    queryParams: [],
};
export type getAdminStatisticsResponse = {
    user: {
        all: number;
        plan: {
            free: number;
            pro: number;
        };
        connect: {
            connected: number;
            disconnected: number;
        };
    };
    calendar: number;
    money: number;
};
