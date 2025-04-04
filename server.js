import 'dotenv/config';
import process from 'process'
import app from './src/api/create-order.js';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Single CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

// Validate email credentials exist
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error('❌ Email credentials missing from environment variables');
    process.exit(1);
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    },
    logger: true,
    debug: true
});
// Add email validation function
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

app.post('/api/send-offline-booking-confirmation', async (req, res) => {
    try {
        const { bookingDetails } = req.body;
        // Validate email
        if (!isValidEmail(bookingDetails.userDetails.email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }
        // Send customer email
        await transporter.sendMail({
            from: `"BingeHall" <${process.env.EMAIL_USER}>`,
            to: bookingDetails.userDetails.email,
            subject: '🎉 Your Booking Confirmation - BingeHall',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #9f1d21;">Booking Confirmed!</h2>
                    <p>Dear ${bookingDetails.userDetails.name},</p>
                    <p>Your booking details:</p>
                    <ul>
                        <li>Theater: ${bookingDetails.theaterName}</li>
                        <li>Date: ${bookingDetails.date}</li>
                        <li>Time: ${bookingDetails.timeSlot}</li>
                        <li>Amount Paid: ₹${bookingDetails.amountPaid}</li>
                    </ul>
                    <p>For any queries, contact us at bingehall08@gmail.com</p>
                </div>
            `
        });

        // Send admin notification
        await transporter.sendMail({
            from: '"BingeHall System" <thallajayanth12@gmail.com>',
            to: 'bingehall08@gmail.com',
            subject: '📌 New Offline Booking',
            html: `
                <div style="font-family: Arial, sans-serif;">
                    <h2 style="color: #9f1d21;">New Offline Booking</h2>
                    <h3>Customer Details:</h3>
                    <ul>
                        <li>Name: ${bookingDetails.userDetails.name}</li>
                        <li>Email: ${bookingDetails.userDetails.email}</li>
                        <li>Phone: ${bookingDetails.userDetails.phone}</li>
                    </ul>
                    <h3>Booking Details:</h3>
                    <ul>
                        <li>Theater: ${bookingDetails.theaterName}</li>
                        <li>Date: ${bookingDetails.date}</li>
                        <li>Time: ${bookingDetails.timeSlot}</li>
                        <li>Amount Paid: ₹${bookingDetails.amountPaid}</li>
                        <li>Payment Status: ${bookingDetails.paymentStatus}</li>
                    </ul>
                </div>
            `
        });
        // Send email with timeout
        const emailPromise = transporter.sendMail(mailOptions);
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Email timeout')), 10000)
        );

        await Promise.race([emailPromise, timeoutPromise]);

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).json({ error: error.message });
    }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});