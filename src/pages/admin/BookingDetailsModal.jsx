import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, CreditCard, DollarSign, History, CheckCircle, AlertCircle, Users, Calendar, Clock, Sparkles, Cake, Gift, Camera } from 'lucide-react';
import StatusUpdateModal from './StatusUpdateModal';
import PaymentHistory from './PaymentHistory';
import { useState } from 'react';

const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-center gap-3">
        <div className="bg-opacity-20 p-2 rounded-md">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-medium">{value}</p>
        </div>
    </div>
);

const DetailSection = ({ booking }) => (
    <div className="space-y-4">
        <DetailItem icon={<Users className="text-blue-600" />} label="Customer Name" value={booking.userDetails.name} />
        <DetailItem icon={<Calendar className="text-blue-600" />} label="Booking Date" value={booking.date} />
        <DetailItem icon={<Clock className="text-blue-600" />} label="Time Slot" value={booking.timeSlot} />
        <DetailItem icon={<Sparkles className="text-blue-600" />} label="Theater"
            value={booking.theaterId === 'party' ? 'Premium Party Hall' : `Theater ${booking.theaterId}`}
        />
    </div>
);

const AddonsSection = ({ booking }) => (
    <div className="space-y-4">
        {booking.decorations?.length > 0 && (
            <DetailItem
                icon={<Sparkles className="text-purple-600" />}
                label="Decoration"
                value={booking.decorations.join(', ')}
            />
        )}
        {booking.cake && (
            <div className="space-y-2">
                <DetailItem
                    icon={<Cake className="text-pink-600" />}
                    label="Cake"
                    value={`${booking.cake.id}  ${booking.cake.name}${booking.cake.isEggless ? '(Eggless)' : ''}`}
                />
                {booking.cake.message && (
                    <div className="ml-8 text-sm">
                        <span className="text-gray-500">Message on cake:</span>
                        <p className="font-medium mt-1">"{booking.cake.message}"</p>
                    </div>
                )}
                {/* <div className="ml-8 text-sm text-gray-500">
                    Price: ₹{booking.cake.price}
                </div> */}
            </div>
        )}
        {booking.addOns?.rose && (
            <DetailItem icon={<Gift className="text-red-600" />} label="Rose" value={booking.addOns.rose} />
        )}
        {booking.addOns?.photography && (
            <DetailItem icon={<Camera className="text-amber-600" />} label="Photography" value={booking.addOns.photography} />
        )}
    </div>
);

const ActionButton = ({ label, onClick, variant = 'primary' }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-5 py-2.5 rounded-lg font-medium ${variant === 'primary'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700'
            }`}
        onClick={onClick}
    >
        {label}
    </motion.button>
);

const BookingDetailsModal = ({ booking, onClose }) => {
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('details');

    if (!booking) return null;

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
                    className="bg-white rounded-xl p-6 w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Booking Details</h2>
                        <X size={24} className="cursor-pointer text-gray-500 hover:text-gray-700" onClick={onClose} />
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 mb-6">
                        <button
                            className={`py-2 px-4 font-medium ${activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('details')}
                        >
                            Booking Details
                        </button>
                        <button
                            className={`py-2 px-4 font-medium ${activeTab === 'payment' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('payment')}
                        >
                            Payment Info
                        </button>
                    </div>

                    {activeTab === 'details' ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <DetailSection booking={booking} />
                                <AddonsSection booking={booking} />
                            </div>
                            <TotalPrice price={booking.totalPrice} paid={booking.amountPaid || 0} />
                        </>
                    ) : (
                        <PaymentSection booking={booking} />
                    )}

                    <div className="mt-8 flex gap-4 justify-end">
                        <ActionButton label="Close" onClick={onClose} variant="secondary" />
                        {activeTab === 'details' && (
                            <ActionButton
                                label="Update Status"
                                onClick={() => setIsStatusModalOpen(true)}
                                variant="primary"
                            />
                        )}
                    </div>
                </motion.div>
            </motion.div>

            <StatusUpdateModal
                isOpen={isStatusModalOpen}
                onClose={() => setIsStatusModalOpen(false)}
                bookingId={booking.id}
                onStatusUpdate={() => {
                    setIsStatusModalOpen(false);
                    onClose();
                }}
            />
        </AnimatePresence>
    );
};

const PaymentSection = ({ booking }) => {
    const totalPaid = booking.amountPaid || 0;
    const balanceDue = booking.totalPrice - totalPaid;

    return (
        <div className="space-y-6">
            {/* Payment Summary Card */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <CreditCard className="text-blue-500" size={20} />
                    Payment Summary
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <SummaryCard
                        label="Total Amount"
                        value={`₹${booking.totalPrice}`}
                        icon={<DollarSign className="text-gray-500" />}
                        className="border-l-4 border-blue-500"
                    />
                    <SummaryCard
                        label="Amount Paid"
                        value={`₹${totalPaid}`}
                        icon={<CheckCircle className="text-green-500" />}
                        className="border-l-4 border-green-500"
                    />
                    <SummaryCard
                        label="Balance Due"
                        value={`₹${balanceDue}`}
                        icon={<AlertCircle className={balanceDue > 0 ? "text-amber-500" : "text-green-500"} />}
                        className={`border-l-4 ${balanceDue > 0 ? 'border-amber-500' : 'border-green-500'}`}
                    />
                </div>

                {/* Payment Progress Bar */}
                <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Payment Progress</span>
                        <span>{Math.round((totalPaid / booking.totalPrice) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${(totalPaid / booking.totalPrice) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Payment Status */}
                <div className="flex items-center justify-between p-3 bg-white rounded-md border">
                    <div className="flex items-center gap-2">
                        <CreditCard className="text-gray-500" size={18} />
                        <span className="font-medium">Payment Status:</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                        booking.paymentStatus === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                        }`}>
                        {booking.paymentStatus?.toUpperCase() || 'UNPAID'}
                    </span>
                </div>
            </div>

            {/* Payment History */}
            <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <History className="text-blue-500" size={20} />
                    Payment Transactions
                </h3>
                <PaymentHistory payments={booking.paymentHistory || []} />
            </div>

            {/* Add Payment Button (if you want to add manual payments)
            <div className="flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <Plus size={16} />
                    Record Manual Payment
                </button>
            </div> */}
        </div>
    );
};

const SummaryCard = ({ label, value, icon, className = '' }) => (
    <div className={`bg-white p-3 rounded-md shadow-sm ${className}`}>
        <div className="flex items-center gap-2 text-gray-500 mb-1">
            {icon}
            <span className="text-sm">{label}</span>
        </div>
        <p className="text-xl font-semibold">{value}</p>
    </div>
);

const TotalPrice = ({ price, paid }) => (
    <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-semibold">Total Amount</p>
            <p className="text-2xl font-bold text-gray-800">₹{price}</p>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Amount Paid</span>
            <span>₹{paid}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
            <span className="font-medium">Balance Due</span>
            <span className={`font-bold ${price - paid > 0 ? 'text-amber-600' : 'text-green-600'
                }`}>
                ₹{price - paid}
            </span>
        </div>
        {paid > 0 && (
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(paid / price) * 100}%` }}
                />
            </div>
        )}
    </div>
);

export default BookingDetailsModal;