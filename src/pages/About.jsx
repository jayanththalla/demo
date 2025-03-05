import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Film, Award, Target } from 'lucide-react';

const AboutSection = () => {
    // Animation controls
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    // Start animations when section comes into view
    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    return (
        <div className="bg-black text-white pb-16" ref={ref}>
            {/* Main hero image with proper padding */}
            <div className="relative px-4 md:px-8 lg:px-16 pt-4 pb-8">
                <motion.img
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    src="/assets/about.png"
                    alt="About BingeHall"
                    className="w-full h-64 sm:h-80 md:h-96 object-cover object-center rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 rounded-lg mx-4 md:mx-8 lg:mx-16"></div>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-center py-6 md:py-8"
            >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    <motion.span
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="block mb-2"
                    >
                        Where Every Frame is a Celebration,
                    </motion.span>
                    <motion.span
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        className="block "
                        style={{ color: '#FDDD3F' }}
                    >
                        Every Moment a Blockbuster!
                    </motion.span>
                </h2>
            </motion.div>
            {/* About Us */}
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate={controls}
                className="max-w-3xl mx-auto bg-black text-white text-center p-6 md:p-8 rounded-lg border-2 border-FDDD3F mt-12 md:mt-16"
                style={{ borderColor: '#FDDD3F' }}
            >
                <h3 className="text-xl md:text-2xl font-bold" style={{ color: '#FDDD3F' }}>About us</h3>
                <p className="mt-4 text-sm md:text-base">
                    At BingeHall, we believe in transforming moments into memories, ordinary
                    occasions into extraordinary experiences. Our passion for cinema and
                    celebration led us to create a haven for immersive private theatre
                    events. Whether it&apos;s birthdays, anniversaries, or any special gathering,
                    BingeHall is your exclusive venue for unforgettable festivities.
                </p>
            </motion.div>

            {/* Mission & Vision */}
            <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* Mission */}
                    <motion.div
                        className="animate-on-scroll border-2 border-FDDD3F p-6 rounded-lg shadow-md bg-black transform transition-all duration-300 hover:shadow-red-500/30 hover:shadow-lg"
                        style={{ borderColor: '#FDDD3F' }}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-start mb-4">
                            <Target className="w-6 h-6  mr-2 flex-shrink-0" style={{ color: '#FDDD3F' }} />
                            <h3 className="text-xl font-bold" style={{ color: '#FDDD3F' }}>
                                <span className="block ">Our</span> Mission
                            </h3>
                        </div>
                        <p className="mt-2 text-sm md:text-base text-gray-300">
                            Craft unique, intimate celebrations through cinema magic. Curate
                            personalized experiences exceeding expectations, transforming every
                            event into a blockbuster celebration.
                        </p>
                    </motion.div>

                    {/* Vision */}
                    <motion.div
                        className="animate-on-scroll border-2 border-FDDD3F p-6 rounded-lg shadow-md bg-black transform transition-all duration-300 hover:shadow-red-500/30 hover:shadow-lg"
                        style={{ borderColor: '#FDDD3F' }}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-start justify-end mb-4">
                            <h3 className="text-xl font-bold text-right">
                                <span className="block " style={{ color: '#FDDD3F' }}>Our</span> Vision
                            </h3>
                            <Award className="w-6 h-6  ml-2 flex-shrink-0" style={{ color: '#FDDD3F' }} />
                        </div>
                        <p className="mt-2 text-sm md:text-base text-gray-300">
                            BingeHall envisions becoming the go-to destination for those seeking
                            unparalleled cinematic celebrations. We aspire to set new standards in
                            private theatre experiences, combining cutting-edge technology with
                            exceptional service to create moments that last a lifetime.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Cinematic Reel with Quote */}
            <div className="relative mt-16">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={controls}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { delay: 0.3, duration: 0.8 }
                            }
                        }}
                        className="text-center px-4 py-8"
                    >
                        <p className="text-lg md:text-2xl font-semibold max-w-3xl mx-auto leading-relaxed">
                            <span style={{ color: '#FDDD3F' }}>Join us on this cinematic journey</span>, where every frame tells a story,
                            and every celebration is a blockbuster event.
                        </p>
                    </motion.div>
                </div>
                <img
                    src="/assets/reel.png"
                    alt="Film Reel"
                    className="w-full h-64 md:h-80 object-cover object-center"
                />
            </div>

            {/* Interactive Elements */}
            <motion.div
                variants={staggerChildren}
                initial="hidden"
                animate={controls}
                className="max-w-4xl mx-auto mt-16 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
                {[
                    { title: "Private Screenings", icon: "🎬" },
                    { title: "Premium Sound", icon: "🔊" },
                    { title: "Custom Events", icon: "🎉" }
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        variants={fadeIn}
                        whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(253, 221, 63, 0.3)" }}
                        className="bg-black p-6 rounded-lg text-center cursor-pointer transition-all duration-300 border border-gray-800"
                    >
                        <div className="text-4xl mb-4">{item.icon}</div>
                        <h3 className="text-lg font-bold mb-2" style={{ color: '#FDDD3F' }}>{item.title}</h3>
                        <div className="w-16 h-1 mx-auto my-3" style={{ backgroundColor: '#FDDD3F' }}></div>
                        <p className="text-sm text-gray-300">Click to learn more</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default AboutSection;