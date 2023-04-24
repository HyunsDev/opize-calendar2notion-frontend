import { Endpoint } from 'endpoint-client';
import { CalendarObject, PaymentLogObject, UserObject } from '../object';

// GET /admin/find-user
export type getAdminFindUserParameter = {
    email?: string;
    googleEmail?: string;
    id?: number;
    opizeId?: number;
};
export const getAdminFindUser: Endpoint<getAdminFindUserParameter, getAdminFindUserResponse> = {
    method: 'GET',
    path: (e) => `/admin/find-user`,
    bodyParams: [],
    pathParams: [],
    queryParams: ['email', 'googleEmail', 'id', 'opizeId'],
};
export type getAdminFindUserResponse = {
    user: UserObject;
    calendar: CalendarObject;
    paymentLogs: PaymentLogObject[];
};

// GET /admin/working-users
export type getAdminWorkingUsersParameter = {};
export const getAdminWorkingUsers: Endpoint<getAdminWorkingUsersParameter, getAdminWorkingUsersResponse> = {
    method: 'GET',
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
export const getAdminUser: Endpoint<getAdminUserParameter, getAdminUserResponse> = {
    method: 'GET',
    path: (e) => `/admin/user/${e.userId}`,
    bodyParams: [],
    pathParams: ['userId'],
    queryParams: [],
};
export type getAdminUserResponse = {
    user: UserObject;
    calendars: any[];
    paymentLogs: any[];
};

// DELETE /admin/user/:userId
export type deleteAdminUserParameter = {
    userId: number;
};
export const deleteAdminUser: Endpoint<deleteAdminUserParameter, deleteAdminUserResponse> = {
    method: 'DELETE',
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
export const patchAdminUser: Endpoint<patchAdminUserParameter, patchAdminUserResponse> = {
    method: 'PATCH',
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
export const postAdminUserPlanUpdate: Endpoint<postAdminUserPlanUpdateParameter, postAdminUserPlanUpdateResponse> = {
    method: 'POST',
    path: (e) => `/admin/user/${e.userId}/plan`,
    bodyParams: ['memo', 'months', 'paymentKind', 'plan', 'price', 'priceKind'],
    pathParams: ['userId'],
    queryParams: [],
};
export type postAdminUserPlanUpdateResponse = {};

// GET /admin/statistics
export type getAdminStatisticsParameter = {};
export const getAdminStatistics: Endpoint<getAdminStatisticsParameter, getAdminStatisticsResponse> = {
    method: 'GET',
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

// GET /admin/errors
export type getAdminErrorsParameter = {
    page: number;
    pageSize: number;
    userId?: number;
};
export const getAdminErrors: Endpoint<getAdminErrorsParameter, getAdminErrorsResponse> = {
    method: 'GET',
    path: () => `/admin/errors`,
    bodyParams: [],
    pathParams: [],
    queryParams: ['page', 'pageSize', 'userId'],
};
export type getAdminErrorsResponse = {
    id: number;
    code: string;
    from: 'GOOGLE CALENDAR' | 'NOTION' | 'SYNCBOT' | 'COMPLEX' | 'UNKNOWN';
    description: string;
    detail?: string;
    stack?: string;
    showUser: boolean;
    guideUrl?: string;
    knownError?: any;
    level: 'NOTICE' | 'WARN' | 'ERROR' | 'CRIT' | 'EMERGENCY';
    archive: boolean;
    finishWork: 'STOP' | 'RETRY';
    createdAt: Date;
    updatedAt: Date;
    user: UserObject;
}[];

// DELETE /admin/error/:errorId
export type deleteAdminErrorParameter = {
    errorId: number;
};
export const deleteAdminError: Endpoint<deleteAdminErrorParameter, deleteAdminErrorResponse> = {
    method: 'DELETE',
    path: (e) => `/admin/error/${e.errorId}`,
    bodyParams: [],
    pathParams: ['errorId'],
    queryParams: [],
};
export type deleteAdminErrorResponse = {};

// POST /admin/find-users
export type postAdminFindUsersWhere = {
    status?: 'FIRST' | 'GOOGLE_SET' | 'NOTION_API_SET' | 'NOTION_SET' | 'FINISHED';
    isConnected?: boolean;
    userPlan?: 'FREE' | 'PRO' | 'SPONSOR';
    isWork?: boolean;
    isAdmin?: boolean;
};
export type postAdminFindUsersParameter = {
    page: number;
    where: postAdminFindUsersWhere;
};
export type postAdminFindUsersResponse = {
    page: number;
    users: UserObject[];
};
export const postAdminFindUsers: Endpoint<postAdminFindUsersParameter, postAdminFindUsersResponse> = {
    method: 'POST',
    path: '/admin/find-users',
    bodyParams: ['page', 'where'],
};

// POST /admin/users/:userId/event
export type postAdminUserEventParameter = {
    userId?: number;
    eventLinkId?: number;
    googleCalendarEventId?: string;
    notionPageId?: string;
};
export type postAdminUserEventResponse = {
    eventLink: any;
    googleCalendarEvent: any;
    notionPage: any;
};
export const postAdminUserEvent: Endpoint<postAdminUserEventParameter, postAdminUserEventResponse> = {
    method: 'POST',
    path: (e) => `/admin/users/${e.userId}/event`,
    bodyParams: ['eventLinkId', 'googleCalendarEventId', 'notionPageId'],
    pathParams: ['userId'],
    queryParams: [],
};
