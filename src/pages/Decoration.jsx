import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PropTypes from 'prop-types';
import { decorationOptions } from './data/constants';

const DecorationSelector = ({ onSelect, onBack, onNext, selectedDecorations }) => {
    // Filter out the 'none' option from decorationOptions
    const filteredDecorations = decorationOptions.filter(decoration => decoration.id !== 'none');

    const [selectedDecorationsLocal, setSelectedDecorationsLocal] = useState(selectedDecorations || []);

    const toggleDecoration = (id) => {
        if (selectedDecorationsLocal.includes(id)) {
            setSelectedDecorationsLocal([]); // Deselect if already selected
        } else {
            setSelectedDecorationsLocal([id]); // Select only one decoration
        }
    };

    // Notify parent of changes
    useEffect(() => {
        const totalPrice = selectedDecorationsLocal.reduce((acc, id) => {
            const item = filteredDecorations.find(d => d.id === id);
            return acc + (item?.price || 0);
        }, 0);

        onSelect(selectedDecorationsLocal, totalPrice);
    }, [selectedDecorationsLocal, onSelect, filteredDecorations]);

    return (
        <div className="py-6 bg-white text-black">
            {/* Header and Price Display */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <div className="w-8 h-1 bg-yellow-400 mr-3"></div>
                    <h2 className="text-2xl font-bold">Decorations</h2>
                </div>
                <div className="text-right">
                    <div className="text-right">
                        <div className="bg-white text-black border-2 border-yellow-400 px-4 py-2 rounded font-bold">
                            Price: ₹{selectedDecorationsLocal.reduce((acc, id) => {
                                const item = filteredDecorations.find(d => d.id === id);
                                return acc + (item?.price || 0);
                            }, 0)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Decoration Options */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredDecorations.map((decoration) => (
                    <div
                        key={decoration.id}
                        onClick={() => toggleDecoration(decoration.id)}
                        className={`
                            relative rounded-lg overflow-hidden cursor-pointer border-2
                            ${selectedDecorationsLocal.includes(decoration.id) ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-gray-300'}
                        `}
                    >
                        <img
                            src={decoration.image}
                            alt={decoration.name}
                            className="w-full h-32 object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-white text-black text-xs font-bold px-2 py-1 rounded border border-yellow-400">
                            ₹{decoration.price}
                        </div>
                        <div className="text-center py-2 font-medium text-sm bg-white">
                            {decoration.name}
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
                    disabled={selectedDecorationsLocal.length === 0}
                    className={`px-6 py-3 bg-[#9f1d21] text-white rounded flex items-center hover:bg-[#b82329] transition-colors
                        ${selectedDecorationsLocal.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                >
                    Next
                    <ArrowRight size={18} className="ml-2" />
                </button>
            </div>
        </div>
    );
};

DecorationSelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    selectedDecorations: PropTypes.array,
    decorationPrice: PropTypes.number
};

export default DecorationSelector;