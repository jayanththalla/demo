import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookHeader from './BookHeader';
import Tabs from './Tabs';
import TheaterCard from './TheaterCard';
import { theaters } from './data/theaters'; // Import theaters data
import { timeSlots, decorations, roses, photography, decorationOptions, cakeOptions } from './data/constants'; // Import constants
import DecorationSelector from './Decoration';
import CakeSelector from './Cake'; // Import the new CakeSelector component
import AddOnsSelector from './Adds'; // Import the AddOnsSelector component
import PartyHallDetails from './PartyHallDetails';
import { saveBooking, reserveTimeSlot, fetchBookedSlots, updateBookingPayment, cleanupExpiredBookings } from '../services/bookingService';
import BookingHeader from './BookingHeader';
import BookingConfirmation from './BookingConfirmation';
import { openRazorpayPayment } from '../utils/razorpay';
import UserDetailsForm from '../components/UserDetailsForm';

const Book = () => {
    const [activeTab, setActiveTab] = useState('theaters');
    const [bookingStep, setBookingStep] = useState('selection'); // 'selection', 'decoration', 'cake', 'addons', 'confirmation'
    const [bookedTimeSlots, setBookedTimeSlots] = useState({}); // { theaterId: [bookedSlots] }
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [selectedTheater, setSelectedTheater] = useState(theaters[0]?.id || null);
    const [guestCount, setGuestCount] = useState(2);
    const [selectedCake, setselectedCake] = useState(null); // For cake
    const [isEggless, setIsEggless] = useState(false); // For cake
    const [selectedDecorations, setSelectedDecorations] = useState([]);
    const [cakePrice, setCakePrice] = useState(0);
    const [timer, setTimer] = useState(null);
    const [selectedRose, setSelectedRose] = useState(null);
    const [selectedPhotography, setSelectedPhotography] = useState(null);
    const [finalPrice, setFinalPrice] = useState(0);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [currentDate] = useState(new Date().toLocaleDateString());
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString());
    const [bookingDetails, setBookingDetails] = useState(null); // Add this state
    const [errors, setErrors] = useState({}); // State to store validation errors
    const [paymentType, setPaymentType] = useState('full');
    const [paymentAmount, setPaymentAmount] = useState(0);
    const quote = "Book your spot for an unforgettable experience today!";
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cakeName, setCakeName] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    // In your Book component
    useEffect(() => {
        const cleanupInterval = setInterval(() => {
            cleanupExpiredBookings();
        }, 30 * 60 * 1000); // Run every 30 minutes

        return () => clearInterval(cleanupInterval);
    }, []);
    const handlePayment = async () => {
        const amountToPay = paymentType === 'full' ? finalPrice : paymentAmount;
        if (isProcessing) return;
        setIsProcessing(true);

        setErrors({});

        try {
            // Validate inputs
            const validationErrors = {};

            if (!selectedTheater) {
                validationErrors.theater = 'Please select a theater';
            }

            if (!selectedTimeSlot) {
                validationErrors.timeSlot = 'Please select a time slot';
            }

            if (!name.trim()) {
                validationErrors.name = 'Name is required';
            }

            if (!email.trim()) {
                validationErrors.email = 'Email is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                validationErrors.email = 'Please enter a valid email address';
            }

            if (!phone.trim()) {
                validationErrors.phone = 'Phone number is required';
            } else if (!/^\d{10}$/.test(phone)) {
                validationErrors.phone = 'Phone number must be 10 digits';
            }

            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                // Scroll to the first error
                setTimeout(() => {
                    const firstErrorField = Object.keys(validationErrors)[0];
                    const firstErrorElement = document.querySelector(`[name="${firstErrorField}"]`);
                    if (firstErrorElement) {
                        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        firstErrorElement.focus();
                    }
                }, 100);
                return;
            }
            const bookingData = {
                date: selectedDate,
                timeSlot: selectedTimeSlot,
                theaterId: selectedTheater,
                userDetails: { name, email, phone },
                decorations: selectedDecorations,
                cake: {
                    id: selectedCake,
                    name: cakeName,
                },
                addOns: { rose: selectedRose, photography: selectedPhotography },
                totalPrice: finalPrice,
                paymentStatus: paymentType === 'full' ? 'paid' : 'partial',
                amountPaid: amountToPay,
                status: 'pending', // Initial status
                paymentHistory: [{
                    amount: amountToPay,
                    type: paymentType,
                    method: 'online',
                    date: new Date().toISOString(),
                    transactionId: null
                }]
            };

            // Save booking
            const bookingId = await saveBooking(bookingData);
            await reserveTimeSlot(selectedDate, selectedTimeSlot, selectedTheater, bookingId);
            setBookingDetails({ ...bookingData, id: bookingId });

            // Process payment
            if (paymentType === 'full') {
                await processFullPayment(bookingId, amountToPay);
            } else {
                await processPartialPayment(bookingId, amountToPay);
            }

        } catch (error) {
            console.error('Booking error:', error);
            setErrors({
                general: error.message || 'An error occurred. Please try again.'
            });
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        // Scroll to just below the header when booking step changes
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        window.scrollTo({
            top: headerHeight,
            behavior: 'smooth'
        });
    }, [bookingStep]);
    const processFullPayment = async (bookingId, amount) => {
        const orderDetails = {
            amount: amount * 100,
            currency: 'INR',
            customerName: name,
            customerEmail: email,
            customerPhone: phone,
            bookingId: bookingId,
        };

        openRazorpayPayment(
            orderDetails,
            async (response) => {
                const updates = await updateBookingPayment(
                    bookingId,
                    'paid',
                    amount,
                    response.razorpay_payment_id
                );
                await reserveTimeSlot(selectedDate, selectedTimeSlot, selectedTheater, bookingId);
                setBookingDetails(prev => ({
                    ...prev,
                    ...updates
                }));
                setBookingSuccess(true);
            },
            (error) => {
                console.error('Payment failed:', error);
                setErrors({
                    payment: 'Payment failed. Please try again.'
                });
            }
        );
    };

    const processPartialPayment = async (bookingId, amount) => {
        const orderDetails = {
            amount: amount * 100,
            currency: 'INR',
            customerName: name,
            customerEmail: email,
            customerPhone: phone,
            bookingId: bookingId,
            notes: {
                type: 'advance',
                remaining: finalPrice - amount
            }
        };

        openRazorpayPayment(
            orderDetails,
            async (response) => {
                const updates = await updateBookingPayment(
                    bookingId,
                    'partial',
                    amount,
                    response.razorpay_payment_id
                );
                if (amount >= finalPrice * 0.5) { // Example: require at least 50% for reservation
                    await reserveTimeSlot(selectedDate, selectedTimeSlot, selectedTheater, bookingId);
                }
                setBookingDetails(prev => ({
                    ...prev,
                    ...updates
                }));
                setBookingSuccess(true);
            },
            (error) => {
                console.error('Payment failed:', error);
                alert('Payment failed. Please try again.');
            }
        );
    };

    const handleUserDetailsSubmit = async (e) => {
        e.preventDefault();

        // Validate user details
        const isValid = validateForm();
        if (!isValid) return;

        // Proceed directly to payment handling
        await handlePayment();
    };

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!name.trim()) {
            newErrors.name = 'Name is required';
        } else if (name.length < 3) {
            newErrors.name = 'Name must be at least 3 characters';
        }

        // Email validation
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation
        if (!phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(phone)) {
            newErrors.phone = 'Phone number must be 10 digits';
        }

        // Theater and time slot validation
        if (!selectedTheater) {
            newErrors.booking = 'Please select a theater';
        } else if (!selectedTimeSlot) {
            newErrors.booking = 'Please select a time slot';
        }

        setErrors(newErrors);

        // Scroll to first error if any
        if (Object.keys(newErrors).length > 0) {
            setTimeout(() => {
                const firstError = document.querySelector('[class*="border-red-400"]');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }, 100);
        }

        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        const fetchAllBookedTimeSlots = async () => {
            try {
                const theaterBookings = {};
                for (const theater of theaters) {
                    const response = await fetchBookedSlots(selectedDate, theater.id);
                    theaterBookings[theater.id] = response;
                }
                const partyHallResponse = await fetchBookedSlots(selectedDate, 'party');
                theaterBookings['party'] = partyHallResponse;
                setBookedTimeSlots(theaterBookings);
            } catch (error) {
                console.error('Error fetching booked time slots:', error);
            }
        };

        if (selectedDate) {
            fetchAllBookedTimeSlots();
            const interval = setInterval(fetchAllBookedTimeSlots, 300000);
            return () => clearInterval(interval);
        }
    }, [selectedDate]); // Add selectedDate as a dependency
    {
        errors.booking && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg flex items-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
                {errors.booking}
            </motion.div>
        )
    }
    const renderUserDetailsForm = () => (
        <UserDetailsForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            errors={errors}
            setErrors={setErrors}
            isProcessing={isProcessing}
            handlePayment={handlePayment}
            handleBack={() => setBookingStep('confirmation')}
            handleSubmit={handleUserDetailsSubmit}
        />
    );

    // Calculate final price based on selections
    useEffect(() => {
        if (selectedTheater) {
            const theater = theaters.find(t => t.id === selectedTheater) || (selectedTheater === 'party' ? {
                basePrice: 3999,
                minPeople: 1,
                extraPersonRate: 0,
                decorationIncluded: false,
                decorationPrice: 0
            } : null);

            if (theater) {
                let price = theater.basePrice;

                if (guestCount > theater.minPeople && theater.extraPersonRate > 0) {
                    price += (guestCount - theater.minPeople) * theater.extraPersonRate;
                }

                // Add decoration prices
                if (selectedDecorations.length > 0) {
                    const decorationItem = decorationOptions.find(d => d.id === selectedDecorations[0]);
                    if (decorationItem) price += decorationItem.price;
                }

                // Add cake price
                if (selectedCake) {
                    const cakeItem = cakeOptions.find(c => c.id === selectedCake);
                    if (cakeItem) price += cakeItem.price;
                }

                // Add add-ons prices
                selectedDecorations.forEach(id => {
                    const item = decorations.find(d => d.id === id);
                    if (item) price += item.price;
                });

                if (selectedRose) {
                    const roseItem = roses.find(r => r.id === selectedRose);
                    if (roseItem) price += roseItem.price;
                }

                if (selectedPhotography) {
                    const photoItem = photography.find(p => p.id === selectedPhotography);
                    if (photoItem) price += photoItem.price;
                }

                setFinalPrice(price);
            }
        }
    }, [selectedTheater, guestCount, selectedDecorations, selectedCake, selectedRose, selectedPhotography]);

    const handleBookNow = (theaterId) => {
        setSelectedTheater(theaterId);
        setBookingStep('decoration');
    };

    const handleDecorationSelect = (decorations) => {
        setSelectedDecorations(decorations.length > 0 ? [decorations[0]] : []); // Allow only one decoration
    };

    const handleCakeSelect = (cakeId, price, eggless, message) => {
        setselectedCake(cakeId); // Store the cake ID
        setIsEggless(eggless);
        setCakePrice(price);
        setCakeName(message);
    };

    const handleAddOnsSelect = (selections) => {
        setSelectedDecorations(selections.decorations);
        setSelectedRose(selections.rose);
        setSelectedPhotography(selections.photography);
    };



    const handleBackToSelection = () => {
        setBookingStep('selection');
    };

    const handleBackToDecoration = () => {
        setBookingStep('decoration');
    };

    const handleProceedToCake = () => {
        setBookingStep('cake');
    };

    const handleProceedToAddOns = () => {
        setBookingStep('addons');
    };

    // const handleProceedToConfirmation = () => {
    // };
    const handleProceedToConfirmation = () => {
        setBookingStep('confirmation'); // Show the user details form
    };

    const handleProceedToUserDetails = (paymentType, amount) => {
        setPaymentType(paymentType);
        setPaymentAmount(amount);
        setBookingStep('userDetails');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-black">
            {/* Headers remain full width */}
            <BookHeader />
            <BookingHeader currentDate={currentDate} selectedDate={selectedDate} setSelectedDate={setSelectedDate} quote={quote} />

            {/* Main Content with responsive padding */}
            <AnimatePresence mode="wait">
                {bookingStep === 'selection' && (
                    <motion.div
                        key="selection"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-8 md:py-12 px-4 sm:px-6 lg:px-8"
                    >
                        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="mx-auto max-w-7xl"
                            >
                                {activeTab === 'theaters' && (
                                    <>
                                        <div className="text-center mb-8 md:mb-12 px-4">
                                            <motion.h2
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-3xl md:text-4xl font-bold"
                                            >
                                                Book Your <span className="text-[#9f1d21]">Private Theatre</span>
                                            </motion.h2>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "120px" }}
                                                transition={{ delay: 0.5 }}
                                                className="h-1.5 bg-gradient-to-r from-[#9f1d21] to-yellow-500 mx-auto mt-4 rounded-full"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 sm:px-6">
                                            {theaters.map((theater) => (
                                                <TheaterCard
                                                    key={theater.id}
                                                    theater={theater}
                                                    selectedTimeSlot={selectedTimeSlot}
                                                    setSelectedTimeSlot={setSelectedTimeSlot}
                                                    handleBookNow={handleBookNow}
                                                    timeSlots={timeSlots}
                                                    bookedTimeSlots={bookedTimeSlots}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}

                                {activeTab === 'party' && (
                                    <PartyHallDetails
                                        selectedTimeSlot={selectedTimeSlot}
                                        setSelectedTimeSlot={setSelectedTimeSlot}
                                        handleBookNow={() => {
                                            setSelectedTheater('party');
                                            setBookingStep('decoration');
                                        }}
                                        timeSlots={timeSlots}
                                        bookedTimeSlots={bookedTimeSlots.party || []}
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                )}

                {bookingStep === 'decoration' && (
                    <motion.div
                        key="decoration"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-8 md:py-12 px-4 sm:px-6 lg:px-8"
                    >
                        <div className="mx-auto max-w-4xl">
                            <DecorationSelector
                                onSelect={handleDecorationSelect}
                                onBack={handleBackToSelection}
                                onNext={handleProceedToCake}
                                selectedDecorations={selectedDecorations}
                            />
                        </div>
                    </motion.div>
                )}

                {bookingStep === 'cake' && (
                    <motion.div
                        key="cake"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-8 md:py-12 px-4 sm:px-6 lg:px-8"
                    >
                        <div className="mx-auto max-w-4xl">
                            <CakeSelector
                                onSelect={handleCakeSelect}
                                onBack={handleBackToDecoration}
                                onNext={handleProceedToAddOns}
                                selectedCake={selectedCake}
                                isEggless={isEggless}
                                setCakeName={setCakeName}
                                cakeName={cakeName}
                            />
                        </div>
                    </motion.div>
                )}

                {bookingStep === 'addons' && (
                    <motion.div
                        key="addons"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-8 md:py-12 px-4 sm:px-6 lg:px-8"
                    >
                        <div className="mx-auto max-w-4xl">
                            <AddOnsSelector
                                onSelect={handleAddOnsSelect}
                                onBack={handleProceedToCake}
                                onNext={handleProceedToConfirmation}
                                selectedDecorations={selectedDecorations}
                                selectedRose={selectedRose}
                                selectedPhotography={selectedPhotography}
                            />
                        </div>
                    </motion.div>
                )}

                {bookingStep === 'confirmation' && (
                    <motion.div
                        key="confirmation"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-8 md:py-12 px-4 sm:px-6 lg:px-8"
                    >
                        <div className="mx-auto max-w-2xl">
                            <BookingConfirmation
                                selectedTheater={selectedTheater}
                                theaters={theaters}
                                selectedTimeSlot={selectedTimeSlot}
                                timeSlots={timeSlots}
                                guestCount={guestCount}
                                setGuestCount={setGuestCount}
                                selectedDecorations={selectedDecorations}
                                setSelectedDecorations={setSelectedDecorations}
                                selectedCake={selectedCake}
                                isEggless={isEggless}
                                cakeName={cakeName}
                                setCakeName={setCakeName}
                                selectedRose={selectedRose}
                                selectedPhotography={selectedPhotography}
                                finalPrice={finalPrice}
                                setBookingStep={setBookingStep}
                                handleProceedToUserDetails={handleProceedToUserDetails}
                                decorationOptions={decorationOptions}
                                cakeOptions={cakeOptions}
                                decorations={decorations}
                                roses={roses}
                                photography={photography}
                            />
                        </div>
                    </motion.div>
                )}

                {bookingStep === 'userDetails' && (
                    <motion.div
                        key="userDetails"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-8 md:py-12 px-4 sm:px-6 lg:px-8"
                    >
                        <div className="mx-auto max-w-2xl">
                            {renderUserDetailsForm()}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Success Modal - keep this as is */}
            {bookingSuccess && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white max-w-md w-full rounded-lg p-6 text-center"
                    >
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Booking Successful!</h3>
                        <p className="text-gray-700 mb-4">Your reservation has been confirmed.</p>
                        <p className="text-gray-700 mb-6">
                            Booking Time: {new Date().toLocaleString('en-US', {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            })}
                        </p>
                        <button
                            className="bg-[#9f1d21] text-white font-bold py-3 px-6 rounded w-full"
                            onClick={() => {
                                setBookingSuccess(false);
                                setBookingStep('selection');
                                setSelectedTheater(null);
                                setSelectedTimeSlot(null);
                                setSelectedDecorations([]);
                                setselectedCake(null);
                                setIsEggless(false);
                                setSelectedRose(null);
                                setSelectedPhotography(null);
                                setFinalPrice(0);
                                setName('');
                                setEmail('');
                                setPhone('');
                                setTimer(600);
                            }}
                        >
                            Done
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
export default Book;
