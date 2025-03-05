// src/components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../pages/Header';
import Footer from '../pages/Footer';

const Layout = () => {
    return (
        <div className="min-h-screen bg-black">
            <Header />
            <main className="pt-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;