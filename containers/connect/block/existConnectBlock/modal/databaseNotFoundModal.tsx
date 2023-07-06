/* eslint-disable react/no-unescaped-entities */
import { Button, Flex, Text, useModal } from 'opize-design-system';

import Image from 'next/image';
import Img from '../../assets/screenshot2.png';

export function DatabaseNotFoundModal({ databaseId }: { databaseId: string }) {
    const modal = useModal();

    return (
        <Flex.Column gap="12px">
            <Flex.Column gap="4px">
                <Image src={Img} height={197} width={377} alt="" />
                노션 데이터베이스 우측 상단 ...을 누르고 "연결"에서 "Opize Calendar2notion" 또는 "C2N TEST v4 Public"
                연결을 추가해주세요
                <br />
                <br />
                또는 정확한 "데이터베이스"의 주소를 복사했는지 확인해주세요. 인라인 데이터베이스의 경우 새로 만들기 옆
                "전체 페이지로 열기"를 누른 다음 링크를 복사해주세요.
            </Flex.Column>
            <Flex.Between>
                <Button onClick={() => window.open('/exist-database-connect-guide', '_blank')} variant="outlined">
                    연결 가이드
                </Button>
                <Flex.Row gap="4px">
                    <Button onClick={() => window.open(`https://notion.so/${databaseId}`, '_blank')} variant="outlined">
                        노션 열기
                    </Button>
                    <Button onClick={() => modal.close()}>확인</Button>
                </Flex.Row>
            </Flex.Between>
        </Flex.Column>
    );
}
