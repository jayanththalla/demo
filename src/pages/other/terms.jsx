import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
    const [clicks, setClicks] = useState(0);
    const navigate = useNavigate();

    // Add secret trigger
    const handleLogoClick = (e) => {
        e.preventDefault();
        setClicks(prev => {
            if (prev === 2) { // On third click
                setTimeout(() => {
                    navigate('/admin');
                }, 300);
                return 0;
            }
            return prev + 1;
        });

        // Reset clicks after 2 seconds of inactivity
        setTimeout(() => {
            setClicks(0);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 sm:p-8">
                {/* Header - Modified with click handler */}
                <div className="text-center mb-10">
                    <Link to="/" className="inline-block mb-6">
                        <img
                            src="/assets/logo.png"
                            alt="BingeHall"
                            className="h-12 md:h-16 select-none"
                            onClick={handleLogoClick}
                        />
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
                    {/* <p className="text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p> */}
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none text-gray-700">
                    <div className="space-y-8">
                        {/* Introduction */}
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9f1d21]">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
                            <p>
                                By booking with BingeHall, you agree to comply with all our terms and conditions. Violations may result in additional charges, termination of your booking, or being barred from future bookings.
                            </p>
                        </div>

                        {/* Facility Usage */}
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9f1d21]">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Facility Usage Policies</h2>
                            <ul className="list-disc pl-6 space-y-4">
                                <li>
                                    <strong>Mandatory Decorations:</strong> Celebrations without decorations are not allowed. Decorations are required for all celebrations to create a festive atmosphere.
                                </li>
                                <li>
                                    <strong>Damage Prevention:</strong> Ensure no damage to any decorations, balloons, lighting, etc. Customers must avoid causing any damage to provided decorations and items.
                                </li>
                                <li>
                                    <strong>Vacating Premises:</strong> Customers must leave the theatre premises along with their belongings before the scheduled end time of their booking. Late departures will incur additional charges of ₹1000 per 15 minutes.
                                </li>
                                <li>
                                    <strong>Cleanliness Requirements:</strong> Customers are expected to keep the theatre clean during their stay. Cleaning charges (₹500-₹2000) will apply if excessive mess is left behind.
                                </li>
                                <li>
                                    <strong>Property Movement Restrictions:</strong> Customers are not allowed to move or rearrange any properties or goods set up by BingeHall for the event.
                                </li>
                            </ul>
                        </div>

                        {/* Safety & Prohibited Items */}
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9f1d21]">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Safety & Prohibited Items</h2>
                            <ul className="list-disc pl-6 space-y-4">
                                <li>
                                    <strong>Hazardous Materials Ban:</strong> Party poppers, Cold Fire, Snow sprays or any similar items are strictly prohibited inside the theatre due to fire safety regulations.
                                </li>
                                <li>
                                    <strong>Illegal Activities Prohibition:</strong> Smoking, drinking alcohol, or any illegal activities are strictly forbidden within the premises as per Indian laws.
                                </li>
                                <li>
                                    <strong>Code of Conduct:</strong> Our staff reserves the right to address misconduct. Inappropriate behavior may result in immediate termination of your booking without refund.
                                </li>
                            </ul>
                        </div>

                        {/* Booking & Payment */}
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9f1d21]">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Booking & Payment Terms</h2>
                            <ul className="list-disc pl-6 space-y-4">
                                <li>
                                    <strong>Age Restrictions:</strong> Couples below 18 years are not allowed. No refunds for age-related cancellations. Valid government ID proof is required.
                                </li>
                                <li>
                                    <strong>Holiday Bookings:</strong> Bookings during public holidays/festivals cannot be cancelled or rescheduled. Full payment is required in advance.
                                </li>
                                <li>
                                    <strong>Age-Based Pricing:</strong> Children aged 3 years and above will be charged full price. Infant rates apply only for children below 3 years.
                                </li>
                                <li>
                                    <strong>Buffer Time Policy:</strong> Buffer time cannot be used without permission. Every 10 minutes overtime will incur additional hourly charges at 1.5x the standard rate.
                                </li>
                            </ul>
                        </div>

                        {/* Content Policies */}
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9f1d21]">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Content & Technical Policies</h2>
                            <ul className="list-disc pl-6 space-y-4">
                                <li>
                                    <strong>Content Ownership:</strong> Customers must provide valid proof of ownership for streaming content and cannot stream any content prohibited in India. Piracy is strictly prohibited.
                                </li>
                                <li>
                                    <strong>Content Provision:</strong> We don't provide content but offer streaming facilities. Customers must bring their own accounts (Netflix, Prime, etc.) and compatible devices.
                                </li>
                                <li>
                                    <strong>WiFi Usage:</strong> WiFi facilities are provided for streaming purposes only. Illegal downloads or excessive bandwidth usage may result in service termination.
                                </li>
                            </ul>
                        </div>

                        {/* Liability */}
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9f1d21]">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Liability & Additional Policies</h2>
                            <ul className="list-disc pl-6 space-y-4">
                                <li>
                                    <strong>Personal Belongings:</strong> We are not responsible for your personal belongings. Lockers are available for valuables at additional charge.
                                </li>
                                <li>
                                    <strong>Technical Issues:</strong> We will make reasonable efforts to resolve technical issues, but assume no liability for disruptions beyond our control. Partial refunds may be issued at our discretion.
                                </li>
                                <li>
                                    <strong>Parking Policy:</strong> Parking is available but at your own risk. We're not liable for any damage, theft, or loss of vehicles or belongings in vehicles.
                                </li>
                                <li>
                                    <strong>Food & Beverage:</strong> Outside food and beverages are not allowed. Our catering services are available for additional charge.
                                </li>
                                <li>
                                    <strong>Damage Charges:</strong> Appropriate fines will be levied for any damages to the premises. Minimum damage charge is ₹2000, with actual costs applied for significant damages.
                                </li>
                            </ul>
                        </div>

                        {/* Cancellation */}
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9f1d21]">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Cancellation Policy</h2>
                            <ul className="list-disc pl-6 space-y-4">
                                <li>
                                    <strong>Cancellation by BingeHall:</strong> We reserve the right to cancel bookings due to unforeseen circumstances with refunds processed within 8 working days.
                                </li>
                            </ul>
                        </div>

                        {/* Important Notice */}
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-lg font-medium text-yellow-800">Important Notice</h3>
                                    <div className="mt-2 text-yellow-700">
                                        <p>
                                            Management reserves the right to refuse entry or ask guests to leave if these terms are violated.
                                            In such cases, no refunds will be provided. For safety reasons, we may conduct security checks
                                            at entry points.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact & CTA */}
                        <div className="mt-12 text-center border-t pt-8">
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                                <div className="text-gray-600 mb-4 sm:mb-0">
                                    Need help? Contact us at <a href="mailto:bingehall08@gmail.com" className="text-[#9f1d21] hover:underline">bingehall08@gmail.com</a>
                                </div>
                                <Link
                                    to="/book"
                                    className="inline-block bg-[#9f1d21] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#b12329] transform hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    I Agree - Book Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;