import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { saveBooking } from '../../services/bookingService';

const OfflineBookingModal = ({ isOpen, onClose, theaters, timeSlots }) => {
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

    // Update the form submission handler in OfflineBookingModal
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // Convert theaterId to number and get theater name
            const theaterId = parseInt(formData.theaterId);
            const theaterName = theaters[theaterId] || `Theater ${theaterId}`;

            // Format time slot correctly (assuming timeSlots is in format { '1-2': '5:00 PM - 8:00 PM' })
            const timeSlotKey = Object.keys(timeSlots).find(key => timeSlots[key] === formData.timeSlot) || formData.timeSlot;

            const bookingDetails = {
                date: formData.date,
                timeSlot: timeSlotKey, // Store as "1-2" format
                theaterId: theaterId,
                theaterName: theaterName, // Include theater name directly
                totalPrice: parseFloat(formData.totalPrice),
                seats: [], // Add actual seats if needed
                status: 'confirmed',
                paymentStatus: formData.amountPaid >= formData.totalPrice ? 'paid' : 'partial',
                amountPaid: parseFloat(formData.amountPaid),
                paymentMethod: formData.paymentMethod,
                userDetails: {
                    name: formData.customerName,
                    email: formData.email,
                    phone: formData.phone
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                paymentHistory: [{
                    amount: parseFloat(formData.amountPaid),
                    method: formData.paymentMethod,
                    type: formData.amountPaid >= formData.totalPrice ? 'full' : 'partial',
                    date: new Date().toISOString(),
                    receivedBy: 'admin',
                    status: 'success'
                }]
            };

            const bookingId = await saveBooking(bookingDetails);
            onClose();
            // Reset form or other success actions

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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name*</label>
                                <input
                                    type="text"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Total Price*</label>
                                <input
                                    type="number"
                                    name="totalPrice"
                                    value={formData.totalPrice}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    min="0"
                                    required
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