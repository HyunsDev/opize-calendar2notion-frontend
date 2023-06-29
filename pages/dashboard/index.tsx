import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
    PageLayout,
    H1,
    Flex,
    Text,
    cv,
    Button,
    useModal,
    ToolTip,
    Spinner,
    Callout,
    A,
    Box,
} from 'opize-design-system';
import { useEffect } from 'react';
import styled from 'styled-components';
import { GCalNotionCircle } from '../../components/GCalNotionCircle';
import { Footer } from '../../components/footer';
import { DashboardHeader } from '../../components/pages/dashboard/header';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useUser } from '../../hooks/useUser';
import { Info } from 'phosphor-react';
import Link from 'next/link';
import { DashboardContainer } from '../../containers/dashboard';
dayjs.extend(relativeTime);
dayjs.locale('ko');

const HelloModal = <Flex.Column>Hello, Calendar2notion!</Flex.Column>;

const Home: NextPage = () => {
    const router = useRouter();
    const modal = useModal();

    return (
        <>
            <DashboardHeader now="dashboard" />
            <DashboardContainer />
            <Footer />
        </>
    );
};

export default Home;
