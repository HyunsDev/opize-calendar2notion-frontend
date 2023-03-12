import { CalendarObject, GoogleCalendarObject } from './calendar.object';
import { ErrorLogObject } from './errorLog.object';

export type UserObject = {
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
        description?: string;
        delete?: string;
        location?: string;
        calendar?: string;
    };
    isWork: boolean;
    isAdmin: boolean;
    createdAt: string;
    calendars: CalendarObject[];
    googleCalendars: GoogleCalendarObject[];
    errorLogs?: ErrorLogObject[];
};
