import { Flex, H3 } from 'opize-design-system';
import { useAdminUser } from '../hooks/useAdminUser';

export function AdminUserDebugContainer() {
    const { adminUser } = useAdminUser();
    if (!adminUser) return <></>;

    return (
        <Flex.Column gap="8px" id="user-debug">
            <Flex.Row gap="8px">
                <H3>Debug</H3>
            </Flex.Row>
        </Flex.Column>
    );
}
