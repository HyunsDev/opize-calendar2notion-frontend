import { Endpoint } from '../../types/endpoint';

// POST /syncbots
export type postSyncBotParameters = {
    prefix: string;
    name: string;
    url: string;
    controlSecret: string;
};
export const postSyncBot: Endpoint<postSyncBotParameters> = {
    method: 'post',
    path: () => '/syncbots',
    bodyParams: ['name', 'url', 'prefix', 'controlSecret'],
    pathParams: [],
    queryParams: [],
};
export type postSyncBotResponse = {};

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
export const getSyncBots: Endpoint<getSyncBotsParameters> = {
    method: 'get',
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

// DELETE /syncbots
export type deleteSyncBotParameters = {
    prefix: string;
};
export const deleteSyncBot: Endpoint<deleteSyncBotParameters> = {
    method: 'delete',
    path: (e) => `/syncbot/${e.prefix}`,
    bodyParams: [],
    pathParams: ['prefix'],
    queryParams: [],
};
export type deleteSyncBotResponse = {};

// POST /syncbot/:prefix/stop
export type stopSyncBotParameters = {
    prefix: string;
};
export const stopSyncBot: Endpoint<stopSyncBotParameters> = {
    method: 'post',
    path: (e) => `/syncbot/${e.prefix}/stop`,
    bodyParams: [],
    pathParams: ['prefix'],
    queryParams: [],
};
export type stopSyncBotResponse = {};

// POST /syncbot/:prefix/exit
export type exitSyncBotParameters = {
    prefix: string;
};
export const exitSyncBot: Endpoint<exitSyncBotParameters> = {
    method: 'post',
    path: (e) => `/syncbot/${e.prefix}/exit`,
    bodyParams: [],
    pathParams: ['prefix'],
    queryParams: [],
};
export type exitSyncBotResponse = {};
