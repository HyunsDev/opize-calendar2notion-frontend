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
    getAdminWorkingUsers,
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
    postAdminFindUsers,
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
        findUser: this.endpointBuilder(getAdminFindUser),
        findUsers: this.endpointBuilder(postAdminFindUsers),
        getWorkingUser: this.endpointBuilder(getAdminWorkingUsers),
        getUser: this.endpointBuilder(getAdminUser),
        deleteUser: this.endpointBuilder(deleteAdminUser),
        patchUser: this.endpointBuilder(patchAdminUser),
        userPlanUpdate: this.endpointBuilder(postAdminUserPlanUpdate),
        statistics: this.endpointBuilder(getAdminStatistics),
        errors: this.endpointBuilder(getAdminErrors),
        deleteError: this.endpointBuilder(deleteAdminError),
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
