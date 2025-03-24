import { motion } from 'framer-motion';
import { CreditCard, HandCoins, Check, X, Clock, User, Calendar, Hash, Type, Copy, DollarSign } from 'lucide-react';

const PaymentHistory = ({ payments }) => {
    if (!payments || payments.length === 0) {
        return (
            <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                No payment transactions recorded
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {payments.map((payment, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white p-5 rounded-lg shadow-sm border border-gray-200"
                >
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${payment.method === 'online' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                                }`}>
                                {payment.method === 'online' ? <CreditCard size={20} /> : <HandCoins size={20} />}
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg">
                                    {payment.type === 'full' ? 'Full Payment' : 'Partial Payment'}
                                </h4>
                                <p className="text-sm text-gray-500">
                                    {new Date(payment.date).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${payment.status === 'success' ? 'bg-green-100 text-green-800' :
                            payment.status === 'failed' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                            }`}>
                            {payment.status || 'pending'}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <DetailRow
                            icon={<DollarSign size={16} className="text-gray-500" />}
                            label="Amount"
                            value={`₹${payment.amount.toLocaleString()}`}
                        />

                        <DetailRow
                            icon={<Type size={16} className="text-gray-500" />}
                            label="Payment Type"
                            value={payment.type === 'full' ? 'Full Payment' : 'Partial Payment'}
                        />

                        {payment.transactionId && (
                            <DetailRow
                                icon={<Hash size={16} className="text-gray-500" />}
                                label="Transaction ID"
                                value={payment.transactionId}
                                copyable
                            />
                        )}

                        {payment.receivedBy && (
                            <DetailRow
                                icon={<User size={16} className="text-gray-500" />}
                                label="Received By"
                                value={payment.receivedBy}
                            />
                        )}

                        <DetailRow
                            icon={<CreditCard size={16} className="text-gray-500" />}
                            label="Payment Method"
                            value={payment.method === 'online' ? 'Online Payment' : 'Cash Payment'}
                        />

                        {payment.paymentGateway && (
                            <DetailRow
                                icon={<CreditCard size={16} className="text-gray-500" />}
                                label="Payment Gateway"
                                value={payment.paymentGateway}
                            />
                        )}
                    </div>

                    {payment.notes && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-md">
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Notes:</span> {payment.notes}
                            </p>
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
    );
};

const DetailRow = ({ icon, label, value, copyable = false }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        // You can add a toast notification here
    };

    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5">{icon}</div>
            <div>
                <p className="text-xs text-gray-500">{label}</p>
                <div className="flex items-center gap-2">
                    <p className="font-medium">{value}</p>
                    {copyable && (
                        <button
                            onClick={handleCopy}
                            className="text-gray-400 hover:text-gray-600"
                            title="Copy to clipboard"
                        >
                            <Copy size={14} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;