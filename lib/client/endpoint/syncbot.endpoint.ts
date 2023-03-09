import { Endpoint } from 'endpoint-client';

// POST /syncbots
export type postSyncBotParameters = {
    prefix: string;
    name: string;
    url: string;
    controlSecret: string;
};
export type postSyncBotResponse = {};
export const postSyncBot: Endpoint<postSyncBotParameters, postSyncBotResponse> = {
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
export type getSyncBotsParameters = {};
export const getSyncBots: Endpoint<getSyncBotsParameters, getSyncBotsResponse> = {
    method: 'GET',
    path: () => '/syncbots',
    bodyParams: [],
    pathParams: [],
    queryParams: [],
};
export type getSyncBotsResponse = {
    id: number;
    name: string;
    url: string;
    prefix: string;
    createdAt: Date;
    status: 'good' | 'error';
    data: ManagerStorageMap;
}[];

// DELETE /syncbots/:prefix
export type deleteSyncBotParameters = {
    prefix: string;
};
export const deleteSyncBot: Endpoint<deleteSyncBotParameters, deleteSyncBotResponse> = {
    method: 'DELETE',
    path: (e) => `/syncbots/${e.prefix}`,
    bodyParams: [],
    pathParams: ['prefix'],
    queryParams: [],
};
export type deleteSyncBotResponse = {};

// POST /syncbot/:prefix/stop
export type stopSyncBotParameters = {
    prefix: string;
};
export const stopSyncBot: Endpoint<stopSyncBotParameters, stopSyncBotResponse> = {
    method: 'POST',
    path: (e) => `/syncbots/${e.prefix}/stop`,
    bodyParams: [],
    pathParams: ['prefix'],
    queryParams: [],
};
export type stopSyncBotResponse = {};

// POST /syncbot/:prefix/exit
export type exitSyncBotParameters = {
    prefix: string;
};
export const exitSyncBot: Endpoint<exitSyncBotParameters, exitSyncBotResponse> = {
    method: 'POST',
    path: (e) => `/syncbots/${e.prefix}/exit`,
    bodyParams: [],
    pathParams: ['prefix'],
    queryParams: [],
};
export type exitSyncBotResponse = {};

// GET /syncbot/:prefix/logs/:date
export type getSyncBotLogsParameters = {
    prefix: string;
    date: 'today' | string;
};
export const getSyncBotLogs: Endpoint<getSyncBotLogsParameters, getSyncBotLogsResponse> = {
    path: (e) => `/syncbots/${e.prefix}/logs/${e.date}`,
    method: 'GET',
    bodyParams: [],
    pathParams: ['date', 'prefix'],
    queryParams: [],
};
export type getSyncBotLogsResponse = {
    runnerLog: string;
    serverLog: string;
    workerLog: string;
};

// GET /syncbot/:prefix/logs-static/:fileName
export type getSyncBotStaticLogParameters = {
    prefix: string;
    fileName: string;
};
export const getSyncBotStaticLog: Endpoint<getSyncBotStaticLogParameters, getSyncBotStaticLogResponse> = {
    path: (e) => `/syncbots/${e.prefix}/logs-static`,
    method: 'GET',
    bodyParams: [],
    pathParams: ['prefix'],
    queryParams: ['fileName'],
};
export type getSyncBotStaticLogResponse = {
    data: string;
};

// GET /syncbot/:prefix/logs
export type getSyncBotLogListParameters = {
    prefix: string;
};
export const getSyncBotLogList: Endpoint<getSyncBotLogListParameters, getSyncBotLogListResponse> = {
    path: (e) => `/syncbots/${e.prefix}/logs`,
    method: 'GET',
    bodyParams: [],
    pathParams: ['prefix'],
    queryParams: [],
};
export type getSyncBotLogListResponse = {
    runnerLogs: string[];
    serverLogs: string[];
    workerLogs: string[];
    runnerErrorLogs: string[];
    serverErrorLogs: string[];
    workerErrorLogs: string[];
};
