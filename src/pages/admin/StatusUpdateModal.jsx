import { motion, AnimatePresence } from 'framer-motion';
import { updateBookingStatus, deleteBooking } from '../../services/bookingService';
import { useState } from 'react';

const StatusUpdateModal = ({ isOpen, onClose, bookingId, onStatusUpdate }) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusUpdate = async (newStatus) => {
        setIsUpdating(true);
        try {
            if (newStatus === 'cancelled') {
                const success = await deleteBooking(bookingId);
                if (success) {
                    alert('Booking successfully cancelled and deleted');
                } else {
                    alert('Failed to delete booking');
                }
            } else {
                await updateBookingStatus(bookingId, newStatus);
            }
            onStatusUpdate(); // This should refresh the bookings list
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Error: ' + error.message); // Show actual error message
        } finally {
            setIsUpdating(false);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 30 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 30 }}
                    className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Update Booking Status</h2>
                    <div className="space-y-4">
                        <StatusButton
                            label={isUpdating ? 'Updating...' : 'Set as Pending'}
                            onClick={() => handleStatusUpdate('pending')}
                            disabled={isUpdating}
                            className="bg-yellow-100 text-yellow-800"
                        />
                        <StatusButton
                            label={isUpdating ? 'Updating...' : 'Confirm Booking'}
                            onClick={() => handleStatusUpdate('confirmed')}
                            disabled={isUpdating}
                            className="bg-green-100 text-green-800"
                        />
                        <StatusButton
                            label={isUpdating ? 'Deleting...' : 'Cancel Booking'}
                            onClick={() => handleStatusUpdate('cancelled')}
                            disabled={isUpdating}
                            className="bg-red-100 text-red-800"
                        />
                    </div>
                    <StatusButton
                        label="Close"
                        onClick={onClose}
                        disabled={isUpdating}
                        className="w-full mt-4 bg-gray-200 text-gray-700"
                    />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const StatusButton = ({ label, onClick, disabled, className }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-full px-4 py-2 rounded-lg font-medium disabled:opacity-50 ${className}`}
        onClick={onClick}
        disabled={disabled}
    >
        {label}
    </motion.button>
);

export default StatusUpdateModal;