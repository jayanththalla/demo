import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    // Gallery images - replace with your actual image paths
    const galleryImages = [
        // Row 1 - Cake images
        { id: 1, src: '/assets/gallery/1.png', alt: 'Celebration cake', category: 'events' },
        { id: 2, src: '/assets/gallery/2.png', alt: 'Celebration cake closeup', category: 'events' },

        // Row 2 - Concert/light images
        { id: 3, src: '/assets/gallery/3.png', alt: 'Concert lighting effects', category: 'ambiance' },
        { id: 4, src: '/assets/gallery/4.png', alt: 'Audience at concert', category: 'ambiance' },

        // Row 3 - Crowd images
        { id: 5, src: '/assets/gallery/5.png', alt: 'Event crowd with lights', category: 'audience' },
        { id: 6, src: '/assets/gallery/6.png', alt: 'Event crowd celebration', category: 'audience' },

        // Row 4 - Confetti images
        { id: 7, src: '/assets/gallery/7.png', alt: 'Confetti celebration', category: 'effects' },
        { id: 8, src: '/assets/gallery/7.png', alt: 'Confetti celebration closeup', category: 'effects' },
    ];

    // Function to open the image modal
    const openModal = (image) => {
        setSelectedImage(image);
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    };

    // Function to close the image modal
    const closeModal = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto'; // Allow scrolling again
    };

    // Navigate to next/previous image in the modal
    const navigateImage = (direction) => {
        const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
        const newIndex = direction === 'next'
            ? (currentIndex + 1) % galleryImages.length
            : (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        setSelectedImage(galleryImages[newIndex]);
    };

    return (
        <div className="bg-black text-white pb-12">
            <div className="relative">
                <h2 className="text-center text-3xl font-bold py-4">Gallery</h2>

                {/* Gallery intro with film strip background */}
                <div className="relative bg-black text-white py-12 md:py-16" style={{ backgroundImage: 'url(/assets/gallery/reel.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    {/* Content */}
                    <div className="relative z-10 max-w-3xl mx-auto text-center px-4 md:px-6">
                        <h3 className="text-xl md:text-2xl font-bold mb-3">Explore the Cinematic Marvels of BingeHall!</h3>
                        <p className="text-sm md:text-base text-gray-300">
                            From intimate celebrations to blockbuster events, witness the magic unfold in
                            our gallery. Discover the joy-filled moments, the awe-inspiring celebrations,
                            and the unforgettable memories that make BingeHall the ultimate destination for cinematic festivities.
                        </p>

                        {/* Responsive Popcorn Icon - Hidden on small screens, visible and positioned properly on larger screens */}
                        <motion.div
                            className="hidden md:block absolute md:right-0 lg:-right-16 xl:-right-24 top-0 md:top-0 lg:-top-16 w-24 md:w-32 lg:w-40"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <img src="/assets/3.png" alt="Popcorn" className="w-full" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Gallery Grid - Improved for different screen sizes */}
            <div className="container mx-auto px-4 mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.03 }}
                            className="relative rounded-lg overflow-hidden cursor-pointer"
                            onClick={() => openModal(image)}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full aspect-video object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <ZoomIn className="text-white w-8 h-8 md:w-10 md:h-10" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Image Modal - Made more responsive */}
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-2 md:p-4"
                    onClick={closeModal}
                >
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="relative max-w-4xl w-full"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 z-10 bg-red-600 rounded-full p-1 text-white"
                            onClick={closeModal}
                        >
                            <X className="w-5 h-5 md:w-6 md:h-6" />
                        </button>

                        <div className="relative">
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="w-full rounded-lg"
                            />

                            {/* Responsive navigation buttons */}
                            <button
                                className="absolute left-1 md:left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1 md:p-2 text-white"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigateImage('prev');
                                }}
                            >
                                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                            </button>

                            <button
                                className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1 md:p-2 text-white"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigateImage('next');
                                }}
                            >
                                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                        </div>

                        <div className="text-white p-2 md:p-4 text-center">
                            <p className="text-base md:text-lg font-semibold">{selectedImage.alt}</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* View More Button */}
            <div className="text-center mt-8">
                <motion.button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 md:px-6 rounded-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    View More
                </motion.button>
            </div>
        </div>
    );
};

export default Gallery;