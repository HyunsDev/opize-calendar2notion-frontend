import { Flex, Text, Box, Button, A, Switch, Span, H3, useModal, Modal } from 'opize-design-system';
import { toast } from 'react-toastify';
import { APIResponseError } from 'endpoint-client';
import { client } from '../../../../../../lib/client';
import { Container } from '../../components/Container';

function BoxSyncNoticeEmail() {
    return (
        <Box
            title="동기화 알림"
            footer={
                <>
                    <Button variant="primary">적용</Button>
                </>
            }
        >
            <Text>
                동기화 중 문제가 생기면 <Span weight="semibold">phw3071@gmail.com</Span>로 문의 메일을 보내드릴게요
            </Text>
            <Switch>메일 받기</Switch>
        </Box>
    );
}

function BoxAccount() {
    const modal = useModal();

    const deleteAccount = async () => {
        try {
            const res = await client.user.delete({
                userId: 'me',
            });

            if (res.success === false) {
                toast.warn(`${res.message}`);
            } else {
                localStorage.removeItem('token');
                toast.info('계정이 삭제되었어요.');
                location.href = '/';
            }
        } catch (err) {
            if (err instanceof APIResponseError) {
                toast.warn(`${err.body.message}`);
            } else {
                console.log(err);
            }
        }
    };

    const openDialog = () => {
        modal.open(
            <Modal>
                <Modal.Header>정말로 계정을 삭제하시겠어요?</Modal.Header>
                <Modal.Content>
                    삭제한 계정은 되돌릴 수 없어요. 또한 현재 사용중인 노션 데이터베이스는 이후 다시 가입하더라도 다시
                    사용할 수 없어요! 정말로 계정을 삭제하시겠어요?
                </Modal.Content>
                <Modal.Footer>
                    <Button
                        onClick={() => {
                            modal.close();
                        }}
                    >
                        취소
                    </Button>
                    <Button variant="primary" color="red" onClick={deleteAccount}>
                        삭제
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    return (
        <Box
            title="계정 삭제"
            footer={
                <>
                    <div />
                    <Button variant="primary" color="red" onClick={openDialog} size="small">
                        계정 삭제
                    </Button>
                </>
            }
        >
            <Text size="14px">
                더 이상 Calendar2notion을 이용하지 않으신다면 계정을 삭제할 수 있어요.
                <br />
                삭제한 계정은 다시 되돌릴 수 없고, 이전 노션 데이터베이스에 다시 연결할 수 없어요. 신중하게
                생각해주세요!.
                <br />
                <br /> Opize 계정은 삭제되지 않아요. Opize 계정을 삭제하려면{' '}
                <A href="https://opize.me" target={'_blank'}>
                    opize
                </A>
                에서 삭제해주세요
            </Text>
        </Box>
    );
}

function BoxNotion() {
    const modal = useModal();

    const resetAccount = async () => {
        try {
            const res = await client.user.reset({
                userId: 'me',
            });

            if (res.success === false) {
                toast.warn(`${res.message}`);
            } else {
                console.log(res);
                localStorage.removeItem('token');
                toast.info('초기화가 완료되었어요');
                location.href = '/';
            }
        } catch (err) {
            console.error(err);
        }
    };

    const openDialog = () => {
        modal.open(
            <Modal>
                <Modal.Header>정말로 계정을 초기화하시겠어요?</Modal.Header>
                <Modal.Content>
                    계정을 초기화하면 구글 계정부터 노션 세팅까지, 첫 동기화 단계를 다시 시작하게 되요. 이전에 사용하던
                    데이터베이스는 다시 사용할 수 없어요. 정말로 초기화 하시겠어요?
                </Modal.Content>
                <Modal.Footer>
                    <Button
                        onClick={() => {
                            modal.close();
                        }}
                    >
                        취소
                    </Button>
                    <Button variant="primary" color="red" onClick={resetAccount}>
                        초기화
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    return (
        <Box
            title="노션 데이터베이스 초기화"
            footer={
                <>
                    <div />
                    <Button variant="primary" color="red" onClick={openDialog} size="small">
                        초기화
                    </Button>
                </>
            }
        >
            <Text size="14px">
                Calendar2notion을 사용하면서 문제가 발생한 경우 노션 데이터베이스를 초기화해서 해결할 수 있어요.
                <br />
                데이터베이스를 초기화하는 경우, 이전 데이터베이스와의 동기화가 해제되며 새로운 데이터베이터에 연결하게
                됩니다.
            </Text>
        </Box>
    );
}

export function AccountContainer() {
    return (
        <Container now="account">
            <Flex.Column gap="16px">
                {/* <BoxSyncNoticeEmail /> */}
                {/* <Divider /> */}
                <H3>Danger Zone</H3>
                <BoxNotion />
                <BoxAccount />
            </Flex.Column>
        </Container>
    );
}
