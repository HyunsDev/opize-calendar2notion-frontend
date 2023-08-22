import { GetSyncBotLogListResponse } from '@opize/calendar2notion-object';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { client } from '../../../../lib/client';
import { toast } from 'react-toastify';
import { Flex, TabNav } from 'opize-design-system';
import { APIResponseError } from '../../../../lib/old-client';

const LogDownload = styled.p`
    cursor: pointer;

    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

export function LogModal({ prefix }: { prefix: string }) {
    const [logs, setLogs] = useState<GetSyncBotLogListResponse>();
    const [cursor, setCursor] = useState<keyof GetSyncBotLogListResponse>('workerLogs');

    useEffect(() => {
        (async () => {
            try {
                const res = await client.syncbot.getLogList({
                    prefix: prefix,
                });
                setLogs(res);
            } catch (err) {
                console.error(err);
                toast.error('문제가 발생했어요.');
            }
        })();
    }, [prefix]);

    const exportTxt = useCallback((fileName: string, data: string) => {
        const element = document.createElement('a');
        const file = new Blob([data], {
            type: 'text/plain',
        });
        element.href = URL.createObjectURL(file);
        element.download = fileName;
        document.body.appendChild(element); // FireFox
        element.click();
    }, []);

    const getLog = async (fileName: string) => {
        try {
            let dir: string;
            switch (cursor) {
                case 'runnerLogs':
                    dir = 'runner';
                    break;
                case 'runnerErrorLogs':
                    dir = 'runner/error';
                    break;
                case 'serverLogs':
                    dir = 'server';
                    break;
                case 'serverErrorLogs':
                    dir = 'server/error';
                    break;
                case 'workerLogs':
                    dir = 'worker';
                    break;
                case 'workerErrorLogs':
                    dir = 'worker/error';
                    break;
            }

            const res = await client.syncbot.getStaticLog({
                prefix,
                fileName: `${dir}/${fileName}`,
            });

            exportTxt(fileName, res.data);
            console.log(res);
        } catch (err) {
            if (err instanceof APIResponseError) {
                toast.warn(err.body.message);
            } else {
                console.error(err);
                toast.error('서버에 연결할 수 없어요.');
            }
        }
    };

    return (
        <Flex.Column gap="8px">
            <TabNav
                selected={cursor}
                tabs={[
                    {
                        value: 'workerLogs',
                        title: 'Worker',
                        onClick: () => setCursor('workerLogs'),
                    },
                    {
                        value: 'runnerLogs',
                        title: 'Runner',
                        onClick: () => setCursor('runnerLogs'),
                    },
                    {
                        value: 'serverLogs',
                        title: 'Server',
                        onClick: () => setCursor('serverLogs'),
                    },
                    {
                        value: 'workerErrorLogs',
                        title: 'Worker Error',
                        onClick: () => setCursor('workerErrorLogs'),
                    },
                    {
                        value: 'runnerErrorLogs',
                        title: 'Runner Error',
                        onClick: () => setCursor('runnerErrorLogs'),
                    },
                    {
                        value: 'serverErrorLogs',
                        title: 'Server Error',
                        onClick: () => setCursor('serverErrorLogs'),
                    },
                ]}
            />
            <Flex.Column gap="4px">
                {logs &&
                    logs[cursor]
                        .filter((log) => log !== 'error')
                        .map((log, i) => (
                            <LogDownload key={i} onClick={() => getLog(`${log}`)}>
                                {log}
                            </LogDownload>
                        ))}
            </Flex.Column>
        </Flex.Column>
    );
}
