import { Flex, Text, ToolTip, cv } from 'opize-design-system';
import { Info } from 'phosphor-react';

export function DashboardText({
    title,
    description,
    button,
}: {
    title: {
        text: string;
        tooltip?: string;
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
                {title.tooltip && (
                    <ToolTip text={title.tooltip}>
                        <Info size={20} color={cv.text2} />
                    </ToolTip>
                )}
            </Flex.Center>
            <Text color={cv.text3} style={{ textAlign: 'center' }}>
                {description}
            </Text>
            <Flex.Center>{button}</Flex.Center>
        </Flex.Column>
    );
}
