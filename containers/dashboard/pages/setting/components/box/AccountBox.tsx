import { A, Box, ItemsTable, cv } from 'opize-design-system';
import { useUser } from '../../../../../../hooks/useUser';

import NotionImage from '../../../../../../assets/notion.png';
import Image from 'next/image';
import { GCalIcon } from '../../../../../../components/GCalIcon';
import styled from 'styled-components';

const Link = styled.a`
    color: ${cv.blue1};
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export function AccountBox() {
    const { user } = useUser();

    return (
        <Box title="아래 계정과 데이터베이스에 연결되어 있어요">
            <ItemsTable>
                <ItemsTable.Row>
                    <ItemsTable.Row.Avatar icon={GCalIcon} name="Google Calendar" label="" />
                    <ItemsTable.Row.Text
                        text={user?.googleEmail}
                        subText={
                            <Link href="https://calendar.google.com" target={'_blank'}>
                                https://calendar.google.com
                            </Link>
                        }
                    />
                </ItemsTable.Row>
                <ItemsTable.Row>
                    <ItemsTable.Row.Avatar
                        icon={<Image src={NotionImage} alt="" width={32} height={32} />}
                        name="Notion"
                        label=""
                    />
                    <ItemsTable.Row.Text
                        subText={
                            <Link
                                href={`https://notion.so/${user?.notionDatabaseId.replaceAll('-', '')}`}
                                target={'_blank'}
                            >
                                https://notion.so/{user?.notionDatabaseId.replaceAll('-', '')}
                            </Link>
                        }
                    />
                </ItemsTable.Row>
            </ItemsTable>
        </Box>
    );
}
