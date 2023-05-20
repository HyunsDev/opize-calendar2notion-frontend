import { BoxLayout } from 'opize-design-system';
import { Footer } from '../../../components/footer';
import { AdminHeader } from '../../../components/pages/admin/header';

export default function Home() {
    return (
        <>
            <AdminHeader now="tools"></AdminHeader>
            <BoxLayout minHeight="calc(100vh - 131px - 337px)" marginTop="20px">
                <div>툴</div>
            </BoxLayout>
            <Footer />
        </>
    );
}
