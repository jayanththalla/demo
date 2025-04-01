import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';
import { Search } from 'lucide-react';
import { useState } from 'react';

const BookingsTable = ({ bookings, onRowClick }) => {
    const getStatusStyles = (status) => {
        switch (status) {
            case 'confirmed':
                return { bg: 'bg-green-100', text: 'text-green-800', icon: '✓' };
            case 'cancelled':
                return { bg: 'bg-red-100', text: 'text-red-800', icon: '✗' };
            default:
                return { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '⏱' };
        }
    };
    // Replace the existing sorting code with this safer version
    const sortedBookings = [...bookings].sort((a, b) => {
        // Sort by date first
        const dateA = new Date(a.date || 0);
        const dateB = new Date(b.date || 0);
        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;

        // If same date, sort by time slot if available
        if (a.timeSlot && b.timeSlot) {
            try {
                const timeA = parseInt(a.timeSlot.split('-')[1]) || 0;
                const timeB = parseInt(b.timeSlot.split('-')[1]) || 0;
                return timeA - timeB;
            } catch (error) {
                console.warn('Error sorting time slots:', error);
                return 0;
            }
        }

        // If no time slots, maintain original order
        return 0;
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
            <div className="max-h-[600px] overflow-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Email</TableHeader>
                            <TableHeader>Phone</TableHeader>
                            <TableHeader>Date</TableHeader>
                            <TableHeader>Theater</TableHeader>
                            <TableHeader>Time</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader>Payment</TableHeader>
                            <TableHeader>Actions</TableHeader>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <AnimatePresence>
                            {sortedBookings.map((booking, index) => (
                                <TableRow
                                    key={booking.id}
                                    booking={booking}
                                    index={index}
                                    onClick={() => onRowClick(booking)}
                                    statusStyles={getStatusStyles(booking.status)}
                                />
                            ))}
                            {sortedBookings.length === 0 && <EmptyState />}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};


const TableHeader = ({ children }) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {children}
    </th>
);


const TableRow = ({ booking, index, onClick, statusStyles }) => (
    <motion.tr
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.3, delay: index * 0.05, type: "spring", stiffness: 200 }}
        whileHover={{ backgroundColor: "#f9fafb" }}
        className="cursor-pointer"
        onClick={onClick}
    >
        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
            {booking.userDetails.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{booking.userDetails.email}</td>
        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{booking.userDetails.phone}</td>
        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
            {new Date(booking.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{booking.theaterName}</td>
        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{booking.formattedTimeSlot || booking.timeSlot}</td>
        <td className="px-6 py-4 whitespace-nowrap">
            <span className={`px-3 py-1 inline-flex items-center rounded-full text-xs font-medium ${statusStyles.bg} ${statusStyles.text}`}>
                {statusStyles.icon} {booking.status}
            </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <span className={`px-2 py-1 inline-flex text-xs rounded ${booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                booking.paymentStatus === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                }`}>
                {booking.paymentStatus || 'unpaid'}
                {booking.paymentStatus === 'paid' && ' ✓'}
            </span>
            {booking.amountPaid > 0 && (
                <div className="text-xs text-gray-500 mt-1">
                    ₹{booking.amountPaid} of ₹{booking.totalPrice}
                </div>
            )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right">
            <motion.button
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="text-blue-500 hover:text-blue-700"
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(booking);
                }}
            >
                <Info size={18} />
            </motion.button>
        </td>
    </motion.tr>
);

const EmptyState = () => (
    <tr>
        <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
            >
                <Search size={40} className="text-gray-300 mb-3" />
                <p>No bookings found</p>
            </motion.div>
        </td>
    </tr>
);

export default BookingsTable;