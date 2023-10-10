import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="text-base">{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
