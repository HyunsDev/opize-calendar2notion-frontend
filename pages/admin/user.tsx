import type { NextPage } from 'next';
import React, { useState } from 'react';
import { PageHead, useModal } from 'opize-design-system';
import { AdminHeader } from '../../components/pages/admin/header';
import { Footer } from '../../components/footer';
import { AdminUserContainer } from '../../containers/admin/user/user.container';

const Home: NextPage = () => {
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
