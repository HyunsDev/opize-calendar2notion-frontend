import { UserDto } from '@opize/calendar2notion-object';
import { Badge } from 'opize-design-system';

type UserStatus = 'setting' | 'connected' | 'disconnected' | 'working' | 'recovering' | 'error';
export const getUserStatus = (user: UserDto): UserStatus => {
    if (user.status !== 'FINISHED') {
        return 'setting';
    }

    if (user.isConnected) {
        if (user.isWork) {
            return user.lastSyncStatus !== '' ? 'recovering' : 'working';
        }
        return 'connected';
    }
    return user.lastCalendarSync ? 'error' : 'disconnected';
};

export function UserStatusBadge({ status }: { status: UserStatus }) {
    if (status === 'setting') {
        return (
            <Badge variant="secondary" color="gray">
                가입 중
            </Badge>
        );
    }

    if (status === 'connected') {
        return (
            <Badge variant="secondary" color="green">
                연결됨
            </Badge>
        );
    }

    if (status === 'disconnected') {
        return (
            <Badge variant="secondary" color="yellow">
                연결 해제됨
            </Badge>
        );
    }

    if (status === 'working') {
        return (
            <Badge variant="secondary" color="blue">
                동기화 작업 중
            </Badge>
        );
    }

    if (status === 'recovering') {
        return (
            <Badge variant="secondary" color="blue">
                동기화 복구 중
            </Badge>
        );
    }

    if (status === 'error') {
        return (
            <Badge variant="secondary" color="red">
                오류로 인한 정지
            </Badge>
        );
    }

    return (
        <Badge variant="secondary" color="gray">
            정보 없음
        </Badge>
    );
}
