import { motion } from 'framer-motion';
import { Film, Volume2, Calendar, Users } from 'lucide-react';

const WhyChooseUs = () => {
    const categories = [
        { id: 1, name: "Food & Beverage", image: "/assets/BingeHall/2.png" },
        { id: 2, name: "Netflix", image: "/assets/BingeHall/3.png" },
        { id: 3, name: "Bouquets", image: "/assets/BingeHall/4.png" },
        { id: 4, name: "Photography", image: "/assets/BingeHall/5.png" },
        { id: 5, name: "Photo Clipping", image: "/assets/BingeHall/8.png" },
        { id: 6, name: "Fog Effect", image: "/assets/BingeHall/6.png" }
    ];
    const features = [
        {
            number: '01',
            title: 'Exclusive Experience',
            description: 'With four private theaters and a 50-seating hall, BingeHall offers flexible capacities for various events, ensuring memorable gatherings.',
            icon: <Film className="w-6 h-6" />
        },
        {
            number: '02',
            title: 'Top-notch Technology',
            description: 'Immerse in cutting-edge audio-visual technology with 133-inch 4K video and a 1000W Dolby Atmos sound system.',
            icon: <Volume2 className="w-6 h-6" />
        },
        {
            number: '03',
            title: 'Seamless Booking',
            description: 'Effortlessly book your slot online, choosing preferred theaters, dates, and times for a hassle-free and convenient cinematic experience.',
            icon: <Calendar className="w-6 h-6" />
        },
        {
            number: '04',
            title: 'Personalized Attention',
            description: 'Our team ensures a tailored experience, handling details, promising a seamless, memorable celebration.',
            icon: <Users className="w-6 h-6" />
        }
    ];

    return (
        <div className="relative py-24 overflow-hidden bg-black">
            {/* Background with reliable placeholder */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-pattern">
                    {/* Using placeholder image since the original wasn't showing */}
                    <img src="/binge-n-bash/public/assets/2.png" alt="Filmstrip Background" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-red-700 opacity-10 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-700 opacity-10 rounded-full translate-x-24 translate-y-24"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold">
                        Why choose <span className="text-[#FACC15] relative">
                            us?
                            <span className="absolute bottom-1 left-0 w-full h-2 bg-red-200 -z-10"></span>
                        </span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                            }}
                            className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 flex"
                        >
                            <div className="bg-[#FACC15] text-black font-bold text-2xl w-16 h-16 flex items-center justify-center rounded-lg mr-5 shrink-0">
                                {feature.number}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-[#FACC15]">{feature.icon}</span>
                                    <h3 className="text-2xl font-bold text-gray-600">{feature.title}</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16"
                >
                    <a
                        href="/about"
                        className="group px-8 py-4 border-2 border-[#FACC15] text-[#FACC15] rounded-lg hover:bg-[#FACC15] hover:text-black transition-all duration-300 font-medium text-lg min-w-40 text-center relative overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Know more
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                    </a>
                    <a
                        href="/book"
                        className="group px-8 py-4 bg-[#FACC15] text-black rounded-lg hover:bg-yellow-400 transition-all duration-300 font-medium text-lg min-w-40 text-center shadow-lg shadow-yellow-500/20"
                    >
                        <span className="flex items-center justify-center gap-2">
                            Book now
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                    </a>
                </motion.div>

            </div>
            <div className="container mx-auto mt-5 px-4 relative z-10">
                {/* Animated Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold">
                        Add <span className="text-[#FACC15] relative">
                            ons
                            <span className="absolute bottom-1 left-0 w-full h-2 bg-red-200 -z-10"></span>
                        </span>
                    </h2>
                </motion.div>

                <div className="overflow-x-auto pb-6">
                    <div className="flex space-x-12 min-w-max">
                        {categories.map((category) => (
                            <div key={category.id} className="flex flex-col items-center w-40">
                                <div className="w-full h-40 rounded-lg overflow-hidden shadow-md mb-2">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;