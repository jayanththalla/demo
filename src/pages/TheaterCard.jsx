import { motion } from 'framer-motion';
import { Users, Clock, Sparkles, Star, Award, ThumbsUp, Calendar } from 'lucide-react';
import PropTypes from 'prop-types';

const TheaterCard = ({ ...props }) => {
    const {
        theater,
        selectedTimeSlot,
        setSelectedTimeSlot,
        handleBookNow,
        timeSlots,
        bookedTimeslots = [] // Default to an empty array
    } = props;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: theater.id * 0.1 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="bg-gray-900 border-2 border-yellow-400 rounded-lg overflow-hidden shadow-lg shadow-yellow-400/10 h-full flex flex-col"
        >
            {/* Theater Card Content */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={theater.image}
                    alt={theater.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded flex items-center">
                    <Users size={14} className="mr-1" /> {theater.maxPeople} SEATS
                </div>
                <div className="absolute top-2 right-2 bg-black/80 border border-yellow-400 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                    <Clock size={14} className="mr-1" /> 3 HRS
                </div>
                {theater.specialFeature && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-yellow-400 text-sm font-bold py-1 text-center">
                        <Sparkles size={16} className="inline mr-1" /> {theater.specialFeature}
                    </div>
                )}
            </div>

            <div className="p-4 bg-gray-900 text-white flex-grow flex flex-col">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-yellow-400 font-bold flex items-center">
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
                        <span>For {theater.minPeople} to {theater.maxPeople} people</span>
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
                        <span key={idx} className="text-xs bg-gray-800 text-yellow-400 px-2 py-1 rounded-full">
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
                            const slotId = `${theater.id}-${index}`;
                            const isBooked = bookedTimeslots.includes(slotId);
                            return (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: isBooked ? 1 : 1.05 }}
                                    whileTap={{ scale: isBooked ? 1 : 0.95 }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => !isBooked && setSelectedTimeSlot(slotId)}
                                    className={`text-xs p-2 border border-yellow-400 rounded text-center cursor-pointer transition-all ${selectedTimeSlot === slotId
                                            ? 'bg-yellow-400 text-black font-bold'
                                            : isBooked
                                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                                : 'hover:bg-yellow-400/20'
                                        }`}
                                    style={{ pointerEvents: isBooked ? 'none' : 'auto' }}
                                    role="button"
                                    aria-label={`Select time slot ${slot}`}
                                    aria-disabled={isBooked}
                                >
                                    {slot} {isBooked && '(Booked)'}
                                </motion.div>
                            );
                        })}
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleBookNow(theater.id)}
                        className="w-full bg-yellow-400 text-black py-2 font-bold rounded hover:bg-yellow-300 transition-colors flex items-center justify-center"
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
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        maxPeople: PropTypes.number.isRequired,
        minPeople: PropTypes.number.isRequired,
        basePrice: PropTypes.number.isRequired,
        extraPersonRate: PropTypes.number.isRequired,
        decorationIncluded: PropTypes.bool.isRequired,
        decorationPrice: PropTypes.number,
        specialFeature: PropTypes.string,
        features: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    selectedTimeSlot: PropTypes.string,
    setSelectedTimeSlot: PropTypes.func.isRequired,
    handleBookNow: PropTypes.func.isRequired,
    timeSlots: PropTypes.arrayOf(PropTypes.string).isRequired,
    bookedTimeslots: PropTypes.arrayOf(PropTypes.string) // Add prop type validation
};

TheaterCard.defaultProps = {
    bookedTimeslots: [] // Default to an empty array
};

export default TheaterCard;