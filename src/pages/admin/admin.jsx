import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Settings, Filter, Search, BarChart, Eye, EyeOff, Calendar as CalendarIcon, Plus } from 'lucide-react';
import { getAllBookings } from '../../services/bookingService';
import StatsCards from './StatsCards';
import BookingsTable from './BookingsTable';
import BookingDetailsModal from './BookingDetailsModal';
import OfflineBookingModal from './Offline';
import ScrollingPromo from '../../components/ScrollingPromo';
import { getAllPromos } from '../../services/promoService';
// Theater and Time Slot Mapping
const theaterMap = {
    1: 'Eleganto Theater',
    2: 'Luminous Premium Theater',
    3: 'Starlight Theater',
    party: 'Premium Party Hall'
};

const timeSlotMap = {
    '10:00 AM - 1:00 PM': 'Morning (10AM-1PM)',
    '2:00 PM - 5:00 PM': 'Afternoon (2PM-5PM)',
    '5:00 PM - 8:00 PM': 'Evening (5PM-8PM)',
    '8:00 PM - 11:00 PM': 'Night (8PM-11PM)',
    '11:00 PM - 12:30 AM': 'Late Night (11PM-12:30AM)'
};

// Index to time slot mapping
const timeSlotIndexMap = {
    0: '10:00 AM - 1:00 PM',
    1: '2:00 PM - 5:00 PM',
    2: '5:00 PM - 8:00 PM',
    3: '8:00 PM - 11:00 PM',
    4: '11:00 PM - 12:30 AM'
};



const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [showStats, setShowStats] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showOfflineBooking, setShowOfflineBooking] = useState(false);
    // Authentication state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Incorrect password');
        }
    };

    // Fetch all bookings
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const allBookings = await getAllBookings();
                console.log('Raw bookings from DB:', allBookings); // Debug log

                if (allBookings) {
                    // In your AdminDashboard component, ensure proper data transformation:
                    const bookingsArray = Object.keys(allBookings).map((key) => {
                        const booking = allBookings[key];

                        // Handle missing or numeric timeSlot
                        const timeSlot = booking.timeSlot?.toString() || '0'; // Convert to string and provide default

                        // Handle time slot display format
                        let timeSlotDisplay = timeSlot;
                        if (typeof timeSlot === 'string' && timeSlot.includes('-')) {
                            const [theaterId, slotIndex] = timeSlot.split('-');
                            timeSlotDisplay = timeSlotIndexMap[slotIndex] || timeSlot;
                        } else if (timeSlotMap[timeSlot]) {
                            timeSlotDisplay = timeSlotMap[timeSlot];
                        } else {
                            // Handle numeric time slot
                            timeSlotDisplay = timeSlotIndexMap[timeSlot] || timeSlot;
                        }

                        // Rest of the booking processing...
                        const userDetails = booking.userDetails || {
                            name: 'Unknown Customer',
                            email: '',
                            phone: ''
                        };

                        const totalPrice = booking.totalPrice || 0;
                        const amountPaid = booking.amountPaid || 0;
                        const balanceDue = Math.max(totalPrice - amountPaid, 0);

                        return {
                            id: key,
                            ...booking,
                            userDetails,
                            theaterName: theaterMap[booking.theaterId] || `Theater ${booking.theaterId}`,
                            formattedTimeSlot: timeSlotDisplay,
                            balanceDue,
                            totalPrice,
                            amountPaid
                        };
                    });
                    console.log('Transformed bookings:', bookingsArray); // Debug log

                    setBookings(bookingsArray);
                    setFilteredBookings(bookingsArray);
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setBookings([]);
                setFilteredBookings([]);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchBookings();
        }
    }, [isAuthenticated]);

    // Filter bookings
    useEffect(() => {
        let filtered = bookings;

        if (statusFilter !== 'all') {
            filtered = filtered.filter((booking) => booking.status === statusFilter);
        }

        if (searchQuery) {
            filtered = filtered.filter(
                (booking) =>
                    booking.userDetails.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    booking.userDetails.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    booking.userDetails.phone.includes(searchQuery)
            );
        }

        // Filter by selected date
        const parseBookingDate = (dateStr) => {
            if (!dateStr) return new Date();

            // Handle "d/M/yyyy" format
            if (dateStr.includes('/')) {
                const [day, month, year] = dateStr.split('/');
                return new Date(`${year}-${month}-${day}`);
            }

            // Handle ISO format or others
            return new Date(dateStr);
        };

        // Then in your filter:
        filtered = filtered.filter(booking => {
            const bookingDate = parseBookingDate(booking.date);
            return bookingDate.toDateString() === selectedDate.toDateString();
        });

        setFilteredBookings(filtered);
    }, [searchQuery, statusFilter, bookings, selectedDate]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4 relative">
                            <label htmlFor="password" className="block text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Login
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <ScrollingPromo isAdmin={true} />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between items-center mb-8"
            >
                <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
                <div className="flex gap-3">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowOfflineBooking(true)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2"
                    >
                        <Plus size={18} />
                        <span>Offline Booking</span>
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-2 bg-white rounded-full shadow-md text-gray-700">
                        <Bell size={20} />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-2 bg-white rounded-full shadow-md text-gray-700">
                        <Settings size={20} />
                    </motion.button>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <AnimatePresence>
                {showStats && (
                    <StatsCards
                        bookings={bookings}
                        containerVariants={{
                            hidden: { opacity: 0, height: 0 },
                            visible: { opacity: 1, height: "auto" },
                            exit: { opacity: 0, height: 0 }
                        }}
                        itemVariants={{
                            hidden: { y: 20, opacity: 0 },
                            visible: { y: 0, opacity: 1 }
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Date Selector */}
            <div className="mb-6 bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <input
                            type="date"
                            value={selectedDate.toISOString().split('T')[0]}
                            onChange={(e) => setSelectedDate(new Date(e.target.value))}
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <h2 className="text-xl font-bold text-gray-800">
                            Bookings for {selectedDate.toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </h2>
                    </div>
                    <button
                        onClick={() => setSelectedDate(new Date())}
                        className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                        Today
                    </button>
                </div>
            </div>

            {/* Search and Filter */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col md:flex-row gap-4 mb-6"
            >
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search by name, email, or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-white"
                    />
                    <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
                </div>

                <div className="flex items-center gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowStats(!showStats)}
                        className="px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center gap-2 text-gray-700 hover:bg-gray-50"
                    >
                        <BarChart size={18} />
                        <span>{showStats ? 'Hide Stats' : 'Show Stats'}</span>
                    </motion.button>

                    <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-3 rounded-lg shadow-sm">
                        <Filter className="text-gray-400" size={18} />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-transparent focus:outline-none"
                        >
                            <option value="all">All Bookings</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            </motion.div>

            {/* Bookings Table */}
            {loading ? (
                <LoadingSpinner />
            ) : filteredBookings.length > 0 ? (
                <BookingsTable
                    bookings={filteredBookings}
                    onRowClick={setSelectedBooking}
                />
            ) : (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    <h3 className="text-xl font-medium text-gray-700 mb-2">No bookings found</h3>
                    <p className="text-gray-500">
                        There are no bookings for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        that match your current filters.
                    </p>
                </div>
            )}

            {/* Booking Details Modal */}
            <BookingDetailsModal
                booking={selectedBooking}
                onClose={() => setSelectedBooking(null)}
            />

            {/* Offline Booking Modal */}
            <OfflineBookingModal
                isOpen={showOfflineBooking}
                onClose={() => setShowOfflineBooking(false)}
                theaters={theaterMap}
                timeSlots={timeSlotMap}
            />
        </div>
    );
};

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
        <motion.div
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{
                rotate: { repeat: Infinity, duration: 1, ease: "linear" },
                scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
            }}
            className="h-12 w-12 border-t-4 border-b-4 border-blue-500 rounded-full"
        />
    </div>
);

export default AdminDashboard;