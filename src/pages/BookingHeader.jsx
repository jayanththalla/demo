import { Calendar } from 'lucide-react';
import PropTypes from 'prop-types';
import { memo } from 'react';

const formatDate = (dateString) => {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch {
        return 'Invalid date';
    }
};

const BookingHeader = ({ currentDate, selectedDate, setSelectedDate, quote }) => {
    const handleDateChange = (e) => {
        try {
            const date = new Date(e.target.value);
            if (!isNaN(date.getTime())) {
                setSelectedDate(date.toISOString().split('T')[0]);
            }
        } catch (error) {
            console.error('Date conversion error:', error);
        }
    };

    return (
        <div className="container max-w-4xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row justify-center items-center bg-gray-50 rounded-lg p-4 ">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="flex items-center text-lg">
                        <Calendar className="mr-2 text-[#9f1d21]" />
                        <p><span className="font-bold">Today:</span> {formatDate(currentDate)}</p>
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="booking-date" className="sr-only">Select booking date</label>
                        <input
                            id="booking-date"
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            min={new Date().toISOString().split('T')[0]}
                            max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                            className="bg-white text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f1d21] border border-gray-300"
                            aria-label="Booking date"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

BookingHeader.propTypes = {
    currentDate: PropTypes.string.isRequired,
    selectedDate: PropTypes.string.isRequired,
    setSelectedDate: PropTypes.func.isRequired,
    quote: PropTypes.string
};

export default memo(BookingHeader);