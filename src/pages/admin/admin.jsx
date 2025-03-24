import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Settings, Filter, Search, BarChart } from 'lucide-react';
import { getAllBookings } from '../../services/bookingService';
import StatsCards from './StatsCards';
import BookingsTable from './BookingsTable';
import BookingDetailsModal from './BookingDetailsModal';

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [showStats, setShowStats] = useState(true);

    // Fetch all bookings
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const allBookings = await getAllBookings();
                if (allBookings) {
                    const bookingsArray = Object.keys(allBookings).map((key) => ({
                        id: key,
                        ...allBookings[key],
                    }));
                    setBookings(bookingsArray);
                    setFilteredBookings(bookingsArray);
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

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

        setFilteredBookings(filtered);
    }, [searchQuery, statusFilter, bookings]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between items-center mb-8"
            >
                <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
                <div className="flex gap-3">
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
            ) : (
                <BookingsTable
                    bookings={filteredBookings}
                    onRowClick={setSelectedBooking}
                />
            )}

            {/* Booking Details Modal */}
            <BookingDetailsModal
                booking={selectedBooking}
                onClose={() => setSelectedBooking(null)}
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