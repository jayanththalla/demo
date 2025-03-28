import { motion } from 'framer-motion';
import { ChevronLeft, Check } from 'lucide-react';
import ErrorDisplay from './ErrorDisplay';
import ProcessingPopup from './ProcessingPopup';

const UserDetailsForm = ({
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    errors,
    setErrors,
    isProcessing,
    handlePayment,
    handleBack,
    handleSubmit
}) => {
    return (
        <>
            <ProcessingPopup isVisible={isProcessing} />
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
                    <form onSubmit={handleSubmit}>
                        <ErrorDisplay errors={errors} />
                        <div className="space-y-4">
                            {/* Name Field */}
                            <div className="flex flex-col">
                                <label className="text-black mb-1 flex items-center">
                                    Full Name
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        if (errors.name) {
                                            setErrors((prev) => {
                                                const newErrors = { ...prev };
                                                delete newErrors.name;
                                                return newErrors;
                                            });
                                        }
                                    }}
                                    className={`bg-white text-black border ${errors.name ? 'border-red-400 shake-animation' : 'border-gray-300'
                                        } rounded-lg p-3 focus:outline-none focus:ring-2 ${errors.name ? 'focus:ring-red-300' : 'focus:ring-yellow-400'
                                        } transition-all`}
                                    placeholder="Enter your name"
                                />
                                {errors.name && (
                                    <div className="mt-1 text-sm text-red-500 flex items-start">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mt-0.5 mr-1 flex-shrink-0"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span>{errors.name}</span>
                                    </div>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="flex flex-col">
                                <label className="text-black mb-1 flex items-center">
                                    Email
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (errors.email) {
                                            setErrors((prev) => {
                                                const newErrors = { ...prev };
                                                delete newErrors.email;
                                                return newErrors;
                                            });
                                        }
                                    }}
                                    className={`bg-white text-black border ${errors.email ? 'border-red-400 shake-animation' : 'border-gray-300'
                                        } rounded-lg p-3 focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-300' : 'focus:ring-yellow-400'
                                        } transition-all`}
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <div className="mt-1 text-sm text-red-500 flex items-start">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mt-0.5 mr-1 flex-shrink-0"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span>{errors.email}</span>
                                    </div>
                                )}
                            </div>

                            {/* Phone Field */}
                            <div className="flex flex-col">
                                <label className="text-black mb-1 flex items-center">
                                    Phone Number
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                        if (errors.phone) {
                                            setErrors((prev) => {
                                                const newErrors = { ...prev };
                                                delete newErrors.phone;
                                                return newErrors;
                                            });
                                        }
                                    }}
                                    className={`bg-white text-black border ${errors.phone ? 'border-red-400 shake-animation' : 'border-gray-300'
                                        } rounded-lg p-3 focus:outline-none focus:ring-2 ${errors.phone ? 'focus:ring-red-300' : 'focus:ring-yellow-400'
                                        } transition-all`}
                                    placeholder="Enter your phone number"
                                />
                                {errors.phone && (
                                    <div className="mt-1 text-sm text-red-500 flex items-start">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mt-0.5 mr-1 flex-shrink-0"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span>{errors.phone}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-between mt-6">
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleBack}
                                className="px-6 py-3 border-2 border-yellow-400 text-black rounded-lg flex items-center hover:bg-yellow-400 transition-colors"
                            >
                                <ChevronLeft className="h-5 w-5 mr-2" />
                                Back
                            </motion.button>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={isProcessing}
                                className={`px-6 py-3 bg-[#9f1d21] text-white rounded-lg font-bold flex items-center justify-center shadow-lg hover:bg-white hover:text-[#9f1d21] hover:border-[#9f1d21] hover:border-2 transition-colors ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                <span className="flex items-center">
                                    {isProcessing ? (
                                        <>Processing...</>
                                    ) : (
                                        <>
                                            Proceed to Payment
                                            <Check className="h-5 w-5 ml-2" />
                                        </>
                                    )}
                                </span>
                            </motion.button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </>
    );
};

export default UserDetailsForm;