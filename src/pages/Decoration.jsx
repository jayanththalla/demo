import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PropTypes from 'prop-types';

const DecorationSelector = ({ onSelect, onBack, onNext }) => {
    const [selectedDecoration, setSelectedDecoration] = useState(null);

    const decorationOptions = [
        { id: 'none', name: 'None', image: '/assets/decorations/none.png', price: 0 },
        { id: 'birthday', name: 'Birthday', image: '/assets/decorations/birthday.png', price: 749 },
        { id: 'anniversary', name: 'Anniversary', image: '/assets/decorations/anniversary.png', price: 749 },
        { id: 'farewell', name: 'Farewell', image: '/assets/decorations/farewell.png', price: 749 },
        { id: 'bride', name: 'Bride to be', image: '/assets/decorations/bride.png', price: 749 },
        { id: 'romantic', name: 'Romantic Date', image: '/assets/decorations/romantic.png', price: 749 },
        { id: 'baby', name: 'Baby Shower', image: '/assets/decorations/baby.png', price: 749 },
        { id: 'celebrations', name: 'Celebrations', image: '/assets/decorations/celebrations.png', price: 749 },
        { id: 'love', name: 'Love Proposal', image: '/assets/decorations/love.png', price: 749 },
        { id: 'marriage', name: 'Marriage Proposal', image: '/assets/decorations/marriage.png', price: 749 },
        { id: 'groom', name: 'Groom to be', image: '/assets/decorations/groom.png', price: 749 },
    ];

    useEffect(() => {
        if (selectedDecoration) {
            onSelect(selectedDecoration !== 'none', decorationOptions.find(d => d.id === selectedDecoration)?.price || 0);
        }
    }, [selectedDecoration, onSelect]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-6 bg-black text-white"
        >
            <div className="flex items-center justify-between mb-6">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "auto" }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center"
                >
                    <div className="w-8 h-1 bg-[#FDE047] mr-3"></div>
                    <h2 className="text-2xl font-bold">
                        Decoration <span className="text-sm font-normal text-gray-400">(Optional)</span>
                    </h2>
                </motion.div>
                <div className="text-right">
                    <div className="bg-[#FDE047] text-black px-4 py-2 rounded font-bold">
                        Price: {selectedDecoration ? `₹${decorationOptions.find(d => d.id === selectedDecoration)?.price || 0}` : '₹0'}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {decorationOptions.map((decoration) => (
                    <motion.div
                        key={decoration.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedDecoration(decoration.id)}
                        className={`
                            relative rounded-lg overflow-hidden cursor-pointer border-2
                            ${selectedDecoration === decoration.id ? 'border-[#FDE047] ring-2 ring-[#FDE047]' : 'border-gray-700'}
                        `}
                    >
                        <img
                            src={decoration.image}
                            alt={decoration.name}
                            className="w-full h-46 object-cover"
                        />
                        {decoration.id !== 'none' && (
                            <div className="absolute top-2 right-2 bg-[#FDE047] text-black text-xs font-bold px-2 py-1 rounded">
                                ₹{decoration.price}
                            </div>
                        )}
                        <div className={`
                            text-center py-2 font-medium text-sm
                            ${decoration.id === 'none' ? 'bg-[#FDE047] text-black' : 'bg-gray-800 text-white'}
                        `}>
                            {decoration.name}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-6 text-sm text-gray-400">
                NOTE : Decoration are not customizable
            </div>

            <div className="mt-6 flex justify-between">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onBack}
                    className="px-6 py-3 border border-[#FDE047] text-[#FDE047] rounded flex items-center"
                >
                    <ArrowLeft size={18} className="mr-2" />
                    Previous
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    disabled={!selectedDecoration}
                    className={`px-6 py-3 bg-[#FDE047] text-black rounded flex items-center
                        ${!selectedDecoration ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                >
                    Next
                    <ArrowRight size={18} className="ml-2" />
                </motion.button>
            </div>
        </motion.div>
    );
};
DecorationSelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    decorationPrice: PropTypes.number
};

export default DecorationSelector;