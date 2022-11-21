import type { NextPage } from 'next';
import { PageLayout } from 'opize-design-system';
import { NotionRenderer } from 'react-notion-x';
import { Footer } from '../components/footer';
import { IndexHeader } from '../components/pages/index/header';
import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const Home: NextPage = () => {
    const [recordMap, setRecordMap] = useState();

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_OPIZE_API_SERVER}/dashboard/notion/page/${process.env.NEXT_PUBLIC_NOTION_PAGE_GUIDE}`
                );
                setRecordMap(res.data.recordMap);
            } catch (err: any) {
                if ('response' in err) {
                    toast.error(`페이지를 불러올 수 없어요. ${err.response?.status}`);
                } else {
                    toast.error(`서버에 연결할 수 없어요 ${err.message}`);
                }
            }
        })();
    }, []);

    return (
        <div>
            <IndexHeader />
            <PageLayout minHeight="calc(100vh - 53px - 337px)" marginTop="53px">
                {recordMap && <NotionRenderer recordMap={recordMap} />}
            </PageLayout>
            <Footer />
        </div>
    );
};

export default Home;
