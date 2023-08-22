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
                    <Button variant="primary">적용</Button>
                </>
            }
        >
            <Select defaultValue={user?.userTimeZone}>
                {timeZones.map((e) => (
                    <option value={e.value} key={e.value}>
                        {e.label}
                    </option>
                ))}
            </Select>
        </Box>
    );
}
