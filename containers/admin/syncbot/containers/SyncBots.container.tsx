/* eslint-disable react/no-unescaped-entities */
import { useQuery } from 'react-query';
import { client } from '../../../../lib/client';
import { toast } from 'react-toastify';
import { GetSyncBotsResponse } from '@opize/calendar2notion-object';
import { Badge, Button, Flex, H3, ItemsTable, Menu, Modal, useCodeModal, useModal } from 'opize-design-system';
import Image from 'next/image';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.locale('ko');

import Logo from '../../../../assets/logo.png';
import { APIResponseError } from '../../../../lib/old-client';
import { LogModal } from '../modal/LogModal';
import { useRouter } from 'next/router';

function SyncBotRow({ syncBot }: { syncBot: GetSyncBotsResponse[number] }) {
    const codeModal = useCodeModal();
    const modal = useModal();
    const router = useRouter();

    const getLogs = async (prefix: string) => {
        modal.open(<LogModal prefix={prefix} />, {
            width: '600px',
        });
    };

    const stopSyncBot = async (prefix: string) => {
        try {
            await client.syncbot.stop({ prefix });
            toast.info('동기화봇에 정지 요청을 보냈습니다.');
        } catch (err) {
            console.error(err);
            if (err instanceof APIResponseError) {
                toast.warn(err.body.message);
            } else {
                toast.error('알 수 없는 에러');
            }
        }
    };

    const openStopSyncBotModal = (prefix: string) => {
        modal.open(
            <Modal>
                <Modal.Header>동기화봇 정지</Modal.Header>
                <Modal.Content>
                    동기화봇에 정지 요청을 보냅니다. 정지 요청으로 동기화봇이 정지 되지 않을 시 "강제 종료"를
                    시도하세요.
                </Modal.Content>
                <Modal.Footer>
                    <Button onClick={() => modal.close()}>취소</Button>
                    <Button onClick={() => stopSyncBot(prefix)} variant="primary" color="red">
                        동기화봇 정지
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    const exitSyncBot = async (prefix: string) => {
        try {
            await client.syncbot.exit({ prefix });
            toast.info('동기화봇에 강제 종료 요청을 보냈습니다. 30초 동안 정지 시도 후 강제로 종료합니다.');
        } catch (err) {
            console.error(err);
            if (err instanceof APIResponseError) {
                toast.warn(err.body.message);
            } else {
                toast.error('알 수 없는 에러');
            }
        }
    };

    const openExitSyncBotModal = (prefix: string) => {
        modal.open(
            <Modal>
                <Modal.Header>동기화봇 강제 종료</Modal.Header>
                <Modal.Content>
                    동기화봇에 강제 종료 요청을 보냅니다. 30초 동안 정지 시도 후 강제로 종료합니다.
                </Modal.Content>
                <Modal.Footer>
                    <Button onClick={() => modal.close()}>취소</Button>
                    <Button onClick={() => exitSyncBot(prefix)} variant="primary" color="red">
                        동기화봇 강제 종료
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    return (
        <>
            <ItemsTable.Row key={syncBot.id}>
                <ItemsTable.Row.Avatar
                    icon={<Image src={Logo} width={28} height={28} alt="" />}
                    name={`${syncBot.name} (${syncBot.prefix})`}
                    label={syncBot.url}
                    flex={2}
                />
                <ItemsTable.Row.Text
                    text={syncBot?.data?.syncBot?.version || '알 수 없음'}
                    subText={dayjs(syncBot?.data?.syncBot.startedAt).fromNow()}
                    flex={1}
                />
                <ItemsTable.Row.Text
                    text={Object.entries(syncBot?.data?.syncBot.workerAmount || {})
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(' | ')}
                    flex={3}
                />
                <ItemsTable.Row.Component>
                    <Badge color={syncBot.status === 'good' ? 'green' : 'blue'}>
                        {syncBot.status === 'good' ? '정상' : '에러'}
                    </Badge>
                </ItemsTable.Row.Component>
                <ItemsTable.Row.Menu>
                    <Menu.Option
                        onClick={() =>
                            codeModal.open(syncBot, {
                                stringify: true,
                            })
                        }
                    >
                        상세 정보
                    </Menu.Option>
                    <Menu.Option onClick={() => getLogs(syncBot.prefix)}>로그 보기</Menu.Option>
                    <Menu.Option onClick={() => openStopSyncBotModal(syncBot.prefix)}>정지</Menu.Option>
                    <Menu.Option onClick={() => openExitSyncBotModal(syncBot.prefix)}>강제 종료</Menu.Option>
                </ItemsTable.Row.Menu>
            </ItemsTable.Row>
            {syncBot.data?.worker.workers.map((e: any, i: number) => {
                return (
                    <ItemsTable.Row key={i}>
                        <ItemsTable.Row.Text text={`${e.loopId}`} />
                        {e.nowWorkUserId ? (
                            <ItemsTable.Row.Text
                                text={`작업중인 유저: ${e.nowWorkUserId}`}
                                subText={dayjs(e.startedAt).fromNow()}
                            />
                        ) : (
                            <ItemsTable.Row.Text />
                        )}
                        <ItemsTable.Row.Text text={`${e.completedSyncCount}명 작업 완료`} />
                        <ItemsTable.Row.Menu>
                            <Menu.Option onClick={() => codeModal.open(e)}>상세 정보</Menu.Option>
                            {e.nowWorkUserId && (
                                <Menu.Option onClick={() => router.push(`/admin/user?userId=${e.nowWorkUserId}`)}>
                                    유저 조회
                                </Menu.Option>
                            )}
                        </ItemsTable.Row.Menu>
                    </ItemsTable.Row>
                );
            })}
        </>
    );
}

export function SyncBotsContainer() {
    const { data: syncBots, refetch, isLoading } = useQuery(['admin', 'syncBot'], () => client.syncbot.list({}), {});

    return (
        <Flex.Column gap="8px">
            <Flex.Between>
                <H3>동기화봇</H3>
                <Button onClick={() => refetch()} isLoading={isLoading}>
                    새로고침
                </Button>
            </Flex.Between>
            <ItemsTable>
                {syncBots && syncBots.map((syncBot) => <SyncBotRow syncBot={syncBot} key={syncBot.id} />)}
            </ItemsTable>
        </Flex.Column>
    );
}
