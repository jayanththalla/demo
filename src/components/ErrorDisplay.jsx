import { motion } from 'framer-motion';

const ErrorDisplay = ({ errors }) => {
    if (Object.keys(errors).length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg"
        >
            <div className="flex items-start">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500 mr-3 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
                <div>
                    <h3 className="text-lg font-medium text-red-800 mb-2">
                        Please fix the following issues to continue:
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-red-700">
                        {Object.entries(errors).map(([field, message]) => (
                            <li key={field}>
                                <span className="font-medium capitalize">{field}:</span> {message}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
};

export default ErrorDisplay;