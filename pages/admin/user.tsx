import type { NextPage } from 'next';
import React from 'react';
import { PageHead } from 'opize-design-system';
import { AdminHeader } from '../../containers/admin/components/AdminHeader';
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
