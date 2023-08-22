import { A, Box, Button, Flex, Select, Text } from 'opize-design-system';
import { useUser } from '../../../../../../hooks/useUser';
import styled from 'styled-components';

const Width100 = styled.div`
    width: max(300px, 50%);
`;
export function PropsBox() {
    const { user } = useUser();
    const props = user?.notionProps;

    return (
        <Box
            title="노션 데이터베이스 속성"
            footer={
                <>
                    <A>자세히 알아보기</A>
                    <Button variant="primary">적용</Button>
                </>
            }
        >
            <Text>
                노션 속성을 연결할 수 있어요. 잘못 바꿀경우 문제가 발생할 수 있으니 꼭 <A>가이드</A>를 확인해주세요!
                <br />
                아이디로 연결되므로 노션에서 속성 이름을 변경해도 괜찮아요.
            </Text>
            <Flex.Column gap="8px">
                <Flex.Between>
                    <Text>캘린더</Text>
                    <Width100>
                        <Select>
                            <option value={'title'}>title (32d1)</option>
                        </Select>
                    </Width100>
                </Flex.Between>

                <Flex.Between>
                    <Text>날짜</Text>
                    <Width100>
                        <Select>
                            <option value={'title'}>title (32d1)</option>
                        </Select>
                    </Width100>
                </Flex.Between>

                <Flex.Between>
                    <Text>삭제 버튼</Text>
                    <Width100>
                        <Select>
                            <option value={'title'}>title (32d1)</option>
                        </Select>
                    </Width100>
                </Flex.Between>

                <Flex.Between>
                    <Text>상세</Text>
                    <Width100>
                        <Select>
                            <option value={'title'}>title (32d1)</option>
                        </Select>
                    </Width100>
                </Flex.Between>

                <Flex.Between>
                    <Text>장소</Text>
                    <Width100>
                        <Select>
                            <option value={'title'}>title (32d1)</option>
                        </Select>
                    </Width100>
                </Flex.Between>
            </Flex.Column>
        </Box>
    );
}
