import { cv, Flex, Text } from 'opize-design-system';
import styled from 'styled-components';

const StyledTitle = styled.div`
    font-size: 22px;
`;

export function BlockHeader({ title, text }: { title: React.ReactNode; text?: React.ReactNode }) {
    return (
        <Flex.Column>
            <StyledTitle>{title}</StyledTitle>
            {text && <Text color={cv.text2}>{text}</Text>}
        </Flex.Column>
    );
}
