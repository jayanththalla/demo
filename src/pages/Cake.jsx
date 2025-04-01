import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PropTypes from 'prop-types';
import { cakeOptions } from './data/constants';

const CakeSelector = ({ onSelect, onBack, onNext, selectedCake, isEggless }) => {
    const [selectedCakeLocal, setSelectedCakeLocal] = useState(selectedCake);
    const [isEgglessLocal, setIsEgglessLocal] = useState(isEggless);
    const [cakeName, setCakeName] = useState('');

    // Update parent when any value changes
    useEffect(() => {
        const selectedCakeOption = cakeOptions.find(c => c.id === selectedCakeLocal);
        onSelect(selectedCakeLocal, selectedCakeOption?.price || 0, isEgglessLocal, cakeName);
    }, [selectedCakeLocal, isEgglessLocal, cakeName, onSelect]);

    // Add validation for cake message
    const handleCakeNameChange = (e) => {
        const value = e.target.value;
        if (value.length <= 25) { // Limit to 25 characters
            setCakeName(value);
        }
    };

    // Toggle cake selection
    const toggleCake = (id) => {
        if (selectedCakeLocal === id) {
            setSelectedCakeLocal(null); // Deselect if already selected
        } else {
            setSelectedCakeLocal(id); // Select the new cake
        }
    };

    return (
        <div className="py-6 bg-gray-50 text-black">
            {/* Header and Price Display */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <div className="w-8 h-1 bg-yellow-400 mr-3"></div>
                    <h2 className="text-2xl font-bold">Cakes</h2>
                </div>
                <div className="text-right">
                    <div className="bg-white text-black border-2 border-yellow-400 px-4 py-2 rounded font-bold">
                        Price: ₹{cakeOptions.find(c => c.id === selectedCakeLocal)?.price || 0}
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
                {cakeOptions.filter(cake => cake.id !== 'none').map((cake) => (
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

            {/* Cake Name Input Section */}
            {selectedCakeLocal && (
                <div className="mt-8 bg-white p-6 rounded-lg border-2 border-gray-200">
                    <div className="flex items-center mb-4">
                        <div className="w-6 h-1 bg-yellow-400 mr-3"></div>
                        <h3 className="text-xl font-bold">Cake Message</h3>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="cakeName" className="block text-sm font-medium text-gray-700">
                            What message would you like on the cake?
                        </label>
                        <input
                            type="text"
                            id="cakeName"
                            value={cakeName}
                            onChange={handleCakeNameChange}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors"
                            placeholder="e.g., Happy Birthday John!"
                        />
                        <div className="flex justify-between items-center text-sm">
                            <p className="text-gray-500">
                                {25 - cakeName.length} characters remaining
                            </p>
                            {cakeName && (
                                <p className="text-yellow-600 font-medium">
                                    Preview: &quot;{cakeName}&quot;
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

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
    isEggless: PropTypes.bool,
    cakeName: PropTypes.string // Add this line
};

export default CakeSelector;