import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PropTypes from 'prop-types';
import { decorations, roses, photography } from './data/constants';

const AddOnsSelector = ({ onSelect, onBack, onNext, selectedDecorations, selectedRose, selectedPhotography }) => {
    const [selectedDecorationsLocal, setSelectedDecorationsLocal] = useState(selectedDecorations);
    const [selectedRoseLocal, setSelectedRoseLocal] = useState(selectedRose);
    const [selectedPhotographyLocal, setSelectedPhotographyLocal] = useState(selectedPhotography);
    const [totalPrice, setTotalPrice] = useState(0);
    const [bookingHistory, setBookingHistory] = useState([]);
    const [bookingStep, setBookingStep] = useState('selection');

    const handleNextStep = (newStep) => {
        setBookingHistory([...bookingHistory, bookingStep]);
        setBookingStep(newStep);
    };

    const handlePreviousStep = () => {
        if (bookingHistory.length > 0) {
            setBookingStep(bookingHistory.pop());
            setBookingHistory([...bookingHistory]);
        }
    };

    useEffect(() => {
        onSelect({
            decorations: selectedDecorationsLocal,
            rose: selectedRoseLocal,
            photography: selectedPhotographyLocal,
        });
    }, [selectedDecorationsLocal, selectedRoseLocal, selectedPhotographyLocal, onSelect]);

    const toggleDecoration = (id) => {
        if (selectedDecorationsLocal.includes(id)) {
            setSelectedDecorationsLocal(selectedDecorationsLocal.filter(item => item !== id));
        } else {
            setSelectedDecorationsLocal([...selectedDecorationsLocal, id]);
        }
    };
    useEffect(() => {
        // Calculate total price from all selections
        let price = 0;

        // Add decoration prices
        selectedDecorations.forEach(id => {
            const item = decorations.find(d => d.id === id);
            if (item) price += item.price;
        });

        // Add rose price
        if (selectedRose) {
            const roseItem = roses.find(r => r.id === selectedRose);
            if (roseItem) price += roseItem.price;
        }

        // Add photography price
        if (selectedPhotography) {
            const photoItem = photography.find(p => p.id === selectedPhotography);
            if (photoItem) price += photoItem.price;
        }

        setTotalPrice(price);

        // Send selections to parent component
        onSelect({
            decorations: selectedDecorations,
            rose: selectedRose,
            photography: selectedPhotography,
            totalPrice: price
        });
    }, [selectedDecorations, selectedRose, selectedPhotography, onSelect, decorations, roses, photography]);
    return (
        <div className="py-6 bg-gray-50 text-black">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <div className="w-8 h-1 bg-yellow-400 mr-3"></div>
                    <h2 className="text-2xl font-bold">Add-ons</h2>
                </div>
                <div className="text-right">
                    <div className="bg-white text-black border-2 border-yellow-400 px-4 py-2 rounded font-bold">
                        Price: ₹{totalPrice}
                    </div>
                </div>
            </div>

            {/* Decorations Section */}
            <div className="mb-6">
                <div className="flex items-center mb-4">
                    <div className="w-6 h-1 bg-yellow-400 mr-3"></div>
                    <h3 className="text-xl font-bold">Decorations</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {decorations.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => toggleDecoration(item.id)}
                            className={`
                            relative rounded-lg overflow-hidden cursor-pointer border-2
                            ${selectedDecorationsLocal.includes(item.id) ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-gray-300'}
                        `}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-32 object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-white text-black text-xs font-bold px-2 py-1 rounded border border-yellow-400">
                                ₹{item.price}
                            </div>
                            <div className="text-center py-2 font-medium text-sm bg-white">
                                {item.name}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 text-sm text-black">
                    NOTE: 1. These decorations will be set up on the day of booking. You need to send hi-res
                    versions of the photos you want to place inside the frames.
                    <br />
                    2. You can take these hard copies with you after the party!
                </div>
            </div>

            {/* Rose Section */}
            <div className="mb-6">
                <div className="flex items-center mb-4">
                    <div className="w-6 h-1 bg-yellow-400 mr-3"></div>
                    <h3 className="text-xl font-bold">Rose</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {roses.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedRoseLocal(selectedRose === item.id ? null : item.id)}
                            className={`
                                relative rounded-lg overflow-hidden cursor-pointer border-2
                                ${selectedRose === item.id ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-gray-300'}
                            `}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-32 object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-white text-black text-xs font-bold px-2 py-1 rounded border border-yellow-400">
                                ₹{item.price}
                            </div>
                            <div className="text-center py-2 font-medium text-sm bg-white">
                                {item.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Photography Section */}
            <div className="mb-6">
                <div className="flex items-center mb-4">
                    <div className="w-6 h-1 bg-yellow-400 mr-3"></div>
                    <h3 className="text-xl font-bold">Photography</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {photography.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedPhotographyLocal(selectedPhotography === item.id ? null : item.id)}
                            className={`
                                relative rounded-lg overflow-hidden cursor-pointer border-2
                                ${selectedPhotography === item.id ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-gray-300'}
                            `}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-32 object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-white text-black text-xs font-bold px-2 py-1 rounded border border-yellow-400">
                                ₹{item.price}
                            </div>
                            <div className="text-center py-2 font-medium text-sm bg-white">
                                {item.name}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 text-sm text-black">
                    NOTE: Timing of the photography is according to the availability of the photographer.
                </div>
            </div>

            <div className="mt-6 flex justify-between">
                <button
                    onClick={onBack || handlePreviousStep}
                    className="px-6 py-3 border-2 border-[#9f1d21] text-[#9f1d21] rounded flex items-center hover:bg-[#9f1d21] hover:text-white transition-colors"
                >
                    <ArrowLeft size={18} className="mr-2" />
                    Previous
                </button>
                <button
                    onClick={onNext || handleNextStep}
                    className="px-6 py-3 bg-[#9f1d21] text-white rounded flex items-center hover:bg-white hover:text-[#9f1d21] hover:border-[#9f1d21] hover:border-2 transition-colors"
                >
                    Book Now
                    <ArrowRight size={18} className="ml-2" />
                </button>
            </div>
        </div>
    );
};

AddOnsSelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    selectedDecorations: PropTypes.array, // Add prop type
    selectedRose: PropTypes.string, // Add prop type
    selectedPhotography: PropTypes.string // Add prop type
};

export default AddOnsSelector;