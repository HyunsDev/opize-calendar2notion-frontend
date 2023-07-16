import { Endpoint } from '../../types/endpoint';

// POST /user
export type postUserParameters = {
    token: string;
};
export const postUser: Endpoint<postUserParameters> = {
    method: 'post',
    path: () => `/user`,
    bodyParams: ['token'],
    pathParams: [],
    queryParams: [],
};
export type postUserResponse = {
    token: string;
};

// GET /user
export type getUserParameters = {
    userId: 'me' | number;
};
export const getUser: Endpoint<getUserParameters> = {
    method: 'get',
    path: (e) => `/user/${e.userId}`,
    bodyParams: [],
    pathParams: ['userId'],
    queryParams: [],
};
export type getUserResponse = {
    id: number;
    name: string;
    email: string;
    imageUrl: string;
    opizeId: number;
    googleEmail: string;
    notionDatabaseId: string;
    lastCalendarSync: string;
    lastSyncStatus: string;
    status: 'FIRST' | 'GOOGLE_SET' | 'NOTION_API_SET' | 'NOTION_SET' | 'FINISHED';
    isConnected: boolean;
    userPlan: 'FREE' | 'PRO' | 'SPONSOR';
    userTimeZone: string;
    notionProps?: {
        title?: string;
        date?: string;
        delete?: string;
        calendar?: string;
    };
    isWork: boolean;
    isAdmin: boolean;
    createdAt: string;
    calendars: {
        id: number;
        googleCalendarId: string;
        googleCalendarName: string;
        status: 'DISCONNECTED' | 'CONNECTED';
        accessRole: 'none' | 'freeBusyReader' | 'reader' | 'writer' | 'owner';
        notionPropertyId: string;
        createdAt: string;
    }[];
    allCalendars: {
        id: string;
        summary: string;
        primary: boolean;
        accessRole: 'none' | 'freeBusyReader' | 'reader' | 'writer' | 'owner';
        backgroundColor: string;
        foregroundColor: string;
    }[];
};

// PATCH /user/:userId
export type patchUserParameters = {
    userId?: 'me' | number;
    name?: string;
    imageUrl?: string;
    isConnected?: boolean;
    userTimeZone?: string;
};
export const patchUser: Endpoint<patchUserParameters> = {
    method: 'patch',
    path: (e) => `/user/${e.userId}`,
    bodyParams: ['imageUrl', 'isConnected', 'name', 'userTimeZone'],
    pathParams: ['userId'],
    queryParams: [],
};
export type patchUserResponse = {};

// DELETE /user/:userId
export type deleteUserParameters = {
    userId?: 'me' | number;
};
export type deleteUserResponse = {};
export const deleteUser: Endpoint<deleteUserParameters> = {
    method: 'delete',
    path: (e) => `/user/${e.userId}`,
    bodyParams: [],
    pathParams: ['userId'],
    queryParams: [],
};

// POST /user/:userId/reset
export type resetUserParameters = {
    userId?: 'me' | number;
};
export type resetUserResponse = {};
export const resetUser: Endpoint<resetUserParameters> = {
    method: 'post',
    path: (e) => `/user/${e.userId}/reset`,
    bodyParams: [],
    pathParams: ['userId'],
    queryParams: [],
};
