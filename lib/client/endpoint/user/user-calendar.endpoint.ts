import { Endpoint } from 'endpoint-client';

// POST /user/:userId/calendar
export type postUserCalendarParameter = {
    userId: 'me' | number;
    googleCalendarId: string;
};
export const postUserCalendar: Endpoint<postUserCalendarParameter, postUserCalendarResponse> = {
    method: 'POST',
    path: (e) => `/users/${e.userId}/calendar`,
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
export const deleteUserCalendar: Endpoint<deleteUserCalendarParameter, deleteUserCalendarResponse> = {
    method: 'DELETE',
    path: (e) => `/users/${e.userId}/calendar/${e.calendarId}`,
    bodyParams: [],
    pathParams: ['userId', 'calendarId'],
    queryParams: [],
};
export type deleteUserCalendarResponse = {
    code?: 'user_is_work';
};
