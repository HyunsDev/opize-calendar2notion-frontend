import { Endpoint } from 'endpoint-client';
import { CalendarDto, GoogleCalendarDto, PaymentLogDto, UserDto } from '../../dto';

// POST /user
export type postUserParameters = {
    token: string;
    redirectUrl: string;
};
export const postUser: Endpoint<postUserParameters, postUserResponse> = {
    method: 'POST',
    path: () => `/users`,
    bodyParams: ['token', 'redirectUrl'],
    pathParams: [],
    queryParams: [],
};
export type postUserResponse = {
    token: string;
};

// GET /user/:userId
export type getUserParameters = {
    userId: 'me' | number;
};
export const getUser: Endpoint<getUserParameters, getUserResponse> = {
    method: 'GET',
    path: (e) => `/users/${e.userId}`,
    bodyParams: [],
    pathParams: ['userId'],
    queryParams: [],
};
export type getUserResponse = UserDto & {
    calendars: CalendarDto[];
    googleCalendars: GoogleCalendarDto[];
    paymentLogs: PaymentLogDto[];
};

// PATCH /user/:userId
export type patchUserParameters = {
    userId?: 'me' | number;
    name?: string;
    imageUrl?: string;
    isConnected?: boolean;
    userTimeZone?: string;
    isWork?: boolean;
};
export const patchUser: Endpoint<patchUserParameters, patchUserResponse> = {
    method: 'PATCH',
    path: (e) => `/users/${e.userId}`,
    bodyParams: ['imageUrl', 'isConnected', 'name', 'userTimeZone', 'isWork'],
    pathParams: ['userId'],
    queryParams: [],
};
export type patchUserResponse = {};

// DELETE /user/:userId
export type deleteUserParameters = {
    userId?: 'me' | number;
};
export type deleteUserResponse = {
    success: false;
    message: string;
};
export const deleteUser: Endpoint<deleteUserParameters, deleteUserResponse> = {
    method: 'DELETE',
    path: (e) => `/users/${e.userId}`,
    bodyParams: [],
    pathParams: ['userId'],
    queryParams: [],
};

// POST /user/:userId/reset
export type resetUserParameters = {
    userId?: 'me' | number;
};
export type resetUserResponse =
    | {
          success: true;
      }
    | {
          success: false;
          message: string;
      };
export const resetUser: Endpoint<resetUserParameters, resetUserResponse> = {
    method: 'POST',
    path: (e) => `/users/${e.userId}/reset`,
    bodyParams: [],
    pathParams: ['userId'],
    queryParams: [],
};
