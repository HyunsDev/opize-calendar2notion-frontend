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
import { AdminUserContainer } from '../../containers/admin/user/user.container';

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
            <AdminUserContainer />
            <Footer />
        </>
    );
};

export default Home;
