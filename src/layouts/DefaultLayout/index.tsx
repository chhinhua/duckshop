import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { ReactNode } from 'react';

interface DefaultLayoutProps {
    children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <div>
            <Header />
            <div className="text-base pt-18">{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
