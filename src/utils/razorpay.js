const waitForRazorpay = () => {
    return new Promise((resolve) => {
        const check = () => {
            if (window.Razorpay) {
                resolve();
            } else {
                setTimeout(check, 100);
            }
        };
        check();
    });
};

export const openRazorpayPayment = async (orderDetails, onSuccess, onFailure) => {
    try {
        await waitForRazorpay();

        // Validate amount (e.g., ₹1 = 100 paise)
        if (orderDetails.currency === 'INR' && orderDetails.amount < 100) {
            throw new Error('Amount must be at least ₹1 (100 paise)');
        }

        // Create order
        const createOrderResponse = await fetch('https://bingehallbackend.onrender.com/api/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: orderDetails.amount,
                currency: orderDetails.currency || 'INR',
                receipt: orderDetails.receipt || `order_${Date.now()}`,
                notes: { bookingId: orderDetails.bookingId },
            }),
        });

        if (!createOrderResponse.ok) throw new Error('Failed to create order');
        const order = await createOrderResponse.json();
        if (!order.id) throw new Error('Invalid order response');

        // Initialize Razorpay
        const paymentModal = new window.Razorpay({
            key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Use Vite env or hardcode
            amount: order.amount,
            currency: order.currency,
            order_id: order.id,
            name: 'Binge-n-Bash',
            description: 'Booking Payment',
            image: '/assets/logo.png',
            prefill: {
                name: orderDetails.customerName,
                email: orderDetails.customerEmail,
                contact: orderDetails.customerPhone,
            },
            theme: { color: '#9f1d21' },
            handler: async (response) => {
                try {
                    const verifyResponse = await fetch('https://bingehallbackend.onrender.com/api/verify-payment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            bookingId: orderDetails.bookingId,
                        }),
                    });
                    const result = await verifyResponse.json();
                    if (result.verified) onSuccess(response);
                    else onFailure(new Error('Payment verification failed'));
                } catch (error) {
                    onFailure(error);
                }
            },
            modal: {
                ondismiss: () => onFailure(new Error('USER_CLOSED_MODAL')),
            },
        });

        paymentModal.on('payment.failed', (response) => {
            onFailure(new Error(`PAYMENT_FAILED: ${response.error.description}`));
        });

        paymentModal.open();
    } catch (error) {
        onFailure(error);
    }
};