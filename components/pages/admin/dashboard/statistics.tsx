import { Flex, ItemsTable } from 'opize-design-system';
import { ChartPie, User } from 'phosphor-react';
import React, { useState, useEffect } from 'react';
import { client } from '../../../../lib/client';

export function AdminDashboardStatistics() {
    const [statistics, setStatistics] = useState<{
        user: {
            all: number;
            plan: {
                free: number;
                pro: number;
            };
            connect: {
                connected: number;
                disconnected: number;
            };
        };
        calendar: number;
        money: number;
    }>({
        user: {
            all: 0,
            plan: {
                free: 0,
                pro: 0,
            },
            connect: {
                connected: 0,
                disconnected: 0,
            },
        },
        calendar: 0,
        money: 0,
    });

    useEffect(() => {
        (async () => {
            const res = await client.admin.statistics({});
            setStatistics(res);
        })();
    }, []);

    return (
        <Flex.Column>
            <ItemsTable>
                <ItemsTable.Row>
                    <ItemsTable.Row.Avatar icon={<User />} name="유저 수" flex={2} />
                    <ItemsTable.Row.Text text={statistics.user.all + ''} subText="전체 유저 수" flex={1} />
                    <ItemsTable.Row.Text
                        text={`${statistics.user.plan.free} (${
                            (statistics.user.plan.free / statistics.user.all) * 100
                        }%)`}
                        subText="Free 플랜"
                        flex={1}
                    />
                    <ItemsTable.Row.Text
                        text={`${statistics.user.plan.pro} (${
                            (statistics.user.plan.pro / statistics.user.all) * 100
                        }%)`}
                        subText="Pro 플랜"
                        flex={1}
                    />
                    <ItemsTable.Row.Text
                        text={`${statistics.user.connect.connected} (${
                            (statistics.user.connect.connected / statistics.user.all) * 100
                        }%)`}
                        subText="연결 유저"
                        flex={1}
                    />
                    <ItemsTable.Row.Text
                        text={`${statistics.user.connect.disconnected} (${
                            (statistics.user.connect.disconnected / statistics.user.all) * 100
                        }%)`}
                        subText="비연결 유저"
                        flex={1}
                    />
                </ItemsTable.Row>
                <ItemsTable.Row>
                    <ItemsTable.Row.Avatar icon={<ChartPie />} name="기타 통계" />
                    <ItemsTable.Row.Text text={`${statistics.money} KRW`} subText="수익" flex={1} />
                    <ItemsTable.Row.Text text={`${statistics.calendar} 개`} subText="캘린더 수" flex={1} />
                </ItemsTable.Row>
            </ItemsTable>
        </Flex.Column>
    );
}
