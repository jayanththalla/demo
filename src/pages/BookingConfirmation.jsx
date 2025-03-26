import { Calendar, Building, Clock, Sparkles, Cake, Plus, ChevronLeft, Check, UserPlus, Minus } from 'lucide-react';
import { useState, useEffect } from 'react';

const BookingConfirmation = ({
    selectedTheater,
    theaters,
    selectedTimeSlot,
    timeSlots,
    guestCount,
    setGuestCount,
    selectedDecorations,
    setSelectedDecorations,
    selectedCake,
    isEggless,
    selectedRose,
    selectedPhotography,
    finalPrice,
    setBookingStep,
    handleProceedToUserDetails,
    decorationOptions,
    cakeOptions,
    decorations,
    roses,
    photography,
}) => {
    const [selectedPayment, setSelectedPayment] = useState('full');
    const [advanceAmount, setAdvanceAmount] = useState(Math.max(5, Math.floor(finalPrice * 0.3)));
    const [showPaymentSection, setShowPaymentSection] = useState(false);

    // Ensure advance amount is within valid range
    useEffect(() => {
        const minAdvance = 500;
        const maxAdvance = finalPrice - 1;

        if (advanceAmount < minAdvance) {
            setAdvanceAmount(minAdvance);
        } else if (advanceAmount > maxAdvance) {
            setAdvanceAmount(maxAdvance);
        }
    }, [advanceAmount, finalPrice]);

    const handleProceedToPayment = () => {
        setShowPaymentSection(true);
    };

    const handleBackFromPayment = () => {
        setShowPaymentSection(false);
    };

    return (
        <div className="max-w-2xl mx-auto bg-gray-100 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#9f1d21]">Confirm Your Booking</h2>
                <div className="h-10 w-10 bg-[#9f1d21] rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                </div>
            </div>

            <p className="mb-6 text-gray-700">Please review and confirm your booking details below</p>

            <div className="space-y-4">
                {/* Venue Section */}
                <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Building className="h-5 w-5 text-yellow-400 mr-2" />
                            <p className="font-bold text-yellow-400">Selected Venue</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-white ml-7">
                            {selectedTheater === 'party'
                                ? 'Premium Party Hall'
                                : theaters.find(t => t.id === selectedTheater)?.name}
                        </p>
                        <p className="text-yellow-400 font-semibold">
                            ₹{selectedTheater === 'party'
                                ? '3999'
                                : theaters.find(t => t.id === selectedTheater)?.basePrice}
                        </p>
                    </div>
                </div>

                {/* Time Slot */}
                <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center">
                        <Clock className="h-5 w-5 text-yellow-400 mr-2" />
                        <p className="font-bold text-yellow-400">Time Slot</p>
                    </div>
                    <p className="ml-7 text-white mt-2">
                        {selectedTimeSlot
                            ? selectedTimeSlot.startsWith('party-')
                                ? timeSlots[parseInt(selectedTimeSlot.split('-')[1])]
                                : timeSlots[parseInt(selectedTimeSlot)]
                            : 'Not selected'}
                    </p>
                </div>

                {/* Extra Persons */}
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <UserPlus className="h-5 w-5 text-yellow-400 mr-2" />
                            <p className="font-bold text-yellow-400">Add Person</p>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center">
                        <div className="flex items-center ml-7">
                            <button
                                onClick={() => guestCount > 1 ? setGuestCount(guestCount - 1) : null}
                                className="h-8 w-8 rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600"
                            >
                                <Minus className="h-4 w-4" />
                            </button>

                            <span className="mx-4 text-white font-medium text-lg">{guestCount}</span>

                            <button
                                onClick={() => setGuestCount(guestCount + 1)}
                                className="h-8 w-8 rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="ml-auto text-yellow-400 font-semibold">
                            ₹{guestCount > (selectedTheater === 'party' ? 1 : theaters.find(t => t.id === selectedTheater)?.minPeople || 1)
                                ? (guestCount - (selectedTheater === 'party' ? 1 : theaters.find(t => t.id === selectedTheater)?.minPeople || 1)) * 200
                                : 0}
                        </div>
                    </div>

                    <p className="text-gray-400 text-sm mt-2 ml-7">
                        Base price includes {selectedTheater === 'party' ? 1 : theaters.find(t => t.id === selectedTheater)?.minPeople || 1} {(selectedTheater === 'party' ? 1 : theaters.find(t => t.id === selectedTheater)?.minPeople || 1) > 1 ? 'persons' : 'person'}.
                        Each additional person costs ₹200.
                    </p>
                </div>

                {/* Decoration */}
                <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Sparkles className="h-5 w-5 text-yellow-400 mr-2" />
                            <p className="font-bold text-yellow-400">Decoration</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <p className="ml-7 text-white">
                            {selectedDecorations.length > 0 ? 'Yes' : 'None'}
                        </p>
                        {selectedDecorations.length > 0 && (
                            <p className="text-yellow-400 font-semibold">
                                ₹{decorationOptions.find(d => d.id === selectedDecorations[0])?.price || 0}
                            </p>
                        )}
                    </div>
                </div>

                {/* Cake */}
                <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Cake className="h-5 w-5 text-yellow-400 mr-2" />
                            <p className="font-bold text-yellow-400">Cake</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <p className="ml-7 text-white">
                            {selectedCake ? (
                                <>
                                    Yes
                                    {isEggless && (
                                        <span className="ml-2 px-2 py-0.5 bg-green-800 text-green-200 text-xs rounded-full">Eggless</span>
                                    )}
                                </>
                            ) : 'None'}
                        </p>
                        {selectedCake && (
                            <p className="text-yellow-400 font-semibold">
                                ₹{cakeOptions.find(c => c.id === selectedCake)?.price || 0}
                            </p>
                        )}
                    </div>
                </div>

                {/* Add-ons */}
                <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Plus className="h-5 w-5 text-yellow-400 mr-2" />
                            <p className="font-bold text-yellow-400">Add-ons</p>
                        </div>
                    </div>
                    {(selectedDecorations.length > 0 || selectedRose || selectedPhotography) ? (
                        <ul className="ml-7 space-y-1.5 mt-2">
                            {selectedDecorations.map((id) => {
                                const item = decorations.find(d => d.id === id);
                                return item ? (
                                    <li key={item.id} className="flex justify-between">
                                        <span className="text-white">{item.name}</span>
                                        <span className="text-yellow-400">₹{item.price}</span>
                                    </li>
                                ) : null;
                            })}
                            {selectedRose && (
                                <li className="flex justify-between">
                                    <span className="text-white">{roses.find(r => r.id === selectedRose)?.name}</span>
                                    <span className="text-yellow-400">₹{roses.find(r => r.id === selectedRose)?.price}</span>
                                </li>
                            )}
                            {selectedPhotography && (
                                <li className="flex justify-between">
                                    <span className="text-white">{photography.find(p => p.id === selectedPhotography)?.name}</span>
                                    <span className="text-yellow-400">₹{photography.find(p => p.id === selectedPhotography)?.price}</span>
                                </li>
                            )}
                        </ul>
                    ) : (
                        <p className="ml-7 text-white mt-2">None</p>
                    )}
                </div>
            </div>

            <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-yellow-500/30">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-xl text-white">Total Price:</p>
                    <p className="text-yellow-400 text-3xl font-bold">₹{finalPrice}/-</p>
                </div>
            </div>

            {!showPaymentSection ? (
                <>
                    {/* Payment Selection */}
                    <div className="mt-6 space-y-4">
                        <div className="bg-gray-800 rounded-lg p-4 border border-yellow-500/30">
                            <h3 className="text-lg font-bold text-yellow-400 mb-3">Select Payment Option</h3>

                            {/* Full Payment */}
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="paymentOption"
                                            checked={selectedPayment === 'full'}
                                            onChange={() => setSelectedPayment('full')}
                                            className="mr-2"
                                        />
                                        <span className="text-white">Pay Full Amount</span>
                                    </label>
                                    <p className="text-gray-400 text-sm ml-6">₹{finalPrice}</p>
                                </div>
                            </div>

                            {/* Partial Payment */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="paymentOption"
                                            checked={selectedPayment === 'partial'}
                                            onChange={() => setSelectedPayment('partial')}
                                            className="mr-2"
                                        />
                                        <span className="text-white">Pay Advance Amount</span>
                                    </label>
                                    <div className="flex items-center ml-6 mt-1">
                                        <span className="text-gray-400 mr-2">₹</span>
                                        <input
                                            type="number"
                                            value={advanceAmount}
                                            onChange={(e) => {
                                                const value = Math.max(500, Number(e.target.value));
                                                setAdvanceAmount(Math.min(finalPrice - 1, value));
                                            }}
                                            min={500}
                                            max={finalPrice - 1}
                                            className="w-24 bg-gray-700 text-white px-2 py-1 rounded"
                                            disabled={selectedPayment !== 'partial'}
                                        />
                                        <span className="text-gray-400 text-sm ml-2">
                                            (Min ₹500, remaining ₹{finalPrice - advanceAmount} to be paid later)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={() => setBookingStep('addons')}
                            className="px-6 py-3 border border-[#9f1d21] text-[#9f1d21] rounded-lg flex items-center hover:bg-[#9f1d21] hover:text-white transition-colors"
                        >
                            <ChevronLeft className="h-5 w-5 mr-2" />
                            Back
                        </button>

                        <button
                            onClick={handleProceedToPayment}
                            className="px-6 py-3 bg-[#9f1d21] text-white rounded-lg font-bold flex items-center shadow-lg hover:bg-[#8a191d] transition-colors"
                        >
                            {selectedPayment === 'full' ? (
                                <>Proceed to Pay ₹{finalPrice}</>
                            ) : (
                                <>Proceed to Pay Advance (₹{advanceAmount})</>
                            )}
                            <ChevronLeft className="h-5 w-5 ml-2 transform rotate-180" />
                        </button>
                    </div>
                </>
            ) : (
                <>
                    {/* Payment Confirmation Section */}
                    <div className="mt-6 bg-gray-800 rounded-lg p-4 border border-yellow-500/30">
                        <h3 className="text-lg font-bold text-yellow-400 mb-3">
                            {selectedPayment === 'full' ? 'Full Payment' : 'Advance Payment'} Details
                        </h3>

                        <div className="flex justify-between items-center mb-4">
                            <p className="text-white">
                                {selectedPayment === 'full' ? 'Total Amount' : 'Advance Amount'}
                            </p>
                            <p className="text-yellow-400 font-bold">
                                ₹{selectedPayment === 'full' ? finalPrice : advanceAmount}
                            </p>
                        </div>

                        {selectedPayment === 'partial' && (
                            <div className="mb-4 p-3 bg-gray-700 rounded-lg">
                                <p className="text-yellow-300 text-sm">
                                    Note: Remaining ₹{finalPrice - advanceAmount} to be paid later
                                </p>
                            </div>
                        )}

                        <div className="flex justify-between mt-6">
                            <button
                                onClick={handleBackFromPayment}
                                className="px-4 py-2 border border-gray-500 text-gray-300 rounded-lg flex items-center hover:bg-gray-700 transition-colors"
                            >
                                <ChevronLeft className="h-5 w-5 mr-1" />
                                Back
                            </button>

                            <button
                                onClick={() => handleProceedToUserDetails(selectedPayment, selectedPayment === 'full' ? finalPrice : advanceAmount)}
                                className="px-6 py-3 bg-[#9f1d21] text-white rounded-lg font-bold flex items-center shadow-lg hover:bg-[#8a191d] transition-colors"
                            >
                                Continue to User Details
                                <ChevronLeft className="h-5 w-5 ml-2 transform rotate-180" />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default BookingConfirmation;
