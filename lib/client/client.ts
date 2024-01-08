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
    postUserReset,
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
    postSyncBotStop,
    postSyncBotExit,
    getSyncBotLogs,
    getSyncBotStaticLog,
    deleteAdminUser,
    getSyncBots,
    getAdminFindUsers,
    postConnectExistNotionDatabase,
    getMigrateV1Check,
    postMigrateV1AccountMigrate,
    postMigrateV1CalendarMigrate,
    getAdminToolsNotionDatabase,
    getAdminFindExpirationUsers,
    postUserCalendarRename,
} from '@opize/calendar2notion-object';

export class Client extends EndpointClient {
    readonly user = {
        get: this.endpointBuilder(getUser),
        post: this.endpointBuilder(postUser),
        patch: this.endpointBuilder(patchUser),
        delete: this.endpointBuilder(deleteUser),
        reset: this.endpointBuilder(postUserReset),

        connect: {
            googleApi: this.endpointBuilder(postConnectGoogleAPI),
            notionApi: this.endpointBuilder(postConnectNotionAPI),
            getNotionDatabases: this.endpointBuilder(getConnectNotionDatabases),
            notionDatabase: this.endpointBuilder(postConnectNotionDatabase),
            existNotionDatabase: this.endpointBuilder(postConnectExistNotionDatabase),
        },

        calendar: {
            post: this.endpointBuilder(postUserCalendar),
            delete: this.endpointBuilder(deleteUserCalendar),
            rename: this.endpointBuilder(postUserCalendarRename),
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
            expirationUsers: this.endpointBuilder(getAdminFindExpirationUsers),
        },
        statistics: {
            get: this.endpointBuilder(getAdminStatistics),
        },
        error: {
            list: this.endpointBuilder(getAdminErrors),
            delete: this.endpointBuilder(deleteAdminError),
        },
        tools: {
            getNotionDatabase: this.endpointBuilder(getAdminToolsNotionDatabase),
        },
    };

    readonly syncbot = {
        list: this.endpointBuilder(getSyncBots),
        post: this.endpointBuilder(postSyncBot),
        delete: this.endpointBuilder(deleteSyncBot),
        stop: this.endpointBuilder(postSyncBotStop),
        exit: this.endpointBuilder(postSyncBotExit),
        getLogs: this.endpointBuilder(getSyncBotLogs),
        getStaticLog: this.endpointBuilder(getSyncBotStaticLog),
        getLogList: this.endpointBuilder(getSyncBotLogList),
    };

    readonly migrate = {
        v1: {
            check: this.endpointBuilder(getMigrateV1Check),
            accountMigrate: this.endpointBuilder(postMigrateV1AccountMigrate),
            calendarMigrate: this.endpointBuilder(postMigrateV1CalendarMigrate),
        },
    };
}
