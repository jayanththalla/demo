import { Calendar, Building, Clock, Sparkles, Cake, Plus, ChevronLeft, Check, UserPlus, Minus, Tag, Gift } from 'lucide-react';
import { useState, useEffect } from 'react';

const BookingConfirmation = ({
    selectedTheater,
    theaters,
    selectedTimeSlot,
    timeSlots,
    guestCount,
    setGuestCount,
    selectedDecorations,
    selectedCake,
    isEggless,
    cakeName, // Add this prop
    selectedRose,
    selectedPhotography,
    finalPrice,
    setBookingStep,
    handleProceedToUserDetails,
    decorationOptions,
    cakeOptions,
    roses,
    photography,

}) => {
    const [selectedPayment, setSelectedPayment] = useState('full');
    const [advanceAmount, setAdvanceAmount] = useState(Math.max(500, Math.floor(finalPrice * 0.3)));
    const [showPaymentSection, setShowPaymentSection] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [referralCode, setReferralCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [referralDiscount, setReferralDiscount] = useState(0);
    const [convenienceFee] = useState(50);
    const [showCouponInput, setShowCouponInput] = useState(false);
    const [showReferralInput, setShowReferralInput] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState('');
    const [appliedReferral, setAppliedReferral] = useState('');
    // Calculate the payable amount
    const subtotal = finalPrice;
    const totalAfterDiscount = subtotal - discount;
    const payableAmount = selectedPayment === 'full'
        ? totalAfterDiscount + convenienceFee
        : Math.min(advanceAmount, totalAfterDiscount) + convenienceFee;

    // Ensure advance amount is within valid range
    useEffect(() => {
        const minAdvance = 500;
        const maxAdvance = totalAfterDiscount - 1;

        if (advanceAmount < minAdvance) {
            setAdvanceAmount(minAdvance);
        } else if (advanceAmount > maxAdvance) {
            setAdvanceAmount(maxAdvance);
        }
    }, [advanceAmount, totalAfterDiscount]);

    // Update total discount when either coupon or referral discount changes
    useEffect(() => {
        setDiscount(couponDiscount + referralDiscount);
    }, [couponDiscount, referralDiscount]);

    const handleApplyCoupon = () => {
        // Prevent applying a coupon if one is already applied
        if (appliedCoupon) {
            alert('You already have an applied coupon. Please remove it first.');
            return;
        }

        // In a real app, you would validate the coupon with your backend
        if (couponCode === 'WELCOME100') {
            setCouponDiscount(100);
            setAppliedCoupon('WELCOME100');
            setShowCouponInput(false);
        } else if (couponCode === 'MOVIE50') {
            setCouponDiscount(50);
            setAppliedCoupon('MOVIE50');
            setShowCouponInput(false);
        } else {
            setCouponDiscount(0);
            setAppliedCoupon('');
            alert('Invalid coupon code');
        }
    };

    const handleRemoveCoupon = () => {
        setCouponDiscount(0);
        setAppliedCoupon('');
        setCouponCode('');
    };

    const handleApplyReferral = () => {
        // Prevent applying a referral if one is already applied
        if (appliedReferral) {
            alert('You already have an applied referral code. Please remove it first.');
            return;
        }

        // In a real app, you would validate the referral code with your backend
        if (referralCode === 'FRIEND100') {
            setReferralDiscount(100);
            setAppliedReferral('FRIEND100');
            setShowReferralInput(false);
        } else {
            alert('Invalid referral code');
        }
    };

    const handleRemoveReferral = () => {
        setReferralDiscount(0);
        setAppliedReferral('');
        setReferralCode('');
    };

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
                {/* Decoration Section */}
                <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Sparkles className="h-5 w-5 text-yellow-400 mr-2" />
                            <p className="font-bold text-yellow-400">Decoration</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <div className="ml-7">
                            {selectedDecorations.length > 0 ? (
                                <div className="space-y-2">
                                    <div className="flex items-center text-white">
                                        <span>
                                            {decorationOptions.find(d => d.id === selectedDecorations[0])?.name}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <span className="text-white">None</span>
                            )}
                        </div>
                        {selectedDecorations.length > 0 && (
                            <p className="text-yellow-400 font-semibold">
                                ₹{decorationOptions.find(d => d.id === selectedDecorations[0])?.price || 0}
                            </p>
                        )}
                    </div>

                </div>


                {/* Cake Section */}
                <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Cake className="h-5 w-5 text-yellow-400 mr-2" />
                            <p className="font-bold text-yellow-400">Cake</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <div className="ml-7">
                            {selectedCake ? (
                                <div className="space-y-2">
                                    <div className="flex items-center text-white">
                                        <span>{cakeOptions.find(c => c.id === selectedCake)?.name}</span>
                                        {isEggless && (
                                            <span className="ml-2 px-2 py-0.5 bg-green-800 text-green-200 text-xs rounded-full">
                                                Eggless
                                            </span>
                                        )}
                                    </div>
                                    {cakeName && (
                                        <p className="text-gray-300 text-sm">
                                            Message: "{cakeName}"
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <span className="text-white">None</span>
                            )}
                        </div>
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
                    {(selectedRose || selectedPhotography) ? (
                        <ul className="ml-7 space-y-1.5 mt-2">
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

            {/* Pricing Breakdown */}
            <div className="mt-6 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Price Details</h3>

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">₹{subtotal}</span>
                    </div>

                    {couponDiscount > 0 && (
                        <div className="flex justify-between">
                            <span className="text-gray-600">Coupon Discount</span>
                            <span className="text-green-600 font-medium">-₹{couponDiscount}</span>
                        </div>
                    )}

                    {referralDiscount > 0 && (
                        <div className="flex justify-between">
                            <span className="text-gray-600">Referral Discount</span>
                            <span className="text-green-600 font-medium">-₹{referralDiscount}</span>
                        </div>
                    )}

                    <div className="flex justify-between">
                        <span className="text-gray-600">Convenience Fee</span>
                        <span className="font-medium">₹{convenienceFee}</span>
                    </div>

                    <div className="border-t border-gray-200 my-2"></div>

                    <div className="flex justify-between">
                        <span className="text-gray-800 font-bold">Total Payable</span>
                        <span className="text-[#9f1d21] font-bold">₹{payableAmount}</span>
                    </div>
                </div>
            </div>

            {/* Coupon and Referral Section */}
            <div className="mt-4 space-y-3">
                {!showCouponInput ? (
                    <button
                        onClick={() => appliedCoupon ? handleRemoveCoupon() : setShowCouponInput(true)}
                        className="w-full flex items-center justify-between bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition-colors"
                    >
                        <div className="flex items-center">
                            <Tag className="h-5 w-5 text-[#9f1d21] mr-2" />
                            <span className="text-gray-700">
                                {appliedCoupon ? `Coupon Applied: ${appliedCoupon} (₹${couponDiscount} OFF)` : 'Have a coupon code?'}
                            </span>
                        </div>
                        <span className="text-[#9f1d21] font-medium">
                            {appliedCoupon ? 'Remove' : 'Apply'}
                        </span>
                    </button>
                ) : (
                    <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex items-center mb-2">
                            <Tag className="h-5 w-5 text-[#9f1d21] mr-2" />
                            <span className="text-gray-700">Coupon Code</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Enter coupon code"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9f1d21]"
                            />
                            <button
                                onClick={handleApplyCoupon}
                                className="px-4 py-2 bg-[#9f1d21] text-white rounded-md hover:bg-[#8a191d] transition-colors"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                )}

                {!showReferralInput ? (
                    <button
                        onClick={() => appliedReferral ? handleRemoveReferral() : setShowReferralInput(true)}
                        className="w-full flex items-center justify-between bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition-colors"
                    >
                        <div className="flex items-center">
                            <Gift className="h-5 w-5 text-[#9f1d21] mr-2" />
                            <span className="text-gray-700">
                                {appliedReferral ? `Referral Applied: ${appliedReferral} (₹${referralDiscount} OFF)` : 'Have a referral code?'}
                            </span>
                        </div>
                        <span className="text-[#9f1d21] font-medium">
                            {appliedReferral ? 'Remove' : 'Apply'}
                        </span>
                    </button>
                ) : (
                    <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex items-center mb-2">
                            <Gift className="h-5 w-5 text-[#9f1d21] mr-2" />
                            <span className="text-gray-700">Referral Code</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={referralCode}
                                onChange={(e) => setReferralCode(e.target.value)}
                                placeholder="Enter referral code"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9f1d21]"
                            />
                            <button
                                onClick={handleApplyReferral}
                                className="px-4 py-2 bg-[#9f1d21] text-white rounded-md hover:bg-[#8a191d] transition-colors"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {!showPaymentSection ? (
                <>
                    {/* Payment Selection */}
                    <div className="mt-6 space-y-4">
                        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-3">Select Payment Option</h3>

                            {/* Full Payment */}
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="paymentOption"
                                            checked={selectedPayment === 'full'}
                                            onChange={() => setSelectedPayment('full')}
                                            className="mr-2 h-4 w-4 text-[#9f1d21] focus:ring-[#9f1d21]"
                                        />
                                        <span className="text-gray-800">Pay Full Amount</span>
                                    </label>
                                    <p className="text-gray-500 text-sm ml-6">₹{payableAmount}</p>
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
                                            className="mr-2 h-4 w-4 text-[#9f1d21] focus:ring-[#9f1d21]"
                                        />
                                        <span className="text-gray-800">Pay Advance Amount</span>
                                    </label>
                                    <div className="ml-6 mt-1">
                                        <div className="flex items-center">
                                            <span className="text-gray-500 mr-2">₹</span>
                                            <input
                                                type="number"
                                                value={advanceAmount}
                                                onChange={(e) => {
                                                    const value = Math.max(500, Number(e.target.value));
                                                    setAdvanceAmount(Math.min(totalAfterDiscount - 1, value));
                                                }}
                                                min={500}
                                                max={totalAfterDiscount - 1}
                                                className="w-24 bg-white border border-gray-300 text-gray-800 px-2 py-1 rounded focus:ring-[#9f1d21] focus:border-[#9f1d21]"
                                                disabled={selectedPayment !== 'partial'}
                                            />
                                        </div>
                                        <p className="text-gray-500 text-xs mt-1">
                                            (Min ₹500, remaining ₹{totalAfterDiscount - advanceAmount} to be paid later)
                                        </p>
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
                                <>Proceed to Pay ₹{payableAmount}</>
                            ) : (
                                <>Proceed to Pay Advance (₹{advanceAmount + convenienceFee})</>
                            )}
                            <ChevronLeft className="h-5 w-5 ml-2 transform rotate-180" />
                        </button>
                    </div>
                </>
            ) : (
                <>
                    {/* Payment Confirmation Section */}
                    <div className="mt-6 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-3">
                            {selectedPayment === 'full' ? 'Full Payment' : 'Advance Payment'} Summary
                        </h3>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">₹{subtotal}</span>
                            </div>

                            {couponDiscount > 0 && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Coupon Discount</span>
                                    <span className="text-green-600 font-medium">-₹{couponDiscount}</span>
                                </div>
                            )}

                            {referralDiscount > 0 && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Referral Discount</span>
                                    <span className="text-green-600 font-medium">-₹{referralDiscount}</span>
                                </div>
                            )}

                            <div className="flex justify-between">
                                <span className="text-gray-600">Convenience Fee</span>
                                <span className="font-medium">₹{convenienceFee}</span>
                            </div>

                            <div className="border-t border-gray-200 my-2"></div>

                            <div className="flex justify-between">
                                <span className="text-gray-800 font-bold">
                                    {selectedPayment === 'full' ? 'Total Amount' : 'Advance Amount'}
                                </span>
                                <span className="text-[#9f1d21] font-bold">
                                    ₹{selectedPayment === 'full' ? payableAmount : advanceAmount + convenienceFee}
                                </span>
                            </div>

                            {selectedPayment === 'partial' && (
                                <>
                                    <div className="border-t border-gray-200 my-2"></div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Balance Amount</span>
                                        <span className="font-medium">₹{totalAfterDiscount - advanceAmount}</span>
                                    </div>
                                    <div className="bg-yellow-50 p-2 rounded text-sm text-yellow-800">
                                        Note: Remaining ₹{totalAfterDiscount - advanceAmount} to be paid later
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex justify-between mt-6">
                            <button
                                onClick={handleBackFromPayment}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg flex items-center hover:bg-gray-100 transition-colors"
                            >
                                <ChevronLeft className="h-5 w-5 mr-1" />
                                Back
                            </button>

                            <button
                                onClick={() => handleProceedToUserDetails(selectedPayment, selectedPayment === 'full' ? payableAmount : advanceAmount + convenienceFee)}
                                className="px-6 py-3 bg-[#9f1d21] text-white rounded-lg font-bold flex items-center shadow-lg hover:bg-[#8a191d] transition-colors"
                            >
                                Continue to Payment
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