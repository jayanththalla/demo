import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PropTypes from 'prop-types';
import { cakeOptions } from './data/constants';

const CakeSelector = ({ onSelect, onBack, onNext, selectedCake, isEggless }) => {
    // Filter out the 'none' option from cakeOptions
    const filteredCakes = cakeOptions.filter(cake => cake.id !== 'none');

    const [selectedCakeLocal, setSelectedCakeLocal] = useState(selectedCake);
    const [isEgglessLocal, setIsEgglessLocal] = useState(isEggless);

    // Sync local state with props
    useEffect(() => {
        setSelectedCakeLocal(selectedCake);
    }, [selectedCake]);

    useEffect(() => {
        setIsEgglessLocal(isEggless);
    }, [isEggless]);

    // Notify parent of changes
    useEffect(() => {
        const cakeOption = filteredCakes.find(c => c.id === selectedCakeLocal);
        const totalPrice = cakeOption?.price || 0;

        // Pass the actual cake ID instead of a boolean
        onSelect(selectedCakeLocal, totalPrice, isEgglessLocal);
    }, [selectedCakeLocal, isEgglessLocal, onSelect, filteredCakes]);

    // Toggle cake selection
    const toggleCake = (id) => {
        if (selectedCakeLocal === id) {
            setSelectedCakeLocal(null); // Deselect if already selected
        } else {
            setSelectedCakeLocal(id); // Select the new cake
        }
    };

    return (
        <div className="py-6 bg-white text-black">
            {/* Header and Price Display */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <div className="w-8 h-1 bg-yellow-400 mr-3"></div>
                    <h2 className="text-2xl font-bold">Cakes</h2>
                </div>
                <div className="text-right">
                    <div className="bg-white text-black border-2 border-yellow-400 px-4 py-2 rounded font-bold">
                        Price: ₹{filteredCakes.find(c => c.id === selectedCakeLocal)?.price || 0}
                    </div>
                </div>
            </div>

            {/* Eggless Toggle */}
            {/* <div className="mb-6 flex items-center">
                <span className="mr-3 font-medium">Eggless</span>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isEgglessLocal}
                        onChange={() => setIsEgglessLocal(!isEgglessLocal)}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                </label>
            </div> */}

            {/* Cake Options */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredCakes.map((cake) => (
                    <div
                        key={cake.id}
                        onClick={() => toggleCake(cake.id)}
                        className={`
                            relative rounded-lg overflow-hidden cursor-pointer border-2
                            ${selectedCakeLocal === cake.id ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-gray-300'}
                        `}
                    >
                        <img
                            src={cake.image}
                            alt={cake.name}
                            className="w-full h-32 object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-white text-black text-xs font-bold px-2 py-1 rounded border border-yellow-400">
                            ₹{cake.price}
                        </div>
                        <div className="text-center py-2 font-medium text-sm bg-white border-t border-gray-200">
                            {cake.name}
                        </div>
                    </div>
                ))}
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-between">
                <button
                    onClick={onBack}
                    className="px-6 py-3 border-2 border-[#9f1d21] text-[#9f1d21] rounded flex items-center hover:bg-[#9f1d21] hover:text-white transition-colors"
                >
                    <ArrowLeft size={18} className="mr-2" />
                    Previous
                </button>

                <button
                    onClick={onNext}
                    className={`px-6 py-3 bg-[#9f1d21] text-white rounded flex items-center hover:bg-[#b82329] transition-colors
                    `}
                >
                    Next
                    <ArrowRight size={18} className="ml-2" />
                </button>
            </div>
        </div>
    );
};

CakeSelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    selectedCake: PropTypes.string,
    isEggless: PropTypes.bool
};

export default CakeSelector;