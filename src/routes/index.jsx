// src/routes/index.jsx
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import LandingPage from '../pages/LandingPage';
import About from '../pages/About';
import Gallery from '../pages/Gallery';
import Contact from '../pages/Contact';
import Book from '../pages/Book';
import AdminDashboard from '../pages/admin/admin';
import TermsAndConditions from '../pages/other/terms';
import PrivacyPolicy from '../pages/other/privacy';
import RefundPolicy from '../pages/other/refund';
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <LandingPage />,
            },
            {
                path: 'about',
                element: <About />,
            },
            {
                path: 'gallery',
                element: <Gallery />,
            },
            {
                path: 'contact',
                element: <Contact />,
            },
            {
                path: 'book',
                element: <Book />,
            },
            {
                path: 'admin',
                element: <AdminDashboard />,
            },
            {
                path: 'terms',
                element: <TermsAndConditions />,
            },
            {
                path: 'privacy',
                element: <PrivacyPolicy />,
            },
            {
                path: 'refund',
                element: <RefundPolicy />,
            }
        ],
    },
]);