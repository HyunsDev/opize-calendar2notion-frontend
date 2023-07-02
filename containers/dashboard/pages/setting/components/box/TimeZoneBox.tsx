import { Box, Button, Select } from 'opize-design-system';
import { useUser } from '../../../../../../hooks/useUser';
import { timeZones } from '../../data/timezone';

export function TimeZoneBox() {
    const { user } = useUser();

    return (
        <Box
            title="시간대를 선택해주세요"
            footer={
                <>
                    <div />
                    <Button variant="contained">적용</Button>
                </>
            }
        >
            <Select defaultValue={user?.userTimeZone}>
                {timeZones.map((e) => (
                    <Select.Option value={e.value} key={e.value}>
                        {e.label}
                    </Select.Option>
                ))}
            </Select>
        </Box>
    );
}
