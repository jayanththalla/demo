import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export function BookingProvider({ children }) {
    const [bookings, setBookings] = useState([]);
    const [lastUpdate, setLastUpdate] = useState(Date.now());

    const refreshBookings = () => {
        setLastUpdate(Date.now());
    };

    const addBooking = (newBooking) => {
        setBookings(prev => [newBooking, ...prev]);
    };

    return (
        <BookingContext.Provider value={{ bookings, setBookings, refreshBookings, addBooking, lastUpdate }}>
            {children}
        </BookingContext.Provider>
    );
}

export const useBookings = () => useContext(BookingContext);