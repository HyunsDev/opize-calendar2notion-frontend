import { Endpoint } from 'endpoint-client';
import { CalendarDto, PaymentLogDto, UserDto } from '../../../dto';

// POST /admin/users/:userId/event
export type PostAdminUserEventParameter = {
    userId?: number;
    eventLinkId?: number;
    googleCalendarEventId?: string;
    notionPageId?: string;
};
export type PostAdminUserEventResponse = {
    eventLink: any;
    googleCalendarEvent: any;
    notionPage: any;
};
export const postAdminUserEvent: Endpoint<PostAdminUserEventParameter, PostAdminUserEventResponse> = {
    method: 'POST',
    path: (e) => `/admin/users/${e.userId}/event`,
    bodyParams: ['eventLinkId', 'googleCalendarEventId', 'notionPageId'],
    pathParams: ['userId'],
    queryParams: [],
};
