import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {
    PageLayout,
    H1,
    Flex,
    Text,
    ActionList,
    PageHead,
    Box,
    Switch,
    Button,
    ItemsTable,
    Select,
    Link as A,
    useModal,
} from 'opize-design-system';
import styled from 'styled-components';
import { GCalNotionCircle } from '../../../components/GCalNotionCircle';
import { Footer } from '../../../components/footer';
import { DashboardHeader } from '../../../components/pages/dashboard/header';
import { DashboardSettingSidebar } from '../../../containers/dashboard/pages/setting/components/Sidebar';

import NotionImage from '../../../assets/notion.png';
import { GCalIcon } from '../../../components/GCalIcon';
import { timeZones } from '../../../containers/dashboard/pages/setting/data/timezone';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useToast } from 'react-toastify';
import { useUser } from '../../../hooks/useUser';
import { client } from '../../../lib/client';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { SettingContainer } from '../../../containers/dashboard/pages/setting';
dayjs.extend(relativeTime);
dayjs.locale('ko');

const Home: NextPage = () => {
    const { user } = useUser();

    return (
        <>
            <DashboardHeader now="setting" />
            <PageHead title="설정"></PageHead>
            <SettingContainer />
            <Footer />
        </>
    );
};

export default Home;
