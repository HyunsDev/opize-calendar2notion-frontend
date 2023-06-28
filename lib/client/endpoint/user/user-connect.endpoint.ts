import { Endpoint } from 'endpoint-client';

// POST /user/:userId/connect/google-api
export type PostConnectGoogleAPIParameters = {
    userId: 'me' | number;
    code: string;
    callbackVersion: number;
};
export type PostConnectGoogleAPIResponse = {};
export const postConnectGoogleAPI: Endpoint<PostConnectGoogleAPIParameters, PostConnectGoogleAPIResponse> = {
    method: 'POST',
    path: (e) => `/users/${e.userId}/connect/google-api`,
    bodyParams: ['code', 'callbackVersion'],
    pathParams: ['userId'],
    queryParams: [],
};

// POST /user/:userId/connect/notion-api
export type PostConnectNotionAPIParameters = {
    userId: 'me' | number;
    code: string;
    redirectUrl: string;
};
export type PostConnectNotionAPIResponse = {};
export const postConnectNotionAPI: Endpoint<PostConnectNotionAPIParameters, PostConnectNotionAPIResponse> = {
    method: 'POST',
    path: (e) => `/users/${e.userId}/connect/notion-api`,
    bodyParams: ['code', 'redirectUrl'],
    pathParams: ['userId'],
    queryParams: [],
};

// GET /user/:userId/connect/notion-database
export type GetConnectNotionDatabasesParameters = {
    userId: 'me' | number;
};
export type GetConnectNotionDatabasesResponse = any;
export const getConnectNotionDatabases: Endpoint<
    GetConnectNotionDatabasesParameters,
    GetConnectNotionDatabasesResponse
> = {
    method: 'GET',
    path: (e) => `/users/${e.userId}/connect/notion-database`,
    bodyParams: [],
    pathParams: ['userId'],
    queryParams: [],
};

// POST /user/:userId/connect/notion-database
export type PostConnectNotionDatabaseParameters = {
    userId: 'me' | number;
    id: string;
};
export type PostConnectNotionDatabaseResponse = {};

export const postConnectNotionDatabase: Endpoint<
    PostConnectNotionDatabaseParameters,
    PostConnectNotionDatabaseResponse
> = {
    method: 'POST',
    path: (e) => `/users/${e.userId}/connect/notion-database`,
    bodyParams: ['id'],
    pathParams: ['userId'],
    queryParams: [],
};
