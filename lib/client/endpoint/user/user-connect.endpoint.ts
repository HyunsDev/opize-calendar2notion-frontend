import { Endpoint } from 'endpoint-client';

// POST /user/:userId/connect/google-api
export type postConnectGoogleAPIParameters = {
    userId: 'me' | number;
    code: string;
    callbackVersion: number;
};
export const postConnectGoogleAPI: Endpoint<postConnectGoogleAPIParameters, postConnectGoogleAPIResponse> = {
    method: 'POST',
    path: (e) => `/users/${e.userId}/connect/google-api`,
    bodyParams: ['code', 'callbackVersion'],
    pathParams: ['userId'],
    queryParams: [],
};
export type postConnectGoogleAPIResponse = {};

// POST /user/:userId/connect/notion-api
export type postConnectNotionAPIParameters = {
    userId: 'me' | number;
    code: string;
};
export const postConnectNotionAPI: Endpoint<postConnectNotionAPIParameters, postConnectNotionAPIResponse> = {
    method: 'POST',
    path: (e) => `/users/${e.userId}/connect/notion-api`,
    bodyParams: ['code'],
    pathParams: ['userId'],
    queryParams: [],
};
export type postConnectNotionAPIResponse = {};

// GET /user/:userId/connect/notion-database
export type getConnectNotionDatabasesParameters = {
    userId: 'me' | number;
};
export const getConnectNotionDatabases: Endpoint<
    getConnectNotionDatabasesParameters,
    getConnectNotionDatabasesResponse
> = {
    method: 'GET',
    path: (e) => `/users/${e.userId}/connect/notion-database`,
    bodyParams: [],
    pathParams: ['userId'],
    queryParams: [],
};
export type getConnectNotionDatabasesResponse = any;

// POST /user/:userId/connect/notion-database
export type postConnectNotionDatabaseParameters = {
    userId: 'me' | number;
    id: string;
};
export const postConnectNotionDatabase: Endpoint<
    postConnectNotionDatabaseParameters,
    postConnectNotionDatabaseResponse
> = {
    method: 'POST',
    path: (e) => `/users/${e.userId}/connect/notion-database`,
    bodyParams: ['id'],
    pathParams: ['userId'],
    queryParams: [],
};
export type postConnectNotionDatabaseResponse = {};
