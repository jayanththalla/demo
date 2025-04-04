export const sendOfflineBookingConfirmation = async (bookingDetails) => {
    try {
        const response = await fetch('http://localhost:5000/api/send-offline-booking-confirmation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bookingDetails })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to send confirmation emails');
        }

        return await response.json();
    } catch (error) {
        console.error('Error sending confirmation emails:', error);
        throw error;
    }
};