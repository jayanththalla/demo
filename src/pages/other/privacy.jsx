import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
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
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
                    {/* <p className="text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p> */}
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none text-gray-700">
                    <div className="space-y-8">
                        {/* Introduction */}
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9f1d21]">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
                            <p>
                                This privacy policy sets out how BingeHall uses and protects any information that you provide when using this website.
                            </p>
                        </div>

                        {/* Our Commitment */}
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9f1d21]">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Our Commitment</h2>
                            <p>
                                BingeHall is committed to ensuring your privacy is protected. Any information you provide will only be used in accordance with this privacy statement.
                            </p>
                        </div>

                        {/* Information Collection */}
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9f1d21]">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Information We Collect</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Name and job title</li>
                                <li>Contact information including email address</li>
                                <li>Demographic information (postcode, preferences, interests)</li>
                                <li>Other information relevant to customer surveys and offers</li>
                            </ul>
                        </div>

                        {/* Use of Information */}
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9f1d21]">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. How We Use Your Information</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Internal record keeping</li>
                                <li>Improving our products and services</li>
                                <li>Sending promotional emails about new products or special offers</li>
                                <li>Market research purposes</li>
                                <li>Customizing the website according to your interests</li>
                            </ul>
                        </div>

                        {/* Security */}
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9f1d21]">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Security Measures</h2>
                            <p>
                                We implement suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.
                            </p>
                        </div>

                        {/* Controlling Information */}
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9f1d21]">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Controlling Your Personal Information</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Opt-out of direct marketing via form checkboxes</li>
                                <li>Change marketing preferences by emailing bingehall08@gmail.com</li>
                                <li>We won't sell/distribute your information without permission</li>
                                <li>May share promotional third-party content with consent</li>
                            </ul>
                        </div>

                        {/* Policy Changes */}
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9f1d21]">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Policy Changes</h2>
                            <p>
                                BingeHall may update this policy periodically. Please check this page to stay informed about any changes.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9f1d21] text-center">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                            <p className="mb-4">
                                For corrections to your information or privacy concerns:
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <a
                                    href="mailto:bingehall08@gmail.com"
                                    className="bg-[#9f1d21] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#b12329] transition-colors"
                                >
                                    Email Us
                                </a>
                                <Link
                                    to="/contact"
                                    className="border border-[#9f1d21] text-[#9f1d21] px-6 py-2 rounded-full font-semibold hover:bg-[#9f1d21]/10 transition-colors"
                                >
                                    Contact Form
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 text-center border-t pt-8">
                        <p className="text-gray-600 mb-4">
                            By using our website, you consent to this privacy policy.
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

export default PrivacyPolicy;