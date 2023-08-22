import { Flex, cv } from 'opize-design-system';
import styled from 'styled-components';

const Link = styled.a`
    color: ${cv.blue};
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export function MigrationGuideLink() {
    return (
        <Flex.Center>
            <Link href="https://hyunsdev.notion.site/Calendar2notion-70d3d2bc1cfc449db07d1873de6340f5" target="_blank">
                마이그레이션 가이드
            </Link>
        </Flex.Center>
    );
}
