import { motion } from 'framer-motion';
import { Users, Check, Clock, TrendingUp, CreditCard, DollarSign } from 'lucide-react';
import { useState } from 'react';

const StatsCards = ({ bookings, containerVariants, itemVariants }) => {
    const stats = {
        total: bookings.length,
        pending: bookings.filter(b => b.status === 'pending').length,
        confirmed: bookings.filter(b => b.status === 'confirmed').length,
        cancelled: bookings.filter(b => b.status === 'cancelled').length,
        revenue: bookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0),
        paid: bookings.filter(b => b.paymentStatus === 'paid').length,
        unpaid: bookings.filter(b => !b.paymentStatus || b.paymentStatus === 'unpaid').length,
        partial: bookings.filter(b => b.paymentStatus === 'partial').length,
        revenuePaid: bookings.reduce((sum, booking) => sum + (booking.amountPaid || 0), 0),
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
            <StatCard
                variants={itemVariants}
                icon={<Users size={24} className="text-blue-600" />}
                title="Total Bookings"
                value={stats.total}
                bgColor="bg-blue-100"
            />

            <StatCard
                variants={itemVariants}
                icon={<Check size={24} className="text-green-600" />}
                title="Confirmed"
                value={stats.confirmed}
                bgColor="bg-green-100"
            />

            <StatCard
                variants={itemVariants}
                icon={<Clock size={24} className="text-yellow-600" />}
                title="Pending"
                value={stats.pending}
                bgColor="bg-yellow-100"
            />

            <StatCard
                variants={itemVariants}
                icon={<TrendingUp size={24} className="text-purple-600" />}
                title="Total Revenue"
                value={`₹${stats.revenue.toLocaleString()}`}
                bgColor="bg-purple-100"
            />
            <StatCard
                variants={itemVariants}
                icon={<CreditCard size={24} className="text-green-600" />}
                title="Paid Bookings"
                value={stats.paid}
                bgColor="bg-green-100"
            />
            <StatCard
                variants={itemVariants}
                icon={<DollarSign size={24} className="text-blue-600" />}
                title="Revenue Collected"
                value={`₹${stats.revenuePaid.toLocaleString()}`}
                bgColor="bg-blue-100"
            />
        </motion.div>
    );
};

const StatCard = ({ variants, icon, title, value, bgColor }) => (
    <motion.div
        variants={variants}
        whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        className="bg-white p-6 rounded-xl shadow-md flex items-center"
    >
        <div className={`rounded-full ${bgColor} p-3 mr-4`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-700">{value}</p>
        </div>
    </motion.div>
);

export default StatsCards;