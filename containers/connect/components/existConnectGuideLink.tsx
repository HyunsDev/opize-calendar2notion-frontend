import { Flex, cv } from 'opize-design-system';
import styled from 'styled-components';

const Link = styled.a`
    color: ${cv.blue1};
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export function ExistConnectGuideLink() {
    return (
        <Flex.Center>
            <Link href="https://hyunsdev.notion.site/845106f6d74a41f6897c44962e528c59" target="_blank">
                기존 데이터베이스 연결 가이드
            </Link>
        </Flex.Center>
    );
}
