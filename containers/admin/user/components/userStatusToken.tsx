import { Token } from 'opize-design-system';
import { UserDto } from '@opize/calendar2notion-object';

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

export function UserStatusToken({ status }: { status: UserStatus }) {
    if (status === 'setting') {
        return (
            <Token variant="outlined" color="gray">
                가입 중
            </Token>
        );
    }

    if (status === 'connected') {
        return (
            <Token variant="outlined" color="green">
                연결됨
            </Token>
        );
    }

    if (status === 'disconnected') {
        return (
            <Token variant="outlined" color="yellow">
                연결 해제됨
            </Token>
        );
    }

    if (status === 'working') {
        return (
            <Token variant="outlined" color="blue">
                동기화 작업 중
            </Token>
        );
    }

    if (status === 'recovering') {
        return (
            <Token variant="outlined" color="blue">
                동기화 복구 중
            </Token>
        );
    }

    if (status === 'error') {
        return (
            <Token variant="outlined" color="red">
                오류로 인한 정지
            </Token>
        );
    }

    return (
        <Token variant="outlined" color="gray">
            정보 없음
        </Token>
    );
}
