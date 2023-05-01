import { EndpointClient } from 'endpoint-client';
import {
    getConnectNotionDatabases,
    postConnectGoogleAPI,
    postConnectNotionAPI,
    postConnectNotionDatabase,
    deleteUser,
    getUser,
    patchUser,
    postUser,
    resetUser,
    postUserCalendar,
    deleteUserCalendar,
    getAdminFindUser,
    getAdminUser,
    deleteAdminError,
    patchAdminUser,
    postAdminUserPlanUpdate,
    getAdminStatistics,
    getAdminErrors,
    getSyncBotLogList,
    postSyncBot,
    deleteSyncBot,
    stopSyncBot,
    exitSyncBot,
    getSyncBotLogs,
    getSyncBotStaticLog,
    deleteAdminUser,
    getSyncBots,
    getAdminFindUsers,
} from './endpoint';

export class Client extends EndpointClient {
    readonly user = {
        get: this.endpointBuilder(getUser),
        post: this.endpointBuilder(postUser),
        patch: this.endpointBuilder(patchUser),
        delete: this.endpointBuilder(deleteUser),
        reset: this.endpointBuilder(resetUser),

        connect: {
            googleApi: this.endpointBuilder(postConnectGoogleAPI),
            notionApi: this.endpointBuilder(postConnectNotionAPI),
            getNotionDatabases: this.endpointBuilder(getConnectNotionDatabases),
            notionDatabase: this.endpointBuilder(postConnectNotionDatabase),
        },

        calendar: {
            post: this.endpointBuilder(postUserCalendar),
            delete: this.endpointBuilder(deleteUserCalendar),
        },
    };

    readonly admin = {
        user: {
            findOne: this.endpointBuilder(getAdminFindUser),
            find: this.endpointBuilder(getAdminFindUsers),
            get: this.endpointBuilder(getAdminUser),
            delete: this.endpointBuilder(deleteAdminUser),
            patch: this.endpointBuilder(patchAdminUser),
            plan: {
                upgrade: this.endpointBuilder(postAdminUserPlanUpdate),
            },
        },
        statistics: {
            get: this.endpointBuilder(getAdminStatistics),
        },
        error: {
            list: this.endpointBuilder(getAdminErrors),
            delete: this.endpointBuilder(deleteAdminError),
        },
    };

    readonly syncbot = {
        list: this.endpointBuilder(getSyncBots),
        post: this.endpointBuilder(postSyncBot),
        delete: this.endpointBuilder(deleteSyncBot),
        stop: this.endpointBuilder(stopSyncBot),
        exit: this.endpointBuilder(exitSyncBot),
        getLogs: this.endpointBuilder(getSyncBotLogs),
        getStaticLog: this.endpointBuilder(getSyncBotStaticLog),
        getLogList: this.endpointBuilder(getSyncBotLogList),
    };
}
