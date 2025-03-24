import { motion } from 'framer-motion';
import { Film, Music, Coffee, Star } from 'lucide-react';

const BookHeader = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full bg-white overflow-hidden mt-16"
            style={{ height: '350px' }}
        >
            {/* Background Image */}
            <motion.div
                className="absolute inset-0 z-0 overflow-hidden"
            >
                <img
                    src="/assets/reel.png"
                    alt="Cinema Background"
                    className="w-full h-full object-cover "
                    style={{ objectPosition: 'center center' }}
                />
            </motion.div>

            {/* Film Reel Animation */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute -right-20 -top-20 opacity-20 z-0"
            >
                <svg width="300" height="300" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#FFD700" strokeWidth="2" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#FFD700" strokeWidth="1" />
                    {Array.from({ length: 12 }).map((_, i) => (
                        <circle
                            key={i}
                            cx={50 + 42 * Math.cos(i * Math.PI / 6)}
                            cy={50 + 42 * Math.sin(i * Math.PI / 6)}
                            r="3"
                            fill="#FFD700"
                        />
                    ))}
                </svg>
            </motion.div>

            {/* Text Overlay */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="container mx-auto px-4 text-center z-10 relative h-full flex flex-col justify-center"
            >
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-wide">
                    <span className="text-yellow-400">BingeHall</span> Booking
                </h1>
                <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
                    Where movie magic meets luxury. Reserve your exclusive private theatre experience today.
                </p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center justify-center mt-6 space-x-2"
                >
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Film className="text-yellow-400 w-8 h-8" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Music className="text-yellow-400 w-8 h-8" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Coffee className="text-yellow-400 w-8 h-8" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Star className="text-yellow-400 w-8 h-8" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default BookHeader;