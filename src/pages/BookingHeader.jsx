import { Calendar } from 'lucide-react';

const BookingHeader = ({ currentDate, selectedDate, setSelectedDate, quote }) => (
    <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 rounded-lg p-4 shadow-lg mb-8">
            <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex items-center text-lg">
                    <Calendar className="mr-2 text-[#9f1d21]" />
                    <p><span className="font-bold">Today:</span> {currentDate}</p>
                </div>
                <div className="flex items-center">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                        className="bg-white text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f1d21] border border-gray-300"
                    />
                </div>
            </div>
            <p className="text-lg mt-2 md:mt-0 text-[#9f1d21] italic">{quote}</p>
        </div>
    </div>
);

export default BookingHeader;