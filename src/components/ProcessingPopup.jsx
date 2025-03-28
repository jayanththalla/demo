import { motion, AnimatePresence } from 'framer-motion';

const ProcessingPopup = ({ isVisible }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl"
                    >
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-16 h-16 border-4 border-[#9f1d21] border-t-transparent rounded-full"
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Initializing Payment
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Please wait while we connect to Razorpay...
                            </p>
                            <div className="text-sm text-gray-500">
                                Do not refresh or close this window
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProcessingPopup;