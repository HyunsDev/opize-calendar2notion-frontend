import { BoxLayout } from 'opize-design-system';
import { AdminDashboardStatistics } from './containers/statistics';

export function AdminIndexContainer() {
    return (
        <BoxLayout minHeight="calc(100vh - 131px - 337px)">
            <AdminDashboardStatistics />
        </BoxLayout>
    );
}
