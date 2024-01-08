import { Button, Modal, useModal } from 'opize-design-system';
import { client } from '../../../../lib/client';
import { toast } from 'react-toastify';
import { useUser } from '../../../../hooks/useUser';

export function RemoveCalendarModal({
    calendarId,
    googleCalendarId,
    calendarName,
    isLoading,
    setIsLoading,
}: {
    calendarId: number;
    googleCalendarId: string;
    calendarName: string;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}) {
    const modal = useModal();
    const { user, refetch } = useUser();

    const removeCalendar = async (calendarId: number, googleCalendarId: string) => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const res = await client.user.calendar.delete({ calendarId: calendarId + '', userId: 'me' });
            if (res.code === 'user_is_work') {
                toast.info('현재 동기화가 진행 중이에요. 10분 정도 뒤에 다시 시도해주세요.');
                return;
            }
            toast.info('캘린더 연결을 해제했어요. 노션에 반영되기까지 시간이 걸릴 수 있어요.');
        } catch (err) {
            toast.warn('문제가 발생했어요. 잠시 뒤에 다시 시도해주세요.');
            if (refetch) await refetch();
        }
        if (refetch) await refetch();
        setIsLoading(false);
    };

    return (
        <Modal>
            <Modal.Header>정말로 {calendarName} 캘린더를 삭제하시겠어요?</Modal.Header>
            <Modal.Content>연결을 해제하면 노션에 작성한 페이지도 함께 삭제됩니다.</Modal.Content>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        modal.close();
                    }}
                >
                    취소
                </Button>
                <Button
                    variant="primary"
                    color="red"
                    onClick={() => {
                        modal.close();
                        removeCalendar(calendarId, googleCalendarId);
                    }}
                >
                    연결 해제
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
