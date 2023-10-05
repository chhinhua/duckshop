import Header from '../components/Header/Header';
import Footer from '../components/Footer';

function DefaultLayout({ children }) {
    return (
        <div className={'wrapper'}>
            <Header />
            <div className={'content'}>{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
