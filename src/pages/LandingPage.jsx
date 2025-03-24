import { Calendar, Star, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Typical from 'react-typical';
import Typewriter from 'react-typewriter-effect';
import WhyChooseUs from '../components/WhyChooseUs';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const features = [
        {
            icon: <Volume2 className="w-6 h-6" />,
            title: "Dolby Atmos Sound",
            description: "Immerse yourself in crystal-clear surround sound that brings every moment to life."
        },
        {
            icon: <Star className="w-6 h-6" />,
            title: "4K Projection",
            description: "Experience stunning visual clarity with our state-of-the-art 4K projection system."
        },
        {
            icon: <Calendar className="w-6 h-6" />,
            title: "Private Events",
            description: "Perfect for birthdays, corporate events, and special celebrations."
        }
    ];

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center">
                <div className="absolute inset-0 z-10" />
                <div className="absolute inset-0 bg-[url('/assets/front.jpg')] bg-cover bg-center opacity-80" />
                <div className="relative z-20 container mx-auto px-4 md:px-8 flex items-center py-16 md:py-0">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6">
                            <Typical
                                steps={[
                                    "Let's Celebrate Your", 2000,
                                    "Party With Us!", 3000,
                                ]}
                                loop={Infinity}
                                wrapper="span"
                                className="text-yellow-400"
                            />
                        </h1>
                        <p className="text-lg md:text-xl mb-6 md:mb-8 text-white">
                            Welcome to Binge Hall your premier destination for an extraordinary private theatre and event celebration experience.
                        </p>
                        <Link
                            to="/book"
                            className="bg-[#9f1d21] text-white px-6 py-2 rounded-full font-semibold 
                         hover:bg-[#b12329] transform hover:-translate-y-0.5 transition-all duration-300
                         active:scale-95"
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-12 md:py-20 bg-white">
                <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 md:mb-16 text-black"
                    >
                        <Typewriter
                            text="Experience Cinema Like Never Before...."
                            cursorColor="#9f1d21"
                            delay={25}
                            className="text-[#9f1d21]"
                        />
                    </motion.h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                whileHover={{ scale: 1.05, translateY: -8 }}
                                className="bg-white rounded-xl p-5 md:p-6 lg:p-8 shadow-lg border border-gray-200 group"
                            >
                                <div className="text-[#9f1d21] mb-4 md:mb-6 transform group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-4 text-black group-hover:text-[#9f1d21] transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <WhyChooseUs />

            {/* CTA Section */}
            <div className="py-12 md:py-20 bg-[#9f1d21] text-white">
                <div className="container mx-auto px-4 md:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-8">
                        Ready to Create Unforgettable Memories?
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
                        Book your private theatre experience today and transform your celebration into an extraordinary event.
                    </p>
                    <Link to="/contact" className="bg-white text-[#9f1d21] px-6 py-3 sm:px-8 rounded-full font-bold hover:bg-gray-100 transition-colors text-sm md:text-base">
                        Contact Us
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default LandingPage;