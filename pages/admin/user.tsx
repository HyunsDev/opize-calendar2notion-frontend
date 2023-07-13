import type { NextPage } from 'next';
import React, { useState } from 'react';
import { PageHead, useModal } from 'opize-design-system';
import { AdminHeader } from '../../components/pages/admin/header';
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
