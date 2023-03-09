import { Endpoint } from '../../types/endpoint';

// POST /user/:userId/calendar
export type postUserCalendarParameter = {
    userId: 'me' | number;
    googleCalendarId: string;
};
export const postUserCalendar: Endpoint<postUserCalendarParameter> = {
    method: 'post',
    path: (e) => `/user/${e.userId}/calendar`,
    bodyParams: ['googleCalendarId'],
    pathParams: ['userId'],
    queryParams: [],
};
export type postUserCalendarResponse = {};

// DELETE /user/:userId/calendar
export type deleteUserCalendarParameter = {
    userId: 'me' | number;
    calendarId: string;
};
export const deleteUserCalendar: Endpoint<deleteUserCalendarParameter> = {
    method: 'delete',
    path: (e) => `/user/${e.userId}/calendar/${e.calendarId}`,
    bodyParams: [],
    pathParams: ['userId', 'calendarId'],
    queryParams: [],
};
export type deleteUserCalendarResponse = {
    code?: 'user_is_work';
};
