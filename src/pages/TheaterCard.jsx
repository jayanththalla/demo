import { motion } from 'framer-motion';
import { Users, Clock, Sparkles, Star, Award, ThumbsUp, Calendar } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const TheaterCard = ({ ...props }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const {
        theater,
        selectedTimeSlot,
        setSelectedTimeSlot,
        handleBookNow,
        timeSlots,
        bookedTimeSlots = {} // Default to an empty object
    } = props;

    const theaterBookedSlots = bookedTimeSlots[theater.id] || [];

    // Auto-scroll images
    useEffect(() => {
        if (!theater.images || theater.images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === theater.images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [theater.images]);

    // Replace the existing image section with this new carousel
    const renderImageCarousel = () => (
        <div className="relative h-48 overflow-hidden rounded-lg">
            <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{
                    transform: `translateX(-${currentImageIndex * 100}%)`,
                    width: `${theater.images?.length * 100}%`
                }}
            >
                {theater.images?.map((image, index) => (
                    <div
                        key={index}
                        className="relative w-full h-full flex-shrink-0"
                    >
                        <img
                            src={image}
                            alt={`${theater.name} view ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Image indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {theater.images?.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === index
                            ? 'bg-yellow-400 w-4'
                            : 'bg-white/50 hover:bg-white/75'
                            }`}
                        aria-label={`View image ${index + 1}`}
                    />
                ))}
            </div>

            {/* Existing badges */}
            <div className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1.5 rounded-lg flex items-center">
                <Users size={14} className="mr-2" /> {theater.maxPeople} SEATS
            </div>
            {theater.specialFeature && (
                <div className="absolute bottom-0 left-0 right-0 bg-white/70 text-black text-sm font-bold py-1 text-center">
                    <Sparkles size={16} className="inline mr-1 text-yellow-400" />
                    {theater.specialFeature}
                </div>
            )}
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: theater.id * 0.1 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="bg-white border-2 border-yellow-400 rounded-xl overflow-hidden shadow-lg shadow-yellow-400/10 h-full flex flex-col p-4"
        >
            {renderImageCarousel()}
            <div className="pt-4 bg-white text-black flex-grow flex flex-col">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-black font-bold flex items-center">
                        ₹{theater.basePrice}/-
                    </p>
                    <div className="flex">
                        {[1, 2, 3].map(star => (
                            <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
                        ))}
                    </div>
                </div>

                <h3 className="text-xl font-bold mb-2 flex items-center">
                    {theater.id === 4 && <Sparkles size={18} className="mr-1 text-yellow-400" />}
                    {theater.name}
                </h3>

                <ul className="text-sm mb-4 space-y-1">
                    <li className="flex items-start">
                        <Users size={14} className="mr-2 mt-1 text-yellow-400 flex-shrink-0" />
                        <span>Max {theater.maxPeople} people</span>
                    </li>
                    {theater.extraPersonRate > 0 && (
                        <li className="flex items-start">
                            <ThumbsUp size={14} className="mr-2 mt-1 text-yellow-400 flex-shrink-0" />
                            <span>Extra person: ₹{theater.extraPersonRate}/person</span>
                        </li>
                    )}
                    <li className="flex items-start">
                        <Award size={14} className="mr-2 mt-1 text-yellow-400 flex-shrink-0" />
                        <span>Decoration {theater.decorationIncluded ? 'included' : `₹${theater.decorationPrice} extra`}</span>
                    </li>
                </ul>

                <div className="flex flex-wrap gap-1 mb-4">
                    {theater.features.map((feature, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-black px-2 py-1 rounded-full border border-yellow-400">
                            {feature}
                        </span>
                    ))}
                </div>

                <div className="mt-auto">
                    <p className="text-sm font-bold mb-2 flex items-center">
                        <Clock size={16} className="mr-1 text-yellow-400" /> Available Time Slots:
                    </p>
                    <div className="grid grid-cols-2 gap-1 mb-3">
                        {timeSlots.map((slot, index) => {
                            const timeSlotKey = `${theater.id}-${index}`;
                            // Check both array and object formats for booked slots
                            const isBooked = bookedTimeSlots[theater.id]?.some(bookedSlot =>
                                bookedSlot === index.toString() || bookedSlot === timeSlotKey
                            );

                            return (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: isBooked ? 1 : 1.05 }}
                                    whileTap={{ scale: isBooked ? 1 : 0.95 }}
                                    onClick={() => !isBooked && setSelectedTimeSlot(timeSlotKey)}
                                    className={`text-xs p-2 border rounded text-center cursor-pointer transition-all 
                                        ${selectedTimeSlot === timeSlotKey
                                            ? 'bg-yellow-400 text-black font-bold border-yellow-400'
                                            : isBooked
                                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300'
                                                : 'hover:bg-yellow-400/20 border-yellow-400'
                                        }`}
                                    style={{ pointerEvents: isBooked ? 'none' : 'auto' }}
                                >
                                    {slot}
                                </motion.div>
                            );
                        })}
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleBookNow(theater.id)}
                        className="w-full bg-[#9f1d21] text-white py-2 font-bold rounded hover:bg-[#b82329] transition-colors flex items-center justify-center"
                    >
                        <Calendar className="mr-2" size={18} />
                        Book now
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

TheaterCard.propTypes = {
    theater: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string,
        name: PropTypes.string.isRequired,
        maxPeople: PropTypes.number.isRequired,
        minPeople: PropTypes.number.isRequired,
        basePrice: PropTypes.number.isRequired,
        extraPersonRate: PropTypes.number.isRequired,
        decorationIncluded: PropTypes.bool.isRequired,
        decorationPrice: PropTypes.number,
        specialFeature: PropTypes.string,
        features: PropTypes.arrayOf(PropTypes.string).isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    selectedTimeSlot: PropTypes.string,
    setSelectedTimeSlot: PropTypes.func.isRequired,
    handleBookNow: PropTypes.func.isRequired,
    timeSlots: PropTypes.arrayOf(PropTypes.string).isRequired,
    bookedTimeSlots: PropTypes.object // Update prop type to object
};

TheaterCard.defaultProps = {
    bookedTimeSlots: {} // Default to an empty object
};

export default TheaterCard;