import { Button, Flex, Text, useModal } from 'opize-design-system';

import Image from 'next/image';
import Img from '../../assets/screenshot1.png';

type Prop = 'calendar' | 'date' | 'delete';
const propsSolutionText: Record<
    Prop,
    {
        exist: string;
        type: string;
    }
> = {
    calendar: {
        exist: '"calendar"(선택) 속성을 추가해주세요',
        type: 'calendar 속성의 타입을 "선택(Select)"으로 변경해주세요',
    },
    date: {
        exist: '"date"(날짜) 속성을 추가하거나 기존 속성의 이름을 "date"로 변경해주세요',
        type: 'date 속성의 타입을 "날짜(Date)"로 변경해주세요',
    },
    delete: {
        exist: '"delete"(체크박스) 속성을 추가해주세요',
        type: 'delete 속성의 타입을 "체크박스(Checkbox)"로 변경해주세요',
    },
};

export function WrongPropsModal({
    wrongProps,
    databaseId,
}: {
    wrongProps: {
        [key: string]: {
            exist: boolean;
            type: boolean;
        };
    };
    databaseId: string;
}) {
    const modal = useModal();
    const wrongPropsList = Object.entries(wrongProps).map(([key, value]) => ({
        key: key,
        exist: value.exist,
        type: value.type,
    }));

    return (
        <Flex.Column gap="12px">
            <Flex.Column gap="4px">
                <Image src={Img} height={536} width={574} alt="" />
                {wrongPropsList.map((prop) => {
                    if (!prop.exist) {
                        return <Text key={prop.key}>{propsSolutionText[prop.key as Prop].exist}</Text>;
                    }

                    if (!prop.type) {
                        return <Text key={prop.key}>{propsSolutionText[prop.key as Prop].type}</Text>;
                    }

                    return null;
                })}
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
