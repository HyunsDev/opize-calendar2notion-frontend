import { type } from 'os';
import { Endpoint } from '../../types/endpoint';

// POST /user/:userId/connect/google-api
export type postConnectGoogleAPIParameters = {
    userId: 'me' | number;
    code: string;
};
export const postConnectGoogleAPI: Endpoint<postConnectGoogleAPIParameters> = {
    method: 'post',
    path: (e) => `/user/${e.userId}/connect/google-api`,
    bodyParams: ['code'],
    pathParams: ['userId'],
    queryParams: [],
};
export type postConnectGoogleAPIResponse = {};

// POST /user/:userId/connect/notion-api
export type postConnectNotionAPIParameters = {
    userId: 'me' | number;
    code: string;
};
export const postConnectNotionAPI: Endpoint<postConnectNotionAPIParameters> = {
    method: 'post',
    path: (e) => `/user/${e.userId}/connect/notion-api`,
    bodyParams: ['code'],
    pathParams: ['userId'],
    queryParams: [],
};
export type postConnectNotionAPIResponse = {};

// GET /user/:userId/connect/notion-database
export type getConnectNotionDatabasesParameters = {
    userId: 'me' | number;
};
export const getConnectNotionDatabases: Endpoint<getConnectNotionDatabasesParameters> = {
    method: 'get',
    path: (e) => `/user/${e.userId}/connect/notion-database`,
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
export const postConnectNotionDatabase: Endpoint<postConnectNotionDatabaseParameters> = {
    method: 'post',
    path: (e) => `/user/${e.userId}/connect/notion-database`,
    bodyParams: ['id'],
    pathParams: ['userId'],
    queryParams: [],
};
export type postConnectNotionDatabaseResponse = {};
