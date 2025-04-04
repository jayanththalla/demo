import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { saveBooking, checkTimeSlotAvailability, fetchBookedSlots } from '../../services/bookingService';
import { sendOfflineBookingConfirmation } from '../../utils/razorpay';
import { useBookings } from '../../context/BookingContext';

const OfflineBookingModal = ({ isOpen, onClose, theaters, timeSlots }) => {
    const { addBooking } = useBookings();
    const [formData, setFormData] = useState({
        customerName: '',
        email: '',
        phone: '',
        theaterId: '1', // Default to first theater
        date: new Date().toISOString().split('T')[0],
        timeSlot: Object.keys(timeSlots)[0], // Default to first time slot
        totalPrice: 0,
        seats: [],
        status: 'confirmed',
        paymentStatus: 'paid',
        amountPaid: 0,
        paymentMethod: 'offline'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const theaterId = parseInt(formData.theaterId);

            // Get the numeric time slot index
            const timeSlotIndex = Object.keys(timeSlots).indexOf(formData.timeSlot);
            if (timeSlotIndex === -1) {
                throw new Error('Invalid time slot selected');
            }

            // Check if slot is already booked
            const bookedSlots = await fetchBookedSlots(formData.date, theaterId);
            const timeSlotKey = `${theaterId}-${timeSlotIndex}`;

            if (bookedSlots.includes(timeSlotKey)) {
                throw new Error('This time slot is already booked. Please select another slot.');
            }

            const bookingDetails = {
                id: Date.now().toString(),
                date: formData.date,
                timeSlot: timeSlotIndex,
                theaterId: theaterId,
                theaterName: theaters[theaterId] || `Theater ${theaterId}`,
                totalPrice: parseFloat(formData.totalPrice),
                amountPaid: parseFloat(formData.amountPaid),
                paymentMethod: 'offline',
                status: 'confirmed',
                paymentStatus: formData.amountPaid >= formData.totalPrice ? 'paid' : 'partial',
                userDetails: {
                    name: formData.customerName,
                    email: formData.email,
                    phone: formData.phone
                }
            };

            // Additional validation
            if (formData.amountPaid > formData.totalPrice) {
                throw new Error('Amount paid cannot be greater than total price');
            }

            const bookingId = await saveBooking(bookingDetails);
            if (!bookingId) throw new Error('Failed to create booking');

            // Add the new booking to context
            addBooking({ ...bookingDetails, id: bookingId });

            // Send confirmation emails
            try {
                await sendOfflineBookingConfirmation({
                    ...bookingDetails,
                    id: bookingId
                });
                console.log('Confirmation emails sent successfully');
            } catch (emailError) {
                console.error('Failed to send confirmation emails:', emailError);
                // Don't throw error here - booking was successful even if email fails
            }

            onClose();
        } catch (err) {
            setError(err.message || 'Failed to create booking');
        } finally {
            setIsSubmitting(false);
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
                    className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Create Offline Booking</h2>
                        <X size={24} className="cursor-pointer text-gray-500 hover:text-gray-700" onClick={onClose} />
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                                <input
                                    type="text"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                // required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                // required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                // required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Total Price</label>
                                <input
                                    type="number"
                                    name="totalPrice"
                                    value={formData.totalPrice}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    min="0"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Theater*</label>
                            <select
                                name="theaterId"
                                value={formData.theaterId}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                required
                            >
                                {Object.entries(theaters).map(([id, name]) => (
                                    <option key={id} value={id}>{name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot*</label>
                                <select
                                    name="timeSlot"
                                    value={formData.timeSlot}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    required
                                >
                                    {Object.entries(timeSlots).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method*</label>
                                <select
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    required
                                >
                                    <option value="offline">Cash</option>
                                    <option value="card">Card</option>
                                    <option value="bank_transfer">Bank Transfer</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount Paid*</label>
                                <input
                                    type="number"
                                    name="amountPaid"
                                    value={formData.amountPaid}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    min="0"
                                    max={formData.totalPrice}
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Creating...' : 'Create Booking'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default OfflineBookingModal;