import { Link } from 'react-router-dom';

const RefundPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 sm:p-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <Link to="/" className="inline-block mb-6">
                        <img
                            src="/assets/logo.png"
                            alt="BingeHall"
                            className="h-12 md:h-16"
                        />
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Refund Policy</h1>
                    {/* <p className="text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p> */}
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none text-gray-700">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 text-center text-[#9f1d21]">
                        Our Commitment to Your Peace of Mind
                    </h2>
                    <p className="mb-6 text-center">
                        At BingeHall, we prioritize transparency and fairness in all transactions.
                    </p>

                    <div className="space-y-6">
                        {/* 1. Advance Payment */}
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9f1d21]">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Advance Payment Requirement</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>₹700 advance payment required to confirm bookings</li>
                                <li>Ensures we reserve your slot and prepare for your experience</li>
                            </ul>
                        </div>

                        {/* 2. Non-Refundable Policy */}
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9f1d21]">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Non-Refundable Nature</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>The ₹700 advance is <strong>strictly non-refundable</strong> under any circumstances</li>
                                <li>Covers administrative and preparation costs</li>
                            </ul>
                        </div>

                        {/* 3. Cancellation Window */}
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9f1d21]">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Cancellation Timeframe</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Free cancellations allowed <strong>before 72 hours</strong> of event</li>
                                <li>No additional charges beyond the non-refundable advance</li>
                                <li>Must be requested via email to bingehall08@gmail.com</li>
                            </ul>
                        </div>

                        {/* 4. Late Cancellations */}
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9f1d21]">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Late Cancellations (Within 72 Hours)</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>No refunds</strong> for cancellations within 72 hours</li>
                                <li>Full booking amount will be charged</li>
                                <li>Applies to rescheduling requests as well</li>
                            </ul>
                        </div>

                        {/* 5. No-Shows */}
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9f1d21]">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">5. No-Show Policy</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>100% non-refundable</strong> for no-shows</li>
                                <li>Applies if guests arrive 30 minutes late without notice</li>
                                <li>Venue reserves right to reallocate the slot</li>
                            </ul>
                        </div>

                        {/* 6. Refund Processing */}
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9f1d21]">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Refund Processing Details</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Approved refunds processed in <strong>7 working days</strong></li>
                                <li>Credited to original payment method only</li>
                                <li>Bank processing times may cause additional delays</li>
                            </ul>
                        </div>

                        {/* 7. Special Cases */}
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9f1d21]">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">7. Exceptional Circumstances</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Natural disasters/government restrictions: Credit voucher issued</li>
                                <li>Medical emergencies (with documentation): 50% credit</li>
                                <li>All exceptions at management&apos;s discretion</li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9f1d21] text-center">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Need Assistance?</h3>
                            <p className="mb-4">
                                Email us at <strong>bingehall08@gmail.com</strong> or call <strong>+919100111402</strong>
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link
                                    to="/contact"
                                    className="bg-[#9f1d21] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#b12329] transition-colors"
                                >
                                    Contact Form
                                </Link>
                                <a
                                    href="tel:+919100111402"
                                    className="border border-[#9f1d21] text-[#9f1d21] px-6 py-2 rounded-full font-semibold hover:bg-[#9f1d21]/10 transition-colors"
                                >
                                    Call Now
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 text-center border-t pt-8">
                        <p className="text-gray-600 mb-4">
                            By making a booking, you agree to these terms.
                        </p>
                        <Link
                            to="/"
                            className="inline-block bg-[#9f1d21] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#b12329] transform hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Back to Homepage
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RefundPolicy;