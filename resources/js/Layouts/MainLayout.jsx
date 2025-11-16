import { Header } from '@/Components/Header';
import { Footer } from '@/Components/Footer';

export default function MainLayout({ children, currentPage = 'home', auth }) {
    return (
        <div className="min-h-screen bg-white">
            <Header currentPage={currentPage} auth={auth} />
            <main>{children}</main>
            <Footer />
        </div>
    );
}