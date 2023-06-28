import { Endpoint } from 'endpoint-client';
import { CalendarDto, PaymentLogDto, UserDto } from '../../../dto';

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
