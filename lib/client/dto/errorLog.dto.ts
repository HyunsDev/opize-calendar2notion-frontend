import { UserDto } from './user.dto';

export type ErrorLogDto = {
    id: number;
    code: string;
    from: 'GOOGLE CALENDAR' | 'NOTION' | 'SYNCBOT' | 'COMPLEX' | 'UNKNOWN';
    description: string;
    detail?: string;
    stack?: string;
    level: 'NOTICE' | 'WARN' | 'ERROR' | 'CRIT' | 'EMERGENCY';
    archive: boolean;
    finishWork: 'STOP' | 'RETRY';
    userId: number;
    createdAt: Date;
};
