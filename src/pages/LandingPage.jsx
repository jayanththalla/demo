import { Calendar, Star, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Typical from 'react-typical';
import Typewriter from 'react-typewriter-effect';
import WhyChooseUs from '../components/WhyChooseUs';
import { Link } from 'react-router-dom';

// Add WhatsApp icon component
const WhatsAppIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
    >
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z" />
    </svg>
);

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
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-yellow-50 text-black relative">
            {/* WhatsApp Floating Button */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8, type: 'spring' }}
                className="fixed right-6 bottom-6 z-50"
            >
                <a
                    href="https://wa.me/919100111403"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:shadow-2xl hover:scale-110"
                >
                    <WhatsAppIcon />
                    <span className="sr-only">Contact us on WhatsApp</span>
                </a>
            </motion.div>

            {/* Hero Section - Fixed to eliminate gap */}
            <div className="relative min-h-screen flex items-center -mt-16 pt-16">
                <div className="absolute inset-0 z-10 bg-black bg-opacity-30" />
                <div className="absolute inset-0 bg-[url('/assets/front.jpg')] bg-cover bg-center bg-no-repeat opacity-90" />
                <div className="relative z-20 container mx-auto px-4 md:px-8 flex items-center py-16 md:py-0">
                    <div className="max-w-2xl backdrop-blur-sm bg-white bg-opacity-20 p-8 rounded-lg border-l-4 border-[#9f1d21]">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6">
                            <Typical
                                steps={[
                                    "Let's Celebrate Your", 2000,
                                    "Party With Us!", 3000,
                                ]}
                                loop={Infinity}
                                wrapper="span"
                                className="text-yellow-500"
                            />
                        </h1>
                        <p className="text-lg md:text-xl mb-6 md:mb-8 text-white">
                            Welcome to <span className="text-yellow-300 font-bold">Binge Hall</span> your premier destination for an extraordinary private theatre and event celebration experience.
                        </p>
                        <Link
                            to="/book"
                            className="bg-[#9f1d21] text-white px-6 py-2 rounded-full font-semibold 
                         hover:bg-[#b12329] transform hover:-translate-y-0.5 transition-all duration-300
                         active:scale-95 shadow-lg"
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-12 md:py-20 bg-gradient-to-r from-red-100 to-yellow-100">
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
                                className="bg-white rounded-xl p-5 md:p-6 lg:p-8 shadow-lg border-l-4 border-[#9f1d21] group"
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
            <div className="py-12 md:py-20 bg-gradient-to-r from-[#9f1d21] to-[#b12329] text-white">
                <div className="container mx-auto px-4 md:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-8">
                        Ready to Create Unforgettable Memories?
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
                        Book your private theatre experience today and transform your celebration into an extraordinary event.
                    </p>
                    <Link to="/contact" className="bg-white text-[#9f1d21] px-6 py-3 sm:px-8 rounded-full font-bold hover:bg-gray-100 transition-colors text-sm md:text-base border-2 border-yellow-300 shadow-lg">
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;