import { Endpoint } from 'endpoint-client';
import { UserDto } from '../../../dto';

// GET /admin/users/search
export type getAdminFindUserParameter = {
    email?: string;
    googleEmail?: string;
    id?: number;
    opizeId?: number;
};
export const getAdminFindUser: Endpoint<getAdminFindUserParameter, getAdminFindUserResponse> = {
    method: 'GET',
    path: (e) => `/admin/users/search`,
    bodyParams: [],
    pathParams: [],
    queryParams: ['email', 'googleEmail', 'id', 'opizeId'],
};
export type getAdminFindUserResponse = {
    user: UserDto;
};

// Get /admin/users/:userId
export type getAdminUserParameter = {
    userId: number;
};
export const getAdminUser: Endpoint<getAdminUserParameter, getAdminUserResponse> = {
    method: 'GET',
    path: (e) => `/admin/users/${e.userId}`,
    bodyParams: [],
    pathParams: ['userId'],
    queryParams: [],
};
export type getAdminUserResponse = {
    user: UserDto;
};

// DELETE /admin/users/:userId
export type deleteAdminUserParameter = {
    userId: number;
};
export const deleteAdminUser: Endpoint<deleteAdminUserParameter, deleteAdminUserResponse> = {
    method: 'DELETE',
    path: (e) => `/admin/users/${e.userId}`,
    bodyParams: [],
    pathParams: ['userId'],
    queryParams: [],
};
export type deleteAdminUserResponse = {};

// PATCH /admin/users/:userId
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
export type patchAdminUserResponse = {};

// GET /admin/users
export type getAdminFindUsersWhere = {
    status?: 'FIRST' | 'GOOGLE_SET' | 'NOTION_API_SET' | 'NOTION_SET' | 'FINISHED';
    isConnected?: boolean;
    userPlan?: 'FREE' | 'PRO' | 'SPONSOR';
    isWork?: boolean;
    isAdmin?: boolean;
};
export type getAdminFindUsersParameter = {
    page: number;
    where: getAdminFindUsersWhere;
};
export type getAdminFindUsersResponse = {
    page: number;
    users: UserDto[];
};
export const getAdminFindUsers: Endpoint<getAdminFindUsersParameter, getAdminFindUsersResponse> = {
    method: 'GET',
    path: '/admin/users',
    queryParams: ['page', 'where'],
};
