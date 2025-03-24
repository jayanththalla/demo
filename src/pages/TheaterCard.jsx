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
        bookedTimeSlots = {} // Default to an empty object
    } = props;

    const theaterBookedSlots = bookedTimeSlots[theater.id] || [];
    console.log('Booked slots for theater', theater.id, ':', theaterBookedSlots); // Debugging

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: theater.id * 0.1 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="bg-white border-2 border-yellow-400 rounded-lg overflow-hidden shadow-lg shadow-yellow-400/10 h-full flex flex-col"
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
                {/* <div className="absolute top-2 right-2 bg-white/80 border border-yellow-400 text-black text-xs font-bold px-2 py-1 rounded flex items-center">
                    <Clock size={14} className="mr-1" /> 3 HRS
                </div> */}
                {theater.specialFeature && (
                    <div className="absolute bottom-0 left-0 right-0 bg-white/70 text-black text-sm font-bold py-1 text-center">
                        <Sparkles size={16} className="inline mr-1 text-yellow-400" /> {theater.specialFeature}
                    </div>
                )}
            </div>

            <div className="p-4 bg-white text-black flex-grow flex flex-col">
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
                            const slotId = `${theater.id}-${index}`; // Ensure this matches the format in bookedTimeSlots
                            const isBooked = theaterBookedSlots.includes(slotId); // Check if the slot is booked

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
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                                            : 'hover:bg-yellow-400/20'
                                        }`}
                                    style={{ pointerEvents: isBooked ? 'none' : 'auto' }}
                                    role="button"
                                    aria-label={`Select time slot ${slot}`}
                                    aria-disabled={isBooked}
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
    bookedTimeSlots: PropTypes.object // Update prop type to object
};

TheaterCard.defaultProps = {
    bookedTimeSlots: {} // Default to an empty object
};

export default TheaterCard;