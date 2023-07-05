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
