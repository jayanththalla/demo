import { motion } from 'framer-motion';
import { Users, Clock, Sparkles, Star, Award, Coffee, Music, Calendar } from 'lucide-react';
import PropTypes from 'prop-types';

const PartyHallDetails = ({ selectedTimeSlot, setSelectedTimeSlot, handleBookNow, timeSlots, bookedTimeSlots = [] }) => {
    return (
        <>
            <div className="text-center mb-8">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-3xl font-bold text-black"
                >
                    Book Our <span className="text-[#9f1d21] ">Spacious Party Hall</span>
                </motion.h2>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100px" }}
                    transition={{ delay: 0.5 }}
                    className="h-1 bg-[#9f1d21] mx-auto mt-3" />
            </div>
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -10, transition: { duration: 0.2 } }}
                    className="bg-white border-2 border-yellow-400 rounded-lg overflow-hidden shadow-lg shadow-yellow-400/10"
                >
                    <div className="md:flex">
                        <div className="relative md:w-1/2">
                            <img
                                src="/assets/party.jpg"
                                alt="Party hall"
                                className="w-full h-full object-cover min-h-64" />
                            <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded flex items-center">
                                <Users size={14} className="mr-1" /> 50 SEATS
                            </div>
                            <div className="absolute top-2 right-2 bg-white/80 border border-yellow-400 text-black text-xs font-bold px-2 py-1 rounded flex items-center">
                                <Clock size={14} className="mr-1" /> 3 HRS
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-white/70 py-2 px-4">
                                <div className="flex justify-between items-center">
                                    <p className="text-xl text-black font-bold flex items-center">
                                        ₹3999/-
                                    </p>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <Star key={star} size={18} className="text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 md:w-1/2">
                            <h3 className="text-2xl font-bold mb-4 flex items-center text-black">
                                <Sparkles size={24} className="mr-2 text-yellow-400" />
                                Premium Party Hall
                            </h3>

                            <div className="mb-6">
                                <p className="text-gray-700 mb-4">Perfect for birthdays, celebrations, corporate events, and special occasions with friends and family.</p>

                                <ul className="space-y-2 text-black">
                                    <li className="flex items-start">
                                        <Users size={18} className="mr-2 mt-1 text-yellow-400 flex-shrink-0" />
                                        <span>Accommodates up to 30 people comfortably</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Music size={18} className="mr-2 mt-1 text-yellow-400 flex-shrink-0" />
                                        <span>Premium sound system included</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Coffee size={18} className="mr-2 mt-1 text-yellow-400 flex-shrink-0" />
                                        <span>Catering options available (extra charge)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Award size={18} className="mr-2 mt-1 text-yellow-400 flex-shrink-0" />
                                        <span>Basic decoration included</span>
                                    </li>
                                </ul>
                            </div>

                            <p className="text-sm font-bold mb-2 flex items-center text-black">
                                <Clock size={16} className="mr-1 text-yellow-400" /> Available Time Slots:
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                                {timeSlots.map((slot, index) => {
                                    const slotId = `party-${index}`;
                                    const isBooked = bookedTimeSlots.includes(slotId);
                                    return (
                                        <motion.div
                                            key={index}
                                            whileHover={{ scale: isBooked ? 1 : 1.05 }}
                                            whileTap={{ scale: isBooked ? 1 : 0.95 }}
                                            onClick={() => !isBooked && setSelectedTimeSlot(slotId)}
                                            className={`text-xs p-2 border rounded text-center cursor-pointer transition-all ${selectedTimeSlot === slotId
                                                ? 'bg-yellow-400 text-black font-bold border-yellow-400'
                                                : isBooked
                                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300'
                                                    : 'hover:bg-yellow-400/20 border-yellow-400 text-black'
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
                                onClick={() => handleBookNow('party')}
                                className="w-full bg-[#9f1d21] text-white py-3 font-bold rounded hover:bg-[#8a1a1e] transition-colors flex items-center justify-center"
                            >
                                <Calendar className="mr-2" size={18} />
                                Book now
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

PartyHallDetails.propTypes = {
    selectedTimeSlot: PropTypes.string,
    setSelectedTimeSlot: PropTypes.func.isRequired,
    handleBookNow: PropTypes.func.isRequired,
    timeSlots: PropTypes.arrayOf(PropTypes.string).isRequired,
    bookedTimeSlots: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PartyHallDetails;