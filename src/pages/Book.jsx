import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import BookHeader from './BookHeader';
import Tabs from './Tabs';
import TheaterCard from './TheaterCard';
import PartyHallDetails from './PartyHallDetails';
import SuccessModal from './SuccessModal';
import BookingSteps from './BookingSteps';
import NotesSection from './Notes';
import useBooking from '../hooks/useBooking';
import { theaters } from './data/theaters';
import { timeSlots, notes } from './data/constants';
import BookingModal from './Booking';

const Book = () => {

    const [activeTab, setActiveTab] = useState('theaters');
    const [bookingStep, setBookingStep] = useState('selection');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [guestCount, setGuestCount] = useState(1);
    const [bookedTimeslots, setBookedTimeslots] = useState([]);



    const {
        selectedTheater,
        setSelectedTheater,
        isDecorationSelected,
        setIsDecorationSelected,
        decorationPrice,
        setDecorationPrice,
        cakeSelected,
        setCakeSelected,
        cakePrice,
        setCakePrice,
        isEggless,
        setIsEggless,
        selectedDecorations,
        setSelectedDecorations,
        selectedRose,
        setSelectedRose,
        selectedPhotography,
        setSelectedPhotography,
        finalPrice,
        handleConfirmBooking,
    } = useBooking();

    const handleProceedToConfirmation = () => {
        setShowBookingModal(true);
    };

    const handleUserDetailsSubmit = async (userDetails) => {
        const success = await handleConfirmBooking(userDetails, selectedTimeSlot);
        if (success) {
            setBookingSuccess(true);
            setShowBookingModal(false);
            setBookedTimeslots([...bookedTimeslots, selectedTimeSlot]);
        }
    };

    // Reset all selections when going back to initial selection
    const resetAllSelections = () => {
        setSelectedTheater(null);
        setSelectedTimeSlot(null);
        setIsDecorationSelected(false);
        setDecorationPrice(0);
        setCakeSelected(false);
        setCakePrice(0);
        setIsEggless(false);
        setSelectedDecorations([]);
        setSelectedRose(null);
        setSelectedPhotography(null);
        setBookingStep('selection');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
            <BookHeader />
            <div className="container mx-auto px-4 py-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col md:flex-row justify-between items-center bg-gray-800 rounded-lg p-4 shadow-lg mb-8"
                >
                    <div className="flex items-center text-lg">
                        <Calendar className="mr-2 text-yellow-400" />
                        <p><span className="font-bold">Today:</span> {new Date().toLocaleDateString()}</p>
                    </div>
                    <p className="text-lg mt-2 md:mt-0 text-yellow-400 italic">
                        Book your spot for an unforgettable experience today!
                    </p>
                </motion.div>
            </div>

            <AnimatePresence mode="wait">
                {bookingStep === 'selection' && (
                    <motion.div
                        key="selection"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
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
                                            Book Your <span className="text-yellow-400">Exclusive Private Theatre</span>
                                        </motion.h2>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "100px" }}
                                            transition={{ delay: 0.5 }}
                                            className="h-1 bg-yellow-400 mx-auto mt-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {theaters.map((theater) => (
                                            <TheaterCard
                                                key={theater.id}
                                                theater={theater}
                                                selectedTimeSlot={selectedTimeSlot}
                                                setSelectedTimeSlot={setSelectedTimeSlot}
                                                handleBookNow={() => {
                                                    setSelectedTheater(theater.id);
                                                    setBookingStep('decoration');
                                                }}
                                                timeSlots={timeSlots}
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
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )}

                {bookingStep !== 'selection' && (
                    <BookingSteps
                        bookingStep={bookingStep}
                        setBookingStep={setBookingStep}
                        selectedTheater={selectedTheater}
                        selectedTimeSlot={selectedTimeSlot}
                        isDecorationSelected={isDecorationSelected}
                        decorationPrice={decorationPrice}
                        cakeSelected={cakeSelected}
                        cakePrice={cakePrice}
                        isEggless={isEggless}
                        selectedDecorations={selectedDecorations}
                        selectedRose={selectedRose}
                        selectedPhotography={selectedPhotography}
                        finalPrice={finalPrice}
                        handleDecorationSelect={(isSelected, price) => {
                            setIsDecorationSelected(isSelected);
                            setDecorationPrice(price);
                        }}
                        handleCakeSelect={(isSelected, price, eggless) => {
                            setCakeSelected(isSelected);
                            setCakePrice(price);
                            setIsEggless(eggless);
                        }}
                        handleAddOnsSelect={(selections) => {
                            setSelectedDecorations(selections.decorations || []);
                            setSelectedRose(selections.rose || null);
                            setSelectedPhotography(selections.photography || null);
                        }}
                        handleBackToSelection={() => resetAllSelections()}
                        handleBackToDecoration={() => setBookingStep('decoration')}
                        handleProceedToCake={() => setBookingStep('cake')}
                        handleProceedToAddOns={() => setBookingStep('addons')}
                        handleProceedToConfirmation={handleProceedToConfirmation}
                    />
                )}
            </AnimatePresence>

            <NotesSection notes={notes} />

            {bookingSuccess && (
                <SuccessModal
                    onClose={() => {
                        setBookingSuccess(false);
                        resetAllSelections();
                    }}
                />
            )}

            {showBookingModal && (
                <BookingModal
                    isOpen={showBookingModal}
                    onClose={() => setShowBookingModal(false)}
                    selectedTheater={selectedTheater}
                    theaters={theaters}
                    guestCount={guestCount}
                    setGuestCount={setGuestCount}
                    isDecorationSelected={isDecorationSelected}
                    setIsDecorationSelected={setIsDecorationSelected}
                    cakeSelected={cakeSelected}
                    cakePrice={cakePrice}
                    isEggless={isEggless}
                    selectedDecorations={selectedDecorations}
                    selectedRose={selectedRose}
                    selectedPhotography={selectedPhotography}
                    finalPrice={finalPrice}
                    onSubmitBooking={handleUserDetailsSubmit}
                />
            )}
        </div>
    );
};

export default Book;