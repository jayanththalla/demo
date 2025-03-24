import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check } from 'lucide-react';
import BookHeader from './BookHeader';
import Tabs from './Tabs';
import TheaterCard from './TheaterCard';
import { theaters } from './data/theaters'; // Import theaters data
import { timeSlots, notes, decorations, roses, photography, decorationOptions, cakeOptions } from './data/constants'; // Import constants
import NotesSection from './Notes';
import DecorationSelector from './Decoration';
import CakeSelector from './Cake'; // Import the new CakeSelector component
import AddOnsSelector from './Adds'; // Import the AddOnsSelector component
import PartyHallDetails from './PartyHallDetails';
import { saveBooking, reserveTimeSlot, fetchBookedSlots, updateBookingStatus, updateBookingPayment } from '../services/bookingService';
import BookingHeader from './BookingHeader';
import BookingConfirmation from './BookingConfirmation';
import { openRazorpayPayment } from '../utils/razorpay';
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
    const [showAddOnsOptions, setShowAddOnsOptions] = useState(false); // State for add-ons options visibility
    const [showCakeOptions, setShowCakeOptions] = useState(false); // State for cake options visibility
    const [selectedPayment, setSelectedPayment] = useState('full');
    const [paymentType, setPaymentType] = useState('full');
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [advanceAmount, setAdvanceAmount] = useState(Math.floor(finalPrice * 0.3));
    const quote = "Book your spot for an unforgettable experience today!";

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const startTimer = () => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev === 0) {
                    clearInterval(interval);
                    alert('Booking session expired. Please try again.');
                    setBookingStep('selection');
                    return 600;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const [isProcessing, setIsProcessing] = useState(false);

    // In Book.jsx
    const handlePayment = async () => {
        const amountToPay = paymentType === 'full' ? finalPrice : paymentAmount;

        if (isProcessing) return;
        setIsProcessing(true);

        try {
            // Validate inputs
            if (!selectedTheater || !selectedTimeSlot || !name || !email || !phone) {
                throw new Error('Please fill all required details');
            }

            // Prepare booking data
            const bookingData = {
                date: selectedDate,
                timeSlot: selectedTimeSlot,
                theaterId: selectedTheater,
                userDetails: { name, email, phone },
                decorations: selectedDecorations,
                cake: selectedCake,
                addOns: { rose: selectedRose, photography: selectedPhotography },
                totalPrice: finalPrice,
                paymentStatus: paymentType === 'full' ? 'paid' : 'partial',
                amountPaid: amountToPay,
                paymentHistory: [{
                    amount: amountToPay,
                    type: paymentType,
                    method: 'online',
                    date: new Date().toISOString(),
                    transactionId: null // Will be set after payment
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
            alert(error.message || 'An error occurred. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

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


    const proceedToRazorpayPayment = async (bookingId) => {
        // Get fresh booking details from state
        const currentBooking = bookingDetails || {
            date: selectedDate,
            timeSlot: selectedTimeSlot,
            theaterId: selectedTheater,
            userDetails: { name, email, phone },
            totalPrice: finalPrice,
            id: bookingId
        };

        const orderDetails = {
            amount: currentBooking.totalPrice * 100, // Razorpay expects amount in paise
            currency: 'INR',
            customerName: currentBooking.userDetails.name,
            customerEmail: currentBooking.userDetails.email,
            customerPhone: currentBooking.userDetails.phone,
            bookingId: currentBooking.id,
        };

        // Open Razorpay payment immediately
        openRazorpayPayment(
            orderDetails,
            async (response) => {
                console.log('Payment successful:', response);
                try {
                    await updateBookingStatus(currentBooking.id, 'confirmed');
                    setBookingSuccess(true);
                } catch (error) {
                    console.error('Error updating booking status:', error);
                    alert('Payment was successful but we encountered an issue updating your booking. Please contact support.');
                }
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
            newErrors.email = 'Invalid email address';
        }

        // Phone validation
        if (!phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(phone)) {
            newErrors.phone = 'Phone number must be 10 digits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };
    // const handleUserDetailsSubmit = async (e) => {
    //     e.preventDefault();

    //     // Validate user details
    //     const isValid = validateForm();
    //     if (!isValid) return;

    //     // Prepare the booking details
    //     const bookingData = {
    //         date: selectedDate,
    //         timeSlot: selectedTimeSlot,
    //         theaterId: selectedTheater,
    //         userDetails: { name, email, phone },
    //         decorations: selectedDecorations,
    //         cake: selectedCake,
    //         addOns: { rose: selectedRose, photography: selectedPhotography },
    //         totalPrice: finalPrice,
    //         bookedAt: new Date().toISOString(),
    //         status: 'pending',
    //     };

    //     try {
    //         // Check time slot availability
    //         const isAvailable = await checkTimeSlotAvailability(bookingData.date, bookingData.timeSlot, bookingData.theaterId);
    //         if (!isAvailable) {
    //             alert('This time slot is already booked. Please choose another.');
    //             return;
    //         }

    //         // Save booking
    //         const bookingId = await saveBooking(bookingData);

    //         // Reserve time slot
    //         await reserveTimeSlot(bookingData.date, bookingData.timeSlot, bookingData.theaterId, bookingId);

    //         // Store booking details in state
    //         setBookingDetails({ ...bookingData, id: bookingId });

    //         // Proceed to payment
    //         handlePayment();
    //     } catch (error) {
    //         console.error('Error confirming booking:', error);
    //         alert('An error occurred. Please try again.');
    //     }
    // };

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

    // Render user details form
    const renderUserDetailsForm = () => (
        <motion.div
            key="userDetails"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="container mx-auto px-4 py-8"
        >
            <div className="max-w-2xl mx-auto bg-white rounded-xl p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-black mb-6">Enter Your Details</h2>
                <form onSubmit={handleUserDetailsSubmit}>
                    <div className="space-y-4">
                        {/* Name Field */}
                        <div className="flex flex-col">
                            <label className="text-black mb-1">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`bg-white text-black border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 ${errors.name ? 'focus:ring-red-500' : 'focus:ring-yellow-400'
                                    }`}
                                placeholder="Enter your name"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col">
                            <label className="text-black mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`bg-white text-black border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-yellow-400'
                                    }`}
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Phone Field */}
                        <div className="flex flex-col">
                            <label className="text-black mb-1">Phone Number</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className={`bg-white text-black border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 ${errors.phone ? 'focus:ring-red-500' : 'focus:ring-yellow-400'
                                    }`}
                                placeholder="Enter your phone number"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between mt-6">
                        {/* Back Button to Booking Summary */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setBookingStep('confirmation')} // Go back to Booking Summary
                            className="px-6 py-3 border-2 border-yellow-400 text-black rounded-lg flex items-center hover:bg-yellow-400 transition-colors"
                        >
                            <ChevronLeft className="h-5 w-5 mr-2" />
                            Back
                        </motion.button>

                        {/* Proceed to Payment Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handlePayment} // Proceed to Payment
                            className="px-6 py-3 bg-[#9f1d21] text-white rounded-lg font-bold flex items-center shadow-lg hover:bg-white hover:text-[#9f1d21] hover:border-[#9f1d21] hover:border-2 transition-colors"
                        >
                            Proceed to Payment
                            <Check className="h-5 w-5 ml-2" />
                        </motion.button>
                    </div>
                </form>
            </div>
        </motion.div>
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

    const handleCakeSelect = (cakeId, price, eggless) => {
        setselectedCake(cakeId); // Store the cake ID
        setIsEggless(eggless);
        setCakePrice(price);
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
        <div className="flex flex-col min-h-screen bg-white text-black">

            <BookHeader />

            <BookingHeader currentDate={currentDate} selectedDate={selectedDate} setSelectedDate={setSelectedDate} quote={quote} />

            {/* Main Content based on booking step */}
            <AnimatePresence mode="wait">
                {bookingStep === 'selection' && (
                    <motion.div
                        key="selection"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

                        {/* Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="container mx-auto px-4 pb-12"
                            >
                                {activeTab === 'theaters' && (
                                    <>
                                        <div className="text-center mb-8">
                                            <motion.h2
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-2xl md:text-3xl font-bold"
                                            >
                                                Book Your <span className="text-[#9f1d21]">Exclusive Private Theatre</span>
                                            </motion.h2>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "100px" }}
                                                transition={{ delay: 0.5 }}
                                                className="h-1 bg-[#9f1d21] mx-auto mt-3"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                        bookedTimeSlots={bookedTimeSlots.party || []} />
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
                        className="container mx-auto px-4"
                    >
                        <DecorationSelector
                            onSelect={handleDecorationSelect}
                            onBack={handleBackToSelection}
                            onNext={handleProceedToCake}
                            selectedDecorations={selectedDecorations}
                        />
                    </motion.div>
                )}

                {bookingStep === 'cake' && (
                    <motion.div
                        key="cake"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="container mx-auto px-4"
                    >
                        <CakeSelector
                            onSelect={handleCakeSelect}
                            onBack={handleBackToDecoration}
                            onNext={handleProceedToAddOns}
                            selectedCake={selectedCake}
                            isEggless={isEggless}
                        />
                    </motion.div>
                )}

                {bookingStep === 'addons' && (
                    <motion.div
                        key="addons"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="container mx-auto px-4"
                    >
                        <AddOnsSelector
                            onSelect={handleAddOnsSelect}
                            onBack={handleProceedToCake}
                            onNext={handleProceedToConfirmation}
                            selectedDecorations={selectedDecorations}
                            selectedRose={selectedRose}
                            selectedPhotography={selectedPhotography}
                        />
                    </motion.div>
                )}

                {bookingStep === 'confirmation' && (
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
                )}
                {bookingStep === 'userDetails' && renderUserDetailsForm()}

            </AnimatePresence>

            <NotesSection notes={notes} />
            {/* Success Modal */}
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
                        <p className="text-gray-700 mb-4">Your reservation has been confirmed. We&apos;ve sent the details to your email.</p>
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
