import { Button, Modal, useModal } from 'opize-design-system';

export function SameNameCalendarExistModal() {
    const modal = useModal();

    return (
        <Modal>
            <Modal.Header>이미 같은 이름의 캘린더가 연결되어 있어요.</Modal.Header>
            <Modal.Content>연결하러는 캘린더의 이름을 구글 캘린더에서 변경한 뒤 다시 시도해주세요.</Modal.Content>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={() => {
                        modal.close();
                    }}
                >
                    확인
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
