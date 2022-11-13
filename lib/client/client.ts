import axios, { AxiosError } from 'axios';
import {
    getAdminFindUser,
    getAdminFindUserParameter,
    getAdminFindUserResponse,
    getAdminStatistics,
    getAdminStatisticsParameter,
    getAdminStatisticsResponse,
    getAdminUser,
    getAdminUserParameter,
    getAdminUserResponse,
    getAdminWorkingUsers,
    getAdminWorkingUsersParameter,
    getAdminWorkingUsersResponse,
    patchAdminUser,
    patchAdminUserParameter,
    patchAdminUserResponse,
    postAdminUserPlanUpdate,
    postAdminUserPlanUpdateParameter,
    postAdminUserPlanUpdateResponse,
    deleteAdminUser,
    deleteAdminUserParameter,
    deleteAdminUserResponse,
} from './endpoints/admin';
import {
    postUser,
    postUserParameters,
    postUserResponse,
    getUser,
    getUserParameters,
    getUserResponse,
} from './endpoints/user';
import {
    postUserCalendar,
    postUserCalendarParameter,
    postUserCalendarResponse,
    deleteUserCalendar,
    deleteUserCalendarParameter,
    deleteUserCalendarResponse,
} from './endpoints/user/calendar';
import {
    postConnectGoogleAPI,
    postConnectGoogleAPIParameters,
    postConnectGoogleAPIResponse,
    postConnectNotionAPI,
    postConnectNotionAPIParameters,
    postConnectNotionAPIResponse,
    postConnectNotionDatabase,
    postConnectNotionDatabaseParameters,
    postConnectNotionDatabaseResponse,
    getConnectNotionDatabases,
    getConnectNotionDatabasesParameters,
    getConnectNotionDatabasesResponse,
} from './endpoints/user/connect';

import {
    APIResponseError,
    buildRequestError,
    isHTTPResponseError,
    isOpizeClientError,
    RequestTimeoutError,
    UnknownHTTPResponseError,
} from './error';
import { pick } from './utils';
export { APIResponseError, isHTTPResponseError, isOpizeClientError, RequestTimeoutError, UnknownHTTPResponseError };

export interface ClientOptions {
    auth?: string;
    timeoutMs?: number;
    baseUrl?: string;
    apiVersion?: string;
}

type Method = 'get' | 'post' | 'patch' | 'delete';
type QueryParams = Record<string, any> | URLSearchParams;
type WithAuth<T> = T & { auth?: string };

export interface RequestParameters {
    path: string;
    method: Method;
    query?: QueryParams;
    body?: Record<string, unknown>;
    auth?: string;
}

export class Client {
    private auth?: string;
    private prefixUrl: string;
    private userAgent: string;
    private timeoutMs: number;

    public constructor(options?: ClientOptions) {
        this.auth = options?.auth;
        this.prefixUrl = options?.baseUrl ?? 'https://api-calendar2notion.opize.me';
        this.userAgent = `opize-client`;
        this.timeoutMs = options?.timeoutMs ?? 60_000;
    }

    public updateAuth(auth?: string) {
        this.auth = auth;
    }

    private authAsHeaders(auth?: string): Record<string, string> {
        const headers: Record<string, string> = {};
        const authHeaderValue = auth ?? this.auth;
        if (authHeaderValue !== undefined) {
            headers['authorization'] = `Bearer ${authHeaderValue}`;
        }
        return headers;
    }

    public async request<ResponseBody>({ path, method, query, body, auth }: RequestParameters): Promise<ResponseBody> {
        const url = `${this.prefixUrl}${path}`;
        const headers: Record<string, string> = this.authAsHeaders(auth);

        try {
            const response = await RequestTimeoutError.rejectAfterTimeout(
                axios(url, {
                    method: method.toUpperCase(),
                    headers,
                    data: body,
                    params: query,
                }),
                this.timeoutMs
            );

            return response.data;
        } catch (error: any) {
            // TODO: AxiosError가 undefined로 잡히는 문제
            if (error?.response) {
                throw buildRequestError(error.response);
            }

            if (!isOpizeClientError(error)) throw error;
            if (isHTTPResponseError(error)) throw error;
            throw error;
        }
    }

    public readonly user = {
        get: (args: WithAuth<getUserParameters>): Promise<getUserResponse> => {
            return this.request<getUserResponse>({
                path: getUser.path(args),
                method: getUser.method,
                query: pick(args, getUser.queryParams),
                body: pick(args, getUser.bodyParams),
                auth: args?.auth,
            });
        },

        post: (args: WithAuth<postUserParameters>): Promise<postUserResponse> => {
            return this.request<postUserResponse>({
                path: postUser.path(args),
                method: postUser.method,
                query: pick(args, postUser.queryParams),
                body: pick(args, postUser.bodyParams),
                auth: args?.auth,
            });
        },

        connect: {
            googleApi: (args: WithAuth<postConnectGoogleAPIParameters>): Promise<postConnectGoogleAPIResponse> => {
                return this.request<postConnectGoogleAPIResponse>({
                    path: postConnectGoogleAPI.path(args),
                    method: postConnectGoogleAPI.method,
                    query: pick(args, postConnectGoogleAPI.queryParams),
                    body: pick(args, postConnectGoogleAPI.bodyParams),
                    auth: args?.auth,
                });
            },
            notionApi: (args: WithAuth<postConnectNotionAPIParameters>): Promise<postConnectNotionAPIResponse> => {
                return this.request<postConnectNotionAPIResponse>({
                    path: postConnectNotionAPI.path(args),
                    method: postConnectNotionAPI.method,
                    query: pick(args, postConnectNotionAPI.queryParams),
                    body: pick(args, postConnectNotionAPI.bodyParams),
                    auth: args?.auth,
                });
            },
            getNotionDatabases: (
                args: WithAuth<getConnectNotionDatabasesParameters>
            ): Promise<getConnectNotionDatabasesResponse> => {
                return this.request<getConnectNotionDatabasesResponse>({
                    path: getConnectNotionDatabases.path(args),
                    method: getConnectNotionDatabases.method,
                    query: pick(args, getConnectNotionDatabases.queryParams),
                    body: pick(args, getConnectNotionDatabases.bodyParams),
                    auth: args?.auth,
                });
            },
            notionDatabase: (
                args: WithAuth<postConnectNotionDatabaseParameters>
            ): Promise<postConnectNotionDatabaseResponse> => {
                return this.request<postConnectNotionDatabaseResponse>({
                    path: postConnectNotionDatabase.path(args),
                    method: postConnectNotionDatabase.method,
                    query: pick(args, postConnectNotionDatabase.queryParams),
                    body: pick(args, postConnectNotionDatabase.bodyParams),
                    auth: args?.auth,
                });
            },
        },

        calendar: {
            post: (args: WithAuth<postUserCalendarParameter>): Promise<postUserCalendarResponse> => {
                return this.request<postUserCalendarResponse>({
                    path: postUserCalendar.path(args),
                    method: postUserCalendar.method,
                    query: pick(args, postUserCalendar.queryParams),
                    body: pick(args, postUserCalendar.bodyParams),
                    auth: args?.auth,
                });
            },
            delete: (args: WithAuth<deleteUserCalendarParameter>): Promise<deleteUserCalendarResponse> => {
                return this.request<deleteUserCalendarResponse>({
                    path: deleteUserCalendar.path(args),
                    method: deleteUserCalendar.method,
                    query: pick(args, deleteUserCalendar.queryParams),
                    body: pick(args, deleteUserCalendar.bodyParams),
                    auth: args?.auth,
                });
            },
        },
    };

    public readonly admin = {
        findUser: (args: WithAuth<getAdminFindUserParameter>): Promise<getAdminFindUserResponse> => {
            return this.request<getAdminFindUserResponse>({
                path: getAdminFindUser.path(args),
                method: getAdminFindUser.method,
                query: pick(args, getAdminFindUser.queryParams),
                body: pick(args, getAdminFindUser.bodyParams),
                auth: args?.auth,
            });
        },
        getWorkingUsers: (args: WithAuth<getAdminWorkingUsersParameter>): Promise<getAdminWorkingUsersResponse> => {
            return this.request<getAdminWorkingUsersResponse>({
                path: getAdminWorkingUsers.path(args),
                method: getAdminWorkingUsers.method,
                query: pick(args, getAdminWorkingUsers.queryParams),
                body: pick(args, getAdminWorkingUsers.bodyParams),
                auth: args?.auth,
            });
        },
        getUser: (args: WithAuth<getAdminUserParameter>): Promise<getAdminUserResponse> => {
            return this.request<getAdminUserResponse>({
                path: getAdminUser.path(args),
                method: getAdminUser.method,
                query: pick(args, getAdminUser.queryParams),
                body: pick(args, getAdminUser.bodyParams),
                auth: args?.auth,
            });
        },
        deleteUser: (args: WithAuth<deleteAdminUserParameter>): Promise<deleteAdminUserResponse> => {
            return this.request<deleteAdminUserResponse>({
                path: deleteAdminUser.path(args),
                method: deleteAdminUser.method,
                query: pick(args, deleteAdminUser.queryParams),
                body: pick(args, deleteAdminUser.bodyParams),
                auth: args?.auth,
            });
        },
        patchUser: (args: WithAuth<patchAdminUserParameter>): Promise<patchAdminUserResponse> => {
            return this.request<patchAdminUserResponse>({
                path: patchAdminUser.path(args),
                method: patchAdminUser.method,
                query: pick(args, patchAdminUser.queryParams),
                body: pick(args, patchAdminUser.bodyParams),
                auth: args?.auth,
            });
        },
        userPlanUpdate: (
            args: WithAuth<postAdminUserPlanUpdateParameter>
        ): Promise<postAdminUserPlanUpdateResponse> => {
            return this.request<postAdminUserPlanUpdateResponse>({
                path: postAdminUserPlanUpdate.path(args),
                method: postAdminUserPlanUpdate.method,
                query: pick(args, postAdminUserPlanUpdate.queryParams),
                body: pick(args, postAdminUserPlanUpdate.bodyParams),
                auth: args?.auth,
            });
        },
        statistics: (args: WithAuth<getAdminStatisticsParameter>): Promise<getAdminStatisticsResponse> => {
            return this.request<getAdminStatisticsResponse>({
                path: getAdminStatistics.path(args),
                method: getAdminStatistics.method,
                query: pick(args, getAdminStatistics.queryParams),
                body: pick(args, getAdminStatistics.bodyParams),
                auth: args?.auth,
            });
        },
    };
}
