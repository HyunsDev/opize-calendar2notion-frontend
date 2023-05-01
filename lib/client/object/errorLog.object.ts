import { UserObject } from './user.object';

export type ErrorLogObject = {
    id: number;
    code: string;
    from: 'GOOGLE CALENDAR' | 'NOTION' | 'SYNCBOT' | 'COMPLEX' | 'UNKNOWN';
    description: string;
    detail?: string;
    stack?: string;
    showUser: boolean;
    guideUrl?: string;
    level: 'NOTICE' | 'WARN' | 'ERROR' | 'CRIT' | 'EMERGENCY';
    archive: boolean;
    finishWork: 'STOP' | 'RETRY';
    userId: number;
    createdAt: Date;
};
