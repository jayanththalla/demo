// src/routes/index.jsx
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import LandingPage from '../pages/LandingPage';
import About from '../pages/About';
import Gallery from '../pages/Gallery';
import Contact from '../pages/Contact';
import Book from '../pages/Book';
import BookingModal from '../pages/Booking';
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
                path: 'booking',
                element: <BookingModal />,
            }
        ],
    },
]);