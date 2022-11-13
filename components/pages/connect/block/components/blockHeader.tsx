import { cv, Flex, Text } from 'opize-design-system';
import styled from 'styled-components';

const StyledTitle = styled.div`
    font-size: 22px;
`;

const StyledSubtitle = styled.div`
    font-size: 14px;
    color: ${cv.text3};
`;

export function BlockHeader({ title, text }: { title: React.ReactNode; text?: React.ReactNode }) {
    return (
        <Flex.Column>
            <StyledTitle>{title}</StyledTitle>
            {text && <Text color={cv.text3}>{text}</Text>}
        </Flex.Column>
    );
}
