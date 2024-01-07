import { Flex, Skeleton, Text, Tooltip, cv } from 'opize-design-system';
import { Info } from '@phosphor-icons/react';

export function DashboardText({
    title,
    description,
    button,
}: {
    title: {
        text: string;
        Tooltip?: string;
    };
    description: React.ReactNode;
    button?: React.ReactNode;
}) {
    return (
        <Flex.Column gap="4px">
            <Flex.Center gap="4px">
                <Text weight="semibold" size="28px" style={{ textAlign: 'center' }}>
                    {title.text}
                </Text>
                {title.Tooltip && (
                    <Tooltip content={title.Tooltip}>
                        <Info size={20} color={cv.gray600} />
                    </Tooltip>
                )}
            </Flex.Center>
            <Text color={cv.gray400} style={{ textAlign: 'center' }}>
                {description}
            </Text>
            <Flex.Center>{button}</Flex.Center>
        </Flex.Column>
    );
}

export function DashboardTextSkeleton() {
    return (
        <Flex direction="column" justify="center" align="center" gap="8px">
            <Skeleton width="300px" height="32px" />
            <Skeleton width="200px" height="20px" />
        </Flex>
    );
}
