import { Endpoint } from 'endpoint-client';

// POST /syncbots
export type PostSyncBotParameters = {
    prefix: string;
    name: string;
    url: string;
    controlSecret: string;
};
export type PostSyncBotResponse = {};
export const postSyncBot: Endpoint<PostSyncBotParameters, PostSyncBotResponse> = {
    method: 'POST',
    path: () => '/syncbots',
    bodyParams: ['name', 'url', 'prefix', 'controlSecret'],
    pathParams: [],
    queryParams: [],
};

// GET /syncbots
type ManagerStorageMap = {
    prefix: string;
    startedAt: Date;
    timeout: number;
    stop: boolean;
    verizon: string;

    workerAmount: {
        pro: number;
        free: number;
        sponsor: number;
    };

    work: {
        [id: string]: {
            loopId: string;
            nowWorkUserId: number | undefined;
            completedSyncCount: number;
        };
    };
};
export type GetSyncBotsParameters = {};
export type GetSyncBotsResponse = {
    id: number;
    name: string;
    url: string;
    prefix: string;
    createdAt: Date;
    status: 'good' | 'error';
    data: ManagerStorageMap;
}[];
export const getSyncBots: Endpoint<GetSyncBotsParameters, GetSyncBotsResponse> = {
    method: 'GET',
    path: () => '/syncbots',
    bodyParams: [],
    pathParams: [],
    queryParams: [],
};

// DELETE /syncbots/:prefix
export type DeleteSyncBotParameters = {
    prefix: string;
};
export type DeleteSyncBotResponse = {};
export const deleteSyncBot: Endpoint<DeleteSyncBotParameters, DeleteSyncBotResponse> = {
    method: 'DELETE',
    path: (e) => `/syncbots/${e.prefix}`,
    bodyParams: [],
    pathParams: ['prefix'],
    queryParams: [],
};

// POST /syncbot/:prefix/stop
export type PostSyncBotStopParameters = {
    prefix: string;
};
export type PostSyncBotStopResponse = {};
export const postSyncBotStop: Endpoint<PostSyncBotStopParameters, PostSyncBotStopResponse> = {
    method: 'POST',
    path: (e) => `/syncbots/${e.prefix}/stop`,
    bodyParams: [],
    pathParams: ['prefix'],
    queryParams: [],
};

// POST /syncbot/:prefix/exit
export type PostSyncBotExitParameter = {
    prefix: string;
};
export type PostSyncBotExitResponse = {};
export const postSyncBotExit: Endpoint<PostSyncBotExitParameter, PostSyncBotExitResponse> = {
    method: 'POST',
    path: (e) => `/syncbots/${e.prefix}/exit`,
    bodyParams: [],
    pathParams: ['prefix'],
    queryParams: [],
};

// GET /syncbot/:prefix/logs/:date
export type GetSyncBotLogsParameters = {
    prefix: string;
    date: 'today' | string;
};
export type GetSyncBotLogsResponse = {
    runnerLog: string;
    serverLog: string;
    workerLog: string;
};
export const getSyncBotLogs: Endpoint<GetSyncBotLogsParameters, GetSyncBotLogsResponse> = {
    path: (e) => `/syncbots/${e.prefix}/logs/${e.date}`,
    method: 'GET',
    bodyParams: [],
    pathParams: ['date', 'prefix'],
    queryParams: [],
};

// GET /syncbot/:prefix/logs-static/:fileName
export type GetSyncBotStaticLogParameters = {
    prefix: string;
    fileName: string;
};
export type GetSyncBotStaticLogResponse = {
    data: string;
};

export const getSyncBotStaticLog: Endpoint<GetSyncBotStaticLogParameters, GetSyncBotStaticLogResponse> = {
    path: (e) => `/syncbots/${e.prefix}/logs-static`,
    method: 'GET',
    bodyParams: [],
    pathParams: ['prefix'],
    queryParams: ['fileName'],
};

// GET /syncbot/:prefix/logs
export type GetSyncBotLogListParameters = {
    prefix: string;
};
export type GetSyncBotLogListResponse = {
    runnerLogs: string[];
    serverLogs: string[];
    workerLogs: string[];
    runnerErrorLogs: string[];
    serverErrorLogs: string[];
    workerErrorLogs: string[];
};
export const getSyncBotLogList: Endpoint<GetSyncBotLogListParameters, GetSyncBotLogListResponse> = {
    path: (e) => `/syncbots/${e.prefix}/logs`,
    method: 'GET',
    bodyParams: [],
    pathParams: ['prefix'],
    queryParams: [],
};
