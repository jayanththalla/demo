import PropTypes from 'prop-types';
import { FaCalendarAlt, FaPalette, FaBirthdayCake, FaCamera } from 'react-icons/fa';

const BookingSummary = ({
    selectedTheater,
    guestCount,
    setGuestCount,
    isDecorationSelected,
    decorationPrice,
    cakeSelected,
    cakePrice,
    isEggless,
    selectedDecorations,
    selectedRose,
    selectedPhotography,
    finalPrice,
    decorations,
    roses,
    photography,
    theaters,
}) => {
    const theater = theaters.find(t => t.id === selectedTheater);

    if (!theater) return null;

    const handleGuestCountChange = (e) => {
        const count = Number(e.target.value);
        if (count >= theater.minPeople && count <= theater.maxPeople) {
            setGuestCount(count);
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FaCalendarAlt className="mr-3 text-yellow-400" />
                Booking Summary
            </h2>

            <div className="space-y-4">
                {/* Theater Details */}
                <div>
                    <p className="font-bold">Theater:</p>
                    <p>{theater.name}</p>
                </div>

                {/* Guest Count */}
                <div>
                    <p className="font-bold">Number of Guests:</p>
                    <input
                        type="number"
                        value={guestCount}
                        onChange={handleGuestCountChange}
                        min={theater.minPeople}
                        max={theater.maxPeople}
                        className="w-full p-2 bg-gray-700 rounded"
                    />
                </div>

                {/* Decoration */}
                {isDecorationSelected && (
                    <div className="flex items-center">
                        <FaPalette className="mr-2 text-yellow-400" />
                        <p>Decoration: ₹{decorationPrice}</p>
                    </div>
                )}

                {/* Cake */}
                {cakeSelected && (
                    <div className="flex items-center">
                        <FaBirthdayCake className="mr-2 text-yellow-400" />
                        <p>{isEggless ? 'Eggless' : 'Regular'} Cake: ₹{cakePrice}</p>
                    </div>
                )}

                {/* Extra Decorations */}
                {selectedDecorations.map((dec, index) => (
                    dec && dec.name && dec.price ? (
                        <div key={index} className="flex items-center">
                            <FaPalette className="mr-2 text-yellow-400" />
                            <p>{dec.name}: ₹{dec.price}</p>
                        </div>
                    ) : null
                ))}

                {/* Rose */}
                {selectedRose && selectedRose.name && selectedRose.price && (
                    <div className="flex items-center">
                        <FaPalette className="mr-2 text-yellow-400" />
                        <p>{selectedRose.name}: ₹{selectedRose.price}</p>
                    </div>
                )}

                {/* Photography */}
                {selectedPhotography && selectedPhotography.name && selectedPhotography.price && (
                    <div className="flex items-center">
                        <FaCamera className="mr-2 text-yellow-400" />
                        <p>{selectedPhotography.name}: ₹{selectedPhotography.price}</p>
                    </div>
                )}

                {/* Final Price */}
                <div className="border-t border-gray-600 pt-4">
                    <p className="font-bold">Total Price:</p>
                    <p className="text-2xl">₹{finalPrice}</p>
                </div>
            </div>
        </div>
    );
};

BookingSummary.propTypes = {
    selectedTheater: PropTypes.string,
    guestCount: PropTypes.number,
    setGuestCount: PropTypes.func,
    isDecorationSelected: PropTypes.bool,
    decorationPrice: PropTypes.number,
    cakeSelected: PropTypes.bool,
    cakePrice: PropTypes.number,
    isEggless: PropTypes.bool,
    selectedDecorations: PropTypes.arrayOf(PropTypes.object),
    selectedRose: PropTypes.object,
    selectedPhotography: PropTypes.object,
    finalPrice: PropTypes.number,
    decorations: PropTypes.arrayOf(PropTypes.object),
    roses: PropTypes.arrayOf(PropTypes.object),
    photography: PropTypes.arrayOf(PropTypes.object),
    theaters: PropTypes.arrayOf(PropTypes.object),
};

export default BookingSummary;