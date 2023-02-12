import { cv, H2, PageLayout, Spinner, useColorTheme } from 'opize-design-system';
import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { NotionRenderer } from 'react-notion-x';
import { Code } from 'react-notion-x/build/third-party/code';
import { Collection } from 'react-notion-x/build/third-party/collection';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Modal } from 'react-notion-x/build/third-party/modal';

import 'react-notion-x/src/styles.css';
import axios from 'axios';

const NotionRendererDiv = styled.div`
    position: relative;

    .notion-header {
        top: 53px;
        padding: 8px 0px;

        .notion-nav-header {
            padding: 0;
        }
    }
`;

const CenterPageOuter = styled.div`
    min-height: calc(100vh - 334.5px - 53px - 36px);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CenterPage = styled.div``;

export function NotionPage({ pageId, isFullPage = true }: { pageId: string; isFullPage?: boolean }) {
    const {
        isLoading: notionLoading,
        data: recordMap,
        error,
    } = useQuery(
        ['notion', 'page', pageId],
        async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_OPIZE_API_SERVER}/dashboard/notion/page/${pageId}`);
            return res.data;
        },
        { retry: 1 }
    );
    const { nowColorTheme } = useColorTheme();

    let page: React.ReactNode;
    if (error) {
        page = (
            <CenterPageOuter>
                <CenterPage>존재하지 않는 페이지에요.</CenterPage>
            </CenterPageOuter>
        );
    } else {
        if (recordMap) {
            page = (
                <NotionRendererDiv>
                    {!notionLoading && recordMap && (
                        <NotionRenderer
                            recordMap={recordMap.recordMap}
                            darkMode={nowColorTheme === 'dark'}
                            fullPage={isFullPage}
                            components={{
                                Code,
                                Collection,
                                Equation,
                                Modal,
                            }}
                        />
                    )}
                </NotionRendererDiv>
            );
        } else {
            page = (
                <CenterPageOuter>
                    <CenterPage>
                        <Spinner />
                    </CenterPage>
                </CenterPageOuter>
            );
        }
    }

    try {
        return (
            <>
                <PageLayout backgroundColor={cv.bg_page2} marginTop="32px">
                    {page}
                </PageLayout>
            </>
        );
    } catch (err) {
        return (
            <PageLayout backgroundColor={cv.bg_page2} marginTop="32px">
                <CenterPageOuter>
                    <CenterPage>문제가 발생했어요</CenterPage>
                </CenterPageOuter>
            </PageLayout>
        );
    }
}
