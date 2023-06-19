import type { NextPage } from 'next';
import { PageHead } from 'opize-design-system';
import { AdminHeader } from '../../components/pages/admin/header';
import React from 'react';
import { Footer } from '../../components/footer';
import { ErrorsContainer } from '../../containers/admin/errors/index.container';

const Home: NextPage = () => {
    return (
        <>
            <AdminHeader now="errors" />
            <PageHead title="Errors"></PageHead>
            <ErrorsContainer />
            <Footer />
        </>
    );
};

export default Home;
