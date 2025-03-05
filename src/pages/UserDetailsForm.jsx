// src/pages/UserDetailsForm.jsx
import { motion } from 'framer-motion';

const UserDetailsForm = ({ userDetails, setUserDetails, onSubmit, onCancel }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-gray-800 rounded-lg p-6 w-full max-w-md"
            >
                <h2 className="text-xl font-bold mb-4">Enter Your Details</h2>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={userDetails.name}
                        onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                        className="w-full p-2 mb-4 bg-gray-700 rounded"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={userDetails.email}
                        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                        className="w-full p-2 mb-4 bg-gray-700 rounded"
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Phone"
                        value={userDetails.phone}
                        onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                        className="w-full p-2 mb-4 bg-gray-700 rounded"
                        required
                    />
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="mr-2 px-4 py-2 bg-gray-600 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-yellow-400 text-black rounded"
                        >
                            Confirm Booking
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default UserDetailsForm;