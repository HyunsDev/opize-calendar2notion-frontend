import type { NextPage } from 'next';
import React, { useState } from 'react';
import { PageLayout, Flex, PageHead, ActionList, useModal } from 'opize-design-system';
import styled from 'styled-components';
import { AdminFooter } from '../../components/pages/admin/footer';
import { AdminHeader } from '../../components/pages/admin/header';
import { AdminSearchUser } from '../../components/footer/user/searchUser';
import { AdminUserInfo } from '../../components/footer/user/userInfo';
import { AdminUserPlanUpgrade } from '../../components/footer/user/planUpgrade';
import { AdminUserDelete } from '../../components/footer/user/userDelete';
import { client } from '../../lib/client';
import { toast } from 'react-toastify';
import { Footer } from '../../components/footer';

const Home: NextPage = () => {
    const modal = useModal();
    const [user, setUser] = useState<any>({});

    const fetchUser = async () => {
        try {
            const res = await client.admin.user.findOne({
                id: user.id,
            });
            setUser(res.user);
        } catch (err: any) {
            if (err.code === 404) {
                toast.warn(err?.message || '유저를 조회할 수 없습니다.');
            } else {
                toast.error(err?.message || '유저를 조회할 수 없습니다.');
            }
        }
    };

    return (
        <>
            <AdminHeader now="user" />
            <PageHead title="유저"></PageHead>
            <PageLayout panPosition="start" marginTop="32px">
                <PageLayout.Pane>
                    <ActionList isSticky>
                        <ActionList.Item href="#조회">조회</ActionList.Item>
                        <ActionList.Item href="#user-user">유저 정보</ActionList.Item>
                        <ActionList.Item href="#user-calendar">유저 캘린더</ActionList.Item>
                        <ActionList.Item href="#user-paymentLogs">유저 결제 기록</ActionList.Item>
                        <ActionList.Item href="#플랜 업그레이드">플랜 업그레이드</ActionList.Item>
                    </ActionList>
                </PageLayout.Pane>
                <PageLayout.Content>
                    <Flex.Column gap="20px">
                        <AdminSearchUser user={user} setUser={setUser} />
                        <AdminUserInfo user={user} fetchUser={fetchUser} />
                        <AdminUserPlanUpgrade userId={user?.id} fetchUser={fetchUser} />
                        <AdminUserDelete user={user} fetchUser={fetchUser} />
                    </Flex.Column>
                </PageLayout.Content>
            </PageLayout>
            <Footer />
        </>
    );
};

export default Home;
