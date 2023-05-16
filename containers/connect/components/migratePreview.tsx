import styled from 'styled-components';
import { MigrateV1CheckUser } from '../../../lib/client/endpoint/migrate/v1';
import { Flex, Text, cv } from 'opize-design-system';

const Divver = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 180px;
    background: ${cv.bg_element1};
    border: solid 2px #a279f5;
    margin-top: 10px;
    box-shadow: 0px 0px 10px rgba(151, 100, 255, 0.4);

    border-radius: 12px;
    padding: 16px;

    justify-content: space-between;
`;

export function MigrationPreview({ migrateUser }: { migrateUser: MigrateV1CheckUser }) {
    return (
        <Divver>
            <Flex.Column style={{ width: '100%' }}>
                <Text size="20px">{migrateUser.name}</Text>
                <Flex.Between>
                    <Text>{migrateUser.email}</Text>
                    <Text>ID {migrateUser.id}</Text>
                </Flex.Between>
            </Flex.Column>
            <Flex.Column>
                <Flex.Between>
                    <Text>캘린더</Text>
                    <Text>{migrateUser.calendars.length}개</Text>
                </Flex.Between>
                <Flex.Between>
                    <Text>플랜</Text>
                    <Text>{migrateUser.userPlan}</Text>
                </Flex.Between>
            </Flex.Column>
        </Divver>
    );
}

export function MigrationPreviewSkeleton() {
    return (
        <Divver>
            <Flex.Column style={{ width: '100%' }}>
                <Text size="20px"></Text>
                <Flex.Between>
                    <Text></Text>
                    <Text>ID </Text>
                </Flex.Between>
            </Flex.Column>
            <Flex.Column>
                <Flex.Between>
                    <Text>캘린더</Text>
                    <Text></Text>
                </Flex.Between>
                <Flex.Between>
                    <Text>플랜</Text>
                    <Text></Text>
                </Flex.Between>
            </Flex.Column>
        </Divver>
    );
}
