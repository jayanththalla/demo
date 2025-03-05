import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaTimes } from 'react-icons/fa';

const BookingModal = ({
    isOpen,
    onClose,
    selectedTheater,
    theaters,
    guestCount,
    setGuestCount,
    isDecorationSelected,
    setIsDecorationSelected,
    finalPrice,
    bookedTimeslots,
    setBookedTimeslots
}) => {
    const theater = theaters.find(t => t.id === selectedTheater);
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

    useEffect(() => {
        // Fetch available time slots from the database
        const fetchAvailableTimeSlots = async () => {
            const response = await fetch('/api/availableTimeSlots');
            const data = await response.json();
            setAvailableTimeSlots(data);
        };

        fetchAvailableTimeSlots();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate user details
        if (!userDetails.name || !userDetails.email || !userDetails.phone) {
            alert('Please fill in all fields.');
            return;
        }

        // Log details (for debugging)
        console.log('User Details:', userDetails);
        console.log('Booking Details:', {
            theater: theater.name,
            guestCount,
            isDecorationSelected,
            finalPrice
        });

        // Add the booked timeslot to the list
        const newBookedTimeslot = {
            theater: theater.name,
            time: new Date().toLocaleString(),
            userDetails
        };
        setBookedTimeslots([...bookedTimeslots, newBookedTimeslot]);

        // Show success message
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            onClose();
        }, 2000); // Close modal after 2 seconds
    };

    // Calculate price breakdown
    const basePrice = theater.basePrice * guestCount;
    const decorationPrice = isDecorationSelected ? theater.decorationPrice : 0;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        className="bg-gray-900 rounded-lg p-6 w-11/12 max-w-4xl relative flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <FaTimes className="w-6 h-6" />
                        </button>

                        {/* Left Side: Booking Summary */}
                        <div className="w-full md:w-1/2">
                            <h2 className="text-2xl font-bold mb-4 flex items-center">
                                <FaCalendarAlt className="mr-2" /> Booking Summary
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Theater:</label>
                                    <p className="text-lg font-bold">{theater.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Number of Guests:</label>
                                    <input
                                        type="number"
                                        value={guestCount}
                                        onChange={(e) => setGuestCount(Number(e.target.value))}
                                        min={theater.minPeople}
                                        max={theater.maxPeople}
                                        className="w-full p-2 bg-gray-800 rounded"
                                    />
                                </div>
                                {!theater.decorationIncluded && (
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Decoration:</label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={isDecorationSelected}
                                                onChange={(e) => setIsDecorationSelected(e.target.checked)}
                                                className="mr-2"
                                            />
                                            Add Decoration (₹{theater.decorationPrice})
                                        </label>
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-lg font-bold mb-2">Price Breakdown</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>Base Price (x{guestCount}):</span>
                                            <span>₹{basePrice}</span>
                                        </div>
                                        {isDecorationSelected && (
                                            <div className="flex justify-between">
                                                <span>Decoration:</span>
                                                <span>₹{decorationPrice}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between font-bold">
                                            <span>Total:</span>
                                            <span>₹{finalPrice}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: User Details Form */}
                        <div className="w-full md:w-1/2">
                            <h2 className="text-2xl font-bold mb-4 flex items-center">
                                <FaUser className="mr-2" /> Enter Your Details
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="relative">
                                    <FaUser className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={userDetails.name}
                                        onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                                        className="w-full pl-10 p-2 bg-gray-800 rounded"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={userDetails.email}
                                        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                                        className="w-full pl-10 p-2 bg-gray-800 rounded"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <FaPhone className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="tel"
                                        placeholder="Phone"
                                        value={userDetails.phone}
                                        onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                                        className="w-full pl-10 p-2 bg-gray-800 rounded"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 transition-colors"
                                    >
                                        Confirm Booking
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Success Message */}
                        {isSubmitted && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center"
                            >
                                <div className="bg-green-500 p-6 rounded-lg text-white text-center">
                                    <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
                                    <p>Thank you for your booking.</p>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

BookingModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    selectedTheater: PropTypes.string.isRequired,
    theaters: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        minPeople: PropTypes.number.isRequired,
        maxPeople: PropTypes.number.isRequired,
        decorationIncluded: PropTypes.bool,
        decorationPrice: PropTypes.number,
        basePrice: PropTypes.number.isRequired
    })).isRequired,
    guestCount: PropTypes.number.isRequired,
    setGuestCount: PropTypes.func.isRequired,
    isDecorationSelected: PropTypes.bool.isRequired,
    setIsDecorationSelected: PropTypes.func.isRequired,
    finalPrice: PropTypes.number.isRequired,
    bookedTimeslots: PropTypes.array.isRequired,
    setBookedTimeslots: PropTypes.func.isRequired
};

export default BookingModal;