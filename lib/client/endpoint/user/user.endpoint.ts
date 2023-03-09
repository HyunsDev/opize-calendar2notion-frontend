import { Endpoint } from 'endpoint-client';
import { UserObject } from '../../object';

// POST /user
export type postUserParameters = {
    token: string;
};
export const postUser: Endpoint<postUserParameters, postUserResponse> = {
    method: 'POST',
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
export const getUser: Endpoint<getUserParameters, getUserResponse> = {
    method: 'GET',
    path: (e) => `/user/${e.userId}`,
    bodyParams: [],
    pathParams: ['userId'],
    queryParams: [],
};
export type getUserResponse = UserObject;

// PATCH /user/:userId
export type patchUserParameters = {
    userId?: 'me' | number;
    name?: string;
    imageUrl?: string;
    isConnected?: boolean;
    userTimeZone?: string;
};
export const patchUser: Endpoint<patchUserParameters, patchUserResponse> = {
    method: 'PATCH',
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
export const deleteUser: Endpoint<deleteUserParameters, deleteUserResponse> = {
    method: 'DELETE',
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
export const resetUser: Endpoint<resetUserParameters, resetUserResponse> = {
    method: 'POST',
    path: (e) => `/user/${e.userId}/reset`,
    bodyParams: [],
    pathParams: ['userId'],
    queryParams: [],
};
