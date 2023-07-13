import { Endpoint } from 'endpoint-client';

// GET /admin/tools/notion-database
export type GetAdminToolsNotionDatabaseParameter = {
    userId: number;
};
export type GetAdminToolsNotionDatabaseResponse = any;
export const getAdminToolsNotionDatabase: Endpoint<
    GetAdminToolsNotionDatabaseParameter,
    GetAdminToolsNotionDatabaseResponse
> = {
    method: 'GET',
    path: () => `/admin/tools/notion-database`,
    bodyParams: [],
    pathParams: [],
    queryParams: ['userId'],
};
