import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const SuccessModal = ({ onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gray-800 max-w-md w-full rounded-lg p-6 text-center"
            >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Booking Successful!</h3>
                <p className="text-gray-300 mb-6">Your reservation has been confirmed. We&apos;ve sent the details to your email.</p>
                <button
                    className="bg-yellow-400 text-black font-bold py-3 px-6 rounded w-full"
                    onClick={onClose}
                >
                    Done
                </button>
            </motion.div>
        </motion.div>
    );
};
SuccessModal.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default SuccessModal;