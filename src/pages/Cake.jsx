import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PropTypes from 'prop-types';

const CakeSelector = ({ onSelect, onBack, onNext }) => {
    const [selectedCake, setSelectedCake] = useState(null);
    const [isEggless, setIsEggless] = useState(false);

    const cakeOptions = [
        { id: 'none', name: 'None', image: '/api/placeholder/400/320', price: 0 },
        { id: 'vanilla', name: 'Vanilla', image: '/api/placeholder/400/320', price: 900 },
        { id: 'pineapple', name: 'Pineapple', image: '/api/placeholder/400/320', price: 950 },
        { id: 'mango', name: 'Mango', image: '/api/placeholder/400/320', price: 1000 },
        { id: 'strawberry', name: 'Strawberry', image: '/api/placeholder/400/320', price: 950 },
        { id: 'chocolate', name: 'Chocolate', image: '/api/placeholder/400/320', price: 950 },
        { id: 'blackforest', name: 'Black Forest', image: '/api/placeholder/400/320', price: 950 },
        { id: 'chocolatetruffle', name: 'Chocolate Truffle', image: '/api/placeholder/400/320', price: 1000 },
        { id: 'whiteforest', name: 'White Forest', image: '/api/placeholder/400/320', price: 950 },
        { id: 'butterscotch', name: 'Butterscotch', image: '/api/placeholder/400/320', price: 950 },
    ];

    useEffect(() => {
        if (selectedCake) {
            const cakeOption = cakeOptions.find(c => c.id === selectedCake);
            onSelect(selectedCake !== 'none', cakeOption?.price || 0, isEggless);
        }
    }, [selectedCake, isEggless, onSelect, cakeOptions]);

    return (
        <div className="py-6 bg-black text-white">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <div className="w-8 h-1 bg-yellow-400 mr-3"></div>
                    <h2 className="text-2xl font-bold">Cakes</h2>
                </div>
                <div className="text-right">
                    <div className="bg-black text-white border-2 border-yellow-400 px-4 py-2 rounded font-bold">
                        Price: {selectedCake ? `₹${cakeOptions.find(c => c.id === selectedCake)?.price || 0}` : '₹0'}
                    </div>
                </div>
            </div>

            <div className="mb-6 flex items-center">
                <span className="mr-3">Eggless</span>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isEggless}
                        onChange={() => setIsEggless(!isEggless)}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {cakeOptions.map((cake) => (
                    <div
                        key={cake.id}
                        onClick={() => setSelectedCake(cake.id)}
                        className={`
                            relative rounded-lg overflow-hidden cursor-pointer border-2
                            ${selectedCake === cake.id ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-white'}
                        `}
                    >
                        <img
                            src={cake.image}
                            alt={cake.name}
                            className="w-full h-32 object-cover"
                        />
                        {cake.id !== 'none' && (
                            <div className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded border border-yellow-400">
                                ₹{cake.price}
                            </div>
                        )}
                        <div className={`
                            text-center py-2 font-medium text-sm bg-black
                            ${cake.id === 'none' ? 'border-t-2 border-yellow-400' : ''}
                        `}>
                            {cake.name}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 text-sm text-white">
                NOTE : Above images are for demonstration purposes only. Actual cake may look different.
            </div>

            <div className="mt-6 flex justify-between">
                <button
                    onClick={onBack}
                    className="px-6 py-3 border-2 border-yellow-400 text-white rounded flex items-center hover:bg-yellow-400 hover:text-black transition-colors"
                >
                    <ArrowLeft size={18} className="mr-2" />
                    Previous
                </button>

                <button
                    onClick={onNext}
                    disabled={!selectedCake}
                    className={`px-6 py-3 bg-yellow-400 text-black rounded flex items-center hover:bg-white hover:text-black hover:border-yellow-400 transition-colors
                        ${!selectedCake ? 'opacity-50 cursor-not-allowed' : ''}
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
    onNext: PropTypes.func.isRequired
};

export default CakeSelector;