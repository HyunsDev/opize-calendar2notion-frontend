import { BoxLayout, Button } from 'opize-design-system';
import { Footer } from '../../../components/footer';
import { AdminHeader } from '../../../containers/admin/components/AdminHeader';
import { client } from '../../../lib/client';
import { AdminToolsContainer } from '../../../containers/admin/tools/index.container';

export default function Home() {
    return (
        <>
            <AdminHeader now="tools"></AdminHeader>
            <AdminToolsContainer />
            <Footer />
        </>
    );
}
