// In bookingService.js
import { db } from './firebase';
import { ref, set, push, get, update, remove } from 'firebase/database';

// Save booking details to Firebase
export const saveBooking = async (bookingDetails) => {
    const { date, timeSlot, theaterId } = bookingDetails;

    // Check for existing bookings
    const bookingsRef = ref(db, 'bookings');
    const snapshot = await get(bookingsRef);

    if (snapshot.exists()) {
        const allBookings = snapshot.val();
        for (const [key, booking] of Object.entries(allBookings)) {
            if (booking.date === date &&
                booking.timeSlot === timeSlot &&
                booking.theaterId === theaterId) {
                // Don't allow duplicate confirmed bookings
                if (booking.status === 'confirmed') {
                    throw new Error('This time slot is already booked');
                }
                return key; // Return existing pending booking ID
            }
        }
    }

    // Create new booking with enhanced details
    const bookingRef = push(ref(db, 'bookings'));
    await set(bookingRef, {
        ...bookingDetails,
        status: 'pending',
        paymentStatus: 'unpaid', // 'unpaid', 'partial', 'paid'
        amountPaid: 0,
        paymentHistory: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });
    return bookingRef.key;
};

// Check if a time slot is available
export const checkTimeSlotAvailability = async (date, timeSlot, theaterId) => {
    const snapshot = await get(ref(db, `timeSlots/${date}/${timeSlot}/${theaterId}`));
    return snapshot.val() === null; // Returns true if available
};

// Reserve a time slot
export const reserveTimeSlot = async (date, timeSlot, theaterId, bookingId) => {
    await set(ref(db, `timeSlots/${date}/${timeSlot}/${theaterId}`), {
        bookingId, status: 'booked', bookedAt: new Date().toISOString()
    });
};
export const releaseTimeSlot = async (date, timeSlot, theaterId) => {
    await remove(ref(db, `timeSlots/${date}/${timeSlot}/${theaterId}`));
};
// Get all bookings (for admin dashboard)
// In bookingService.js
export const getAllBookings = async () => {
    const snapshot = await get(ref(db, 'bookings'));
    if (snapshot.exists()) {
        const bookings = snapshot.val();
        // Process each booking to ensure payment data structure
        Object.keys(bookings).forEach(key => {
            const booking = bookings[key];

            // Ensure paymentHistory is an array and has proper structure
            if (!Array.isArray(booking.paymentHistory)) {
                booking.paymentHistory = [];
            }

            // Ensure each payment has required fields
            booking.paymentHistory = booking.paymentHistory.map(payment => ({
                date: payment.date || new Date().toISOString(),
                amount: payment.amount || 0,
                method: payment.method || 'offline',
                type: payment.type || 'partial',
                status: payment.status || 'success',
                transactionId: payment.transactionId || null,
                receivedBy: payment.receivedBy || 'System',
                notes: payment.notes || '',
                ...payment
            }));

            // Calculate amount paid if not set
            if (typeof booking.amountPaid !== 'number') {
                booking.amountPaid = booking.paymentHistory.reduce((sum, p) => sum + (p.amount || 0), 0);
            }

            // Set payment status if not set
            if (!booking.paymentStatus) {
                booking.paymentStatus = booking.amountPaid >= booking.totalPrice ? 'paid' :
                    booking.amountPaid > 0 ? 'partial' : 'unpaid';
            }
        });
        return bookings;
    }
    return null;
};

// Fetch all booked slots for a specific theater and date
export const fetchBookedSlots = async (date, theaterId) => {
    // First get all time slot reservations
    const timeSlotsSnapshot = await get(ref(db, `timeSlots/${date}`));
    const bookingsSnapshot = await get(ref(db, 'bookings'));

    const bookedSlots = [];

    if (timeSlotsSnapshot.exists()) {
        const slots = timeSlotsSnapshot.val();
        const bookings = bookingsSnapshot.exists() ? bookingsSnapshot.val() : {};

        for (const timeSlot in slots) {
            if (slots[timeSlot][theaterId]) {
                const bookingId = slots[timeSlot][theaterId].bookingId;
                const booking = bookings[bookingId];

                // Only consider it booked if payment meets requirements
                if (booking &&
                    (booking.paymentStatus === 'paid' ||
                        (booking.paymentStatus === 'partial' && booking.amountPaid >= booking.totalPrice * 0.5))) {
                    bookedSlots.push(timeSlot);
                }
            }
        }
    }

    return bookedSlots;
};

export const updateBookingStatus = async (bookingId, newStatus) => {
    try {
        const bookingRef = ref(db, `bookings/${bookingId}`);
        await update(bookingRef, { status: newStatus });
        console.log(`Booking status updated to ${newStatus} for booking ID: ${bookingId}`);
    } catch (error) {
        console.error('Error updating booking status:', error);
        throw error;
    }
};


export const deleteBooking = async (bookingId) => {
    try {
        const bookingRef = ref(db, `bookings/${bookingId}`);
        await remove(bookingRef);
    } catch (error) {
        console.error('Error deleting booking:', error);
        throw error;
    }
};

// Add this to your Firebase utility file (e.g., bookingService.js)
export const fetchBookingDetails = async (bookingId) => {
    const snapshot = await get(ref(db, `bookings/${bookingId}`));
    if (!snapshot.exists()) {
        throw new Error('Booking not found');
    }
    return snapshot.val();
};

export const updateBookingPayment = async (bookingId, status, amount, transactionId) => {
    try {
        const updates = {
            status: status === 'paid' ? 'confirmed' : 'pending',
            paymentStatus: status,
            amountPaid: amount,
            updatedAt: new Date().toISOString()
        };

        // Add transaction ID to payment history
        const bookingRef = ref(db, `bookings/${bookingId}`);
        const snapshot = await get(bookingRef);

        if (snapshot.exists()) {
            const booking = snapshot.val();
            const paymentHistory = booking.paymentHistory || [];

            // Update the latest payment entry with transaction ID
            if (paymentHistory.length > 0) {
                paymentHistory[0].transactionId = transactionId;
                updates.paymentHistory = paymentHistory;
            } else {
                updates.paymentHistory = [{
                    amount,
                    type: status === 'paid' ? 'full' : 'partial',
                    method: 'online',
                    date: new Date().toISOString(),
                    transactionId
                }];
            }
        }

        await update(ref(db, `bookings/${bookingId}`), updates);
        return updates;
    } catch (error) {
        console.error('Error updating booking payment:', error);
        throw error;
    }
};

// In bookingService.js
export const recordOfflinePayment = async (bookingId, amount, receivedBy) => {
    const bookingRef = ref(db, `bookings/${bookingId}`);
    const snapshot = await get(bookingRef);

    if (!snapshot.exists()) {
        throw new Error('Booking not found');
    }

    const booking = snapshot.val();
    const newAmountPaid = (booking.amountPaid || 0) + amount;
    const isFullyPaid = newAmountPaid >= booking.totalPrice;

    const updates = {
        amountPaid: newAmountPaid,
        paymentStatus: isFullyPaid ? 'paid' : 'partial',
        status: isFullyPaid ? 'confirmed' : booking.status,
        updatedAt: new Date().toISOString(),
        [`paymentHistory/${booking.paymentHistory?.length || 0}`]: {
            amount,
            type: isFullyPaid ? 'full' : 'partial',
            method: 'offline',
            date: new Date().toISOString(),
            receivedBy
        }
    };

    await update(bookingRef, updates);
    return updates;
};

// Add this to your bookingService.js
export const cleanupExpiredBookings = async () => {
    const bookingsRef = ref(db, 'bookings');
    const timeSlotsRef = ref(db, 'timeSlots');
    const [bookingsSnapshot, timeSlotsSnapshot] = await Promise.all([get(bookingsRef), get(timeSlotsRef)]);

    if (!bookingsSnapshot.exists()) return;

    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString();

    const updates = {};
    const timeSlotUpdates = {};

    Object.entries(bookingsSnapshot.val()).forEach(([id, booking]) => {
        if (booking.status === 'pending' && booking.createdAt < oneHourAgo) {
            // Mark booking as expired
            updates[`bookings/${id}/status`] = 'expired';

            // Release time slot if it was reserved
            if (booking.date && booking.timeSlot && booking.theaterId) {
                timeSlotUpdates[`timeSlots/${booking.date}/${booking.timeSlot}/${booking.theaterId}`] = null;
            }
        }
    });

    // Execute all updates in a single transaction
    if (Object.keys(updates).length > 0 || Object.keys(timeSlotUpdates).length > 0) {
        await update(ref(db), { ...updates, ...timeSlotUpdates });
    }
};

