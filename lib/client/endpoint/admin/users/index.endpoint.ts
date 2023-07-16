import { Endpoint } from 'endpoint-client';
import { UserDto } from '../../../dto';

// GET /admin/users/search
export type GetAdminFindUserParameter = {
    email?: string;
    googleEmail?: string;
    id?: number;
    opizeId?: number;
};
export type GetAdminFindUserResponse = {
    // TODO: #45 Admin Endpoint 타입 재정의 필요
    user: UserDto & Record<string, any>;
};
export const getAdminFindUser: Endpoint<GetAdminFindUserParameter, GetAdminFindUserResponse> = {
    method: 'GET',
    path: (e) => `/admin/users/search`,
    bodyParams: [],
    pathParams: [],
    queryParams: ['email', 'googleEmail', 'id', 'opizeId'],
};

// GET /admin/users/:userId
export type GetAdminUserParameter = {
    userId: number;
};
export type GetAdminUserResponse = {
    user: UserDto;
};
export const getAdminUser: Endpoint<GetAdminUserParameter, GetAdminUserResponse> = {
    method: 'GET',
    path: (e) => `/admin/users/${e.userId}`,
    bodyParams: [],
    pathParams: ['userId'],
    queryParams: [],
};

// DELETE /admin/users/:userId
export type GeleteAdminUserParameter = {
    userId: number;
};
export type GeleteAdminUserResponse = {};
export const deleteAdminUser: Endpoint<GeleteAdminUserParameter, GeleteAdminUserResponse> = {
    method: 'DELETE',
    path: (e) => `/admin/users/${e.userId}`,
    bodyParams: [],
    pathParams: ['userId'],
    queryParams: [],
};

// PATCH /admin/users/:userId
export type PatchAdminUserParameter = {
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
export type PatchAdminUserResponse = {};
export const patchAdminUser: Endpoint<PatchAdminUserParameter, PatchAdminUserResponse> = {
    method: 'PATCH',
    path: (e) => `/admin/users/${e.userId}`,
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

// GET /admin/users
export type GetAdminFindUsersWhere = {
    status?: 'FIRST' | 'GOOGLE_SET' | 'NOTION_API_SET' | 'NOTION_SET' | 'FINISHED';
    isConnected?: boolean;
    userPlan?: 'FREE' | 'PRO' | 'SPONSOR';
    isWork?: boolean;
    isAdmin?: boolean;
};
export type GetAdminFindUsersParameter = {
    page: number;
    where: GetAdminFindUsersWhere;
};
export type GetAdminFindUsersResponse = {
    page: number;
    users: UserDto[];
};
export const getAdminFindUsers: Endpoint<GetAdminFindUsersParameter, GetAdminFindUsersResponse> = {
    method: 'GET',
    path: '/admin/users',
    queryParams: ['page', 'where'],
};

// GET /admin/users/expiration-users
export type GetAdminFindExpirationUsersParameter = {};
export type GetAdminFindExpirationUsersResponse = {
    users: UserDto[];
};
export const getAdminFindExpirationUsers: Endpoint<
    GetAdminFindExpirationUsersParameter,
    GetAdminFindExpirationUsersResponse
> = {
    method: 'GET',
    path: '/admin/users/expiration-users',
    queryParams: [],
};
