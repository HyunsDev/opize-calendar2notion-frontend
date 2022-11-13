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
    userPlan: 'FREE' | 'PRO';
    userTimeZone: string;
    notionProps?: {
        title?: string;
        date?: string;
        description?: string;
        delete?: string;
        location?: string;
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
