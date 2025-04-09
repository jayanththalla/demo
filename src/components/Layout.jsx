import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../pages/Header';
import Footer from '../pages/Footer';

const Layout = () => {
    const location = useLocation();

    // Scroll to top whenever the route changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="pt-28"> {/* Increased padding to accommodate header + promo */}
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;