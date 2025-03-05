// src/components/BookingSteps.js
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import DecorationSelector from './Decoration';
import CakeSelector from './Cake';
import AddOnsSelector from './Adds';
import { theaters } from './data/theaters';
import { timeSlots } from './data/constants';

const BookingSteps = ({
    bookingStep,
    setBookingStep,
    selectedTheater,
    selectedTimeSlot,
    isDecorationSelected,
    decorationPrice,
    cakeSelected,
    cakePrice,
    isEggless,
    selectedDecorations,
    selectedRose,
    selectedPhotography,
    finalPrice,
    handleDecorationSelect,
    handleCakeSelect,
    handleAddOnsSelect,
    handleBackToSelection,
    handleBackToDecoration,
    handleProceedToCake,
    handleProceedToAddOns,
    handleProceedToConfirmation,
}) => {
    return (
        <AnimatePresence mode="wait">
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
                        decorationPrice={decorationPrice}
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
                    />
                </motion.div>
            )}

            {bookingStep === 'confirmation' && (
                <motion.div
                    key="confirmation"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="container mx-auto px-4 py-8"
                >
                    <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Confirm Your Booking</h2>
                        <p className="mb-6">Please confirm your booking details</p>

                        <div className="mb-6">
                            <p className="font-bold">Selected Venue:</p>
                            <p>{selectedTheater === 'party' ? 'Premium Party Hall' : theaters.find(t => t.id === selectedTheater)?.name}</p>
                        </div>

                        <div className="mb-6">
                            <p className="font-bold">Time Slot:</p>
                            <p>{selectedTimeSlot?.startsWith('party-')
                                ? timeSlots[parseInt(selectedTimeSlot.split('-')[1])]
                                : timeSlots[selectedTimeSlot] || 'Not selected'}</p>
                        </div>

                        <div className="mb-6">
                            <p className="font-bold">Decoration:</p>
                            <p>{isDecorationSelected ? `Yes (₹${decorationPrice})` : 'None'}</p>
                        </div>

                        <div className="mb-6">
                            <p className="font-bold">Cake:</p>
                            <p>{cakeSelected ? `Yes (₹${cakePrice})${isEggless ? ' - Eggless' : ''}` : 'None'}</p>
                        </div>

                        <div className="mb-6">
                            <p className="font-bold">Add-ons:</p>
                            <ul>
                                {selectedDecorations.map((dec, index) => (
                                    dec && dec.name && dec.price ? (
                                        <li key={index}>{dec.name} (₹{dec.price})</li>
                                    ) : null
                                ))}
                                {selectedRose && (
                                    <li>{selectedRose.name} (₹{selectedRose.price})</li>
                                )}
                                {selectedPhotography && (
                                    <li>{selectedPhotography.name} (₹{selectedPhotography.price})</li>
                                )}
                            </ul>
                        </div>

                        <div className="mb-8">
                            <p className="font-bold text-xl">Total Price:</p>
                            <p className="text-yellow-400 text-2xl font-bold">₹{finalPrice}/-</p>
                        </div>

                        <div className="flex justify-between">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setBookingStep('addons')}
                                className="px-6 py-3 border border-yellow-400 text-yellow-400 rounded"
                            >
                                Back
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleProceedToConfirmation}
                                className="px-6 py-3 bg-yellow-400 text-black rounded font-bold"
                            >
                                Confirm Booking
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

BookingSteps.propTypes = {
    bookingStep: PropTypes.string.isRequired,
    setBookingStep: PropTypes.func.isRequired,
    selectedTheater: PropTypes.string,
    selectedTimeSlot: PropTypes.string,
    isDecorationSelected: PropTypes.bool,
    decorationPrice: PropTypes.number,
    cakeSelected: PropTypes.bool,
    cakePrice: PropTypes.number,
    isEggless: PropTypes.bool,
    selectedDecorations: PropTypes.arrayOf(PropTypes.object),
    selectedRose: PropTypes.object,
    selectedPhotography: PropTypes.object,
    finalPrice: PropTypes.number,
    handleDecorationSelect: PropTypes.func.isRequired,
    handleCakeSelect: PropTypes.func.isRequired,
    handleAddOnsSelect: PropTypes.func.isRequired,
    handleBackToSelection: PropTypes.func.isRequired,
    handleBackToDecoration: PropTypes.func.isRequired,
    handleProceedToCake: PropTypes.func.isRequired,
    handleProceedToAddOns: PropTypes.func.isRequired,
    handleProceedToConfirmation: PropTypes.func.isRequired,
};

export default BookingSteps;