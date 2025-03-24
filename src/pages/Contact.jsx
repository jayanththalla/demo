import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        // Reset form after submission
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    // FAQ data
    const faqs = [
        { question: "What are your operating hours?", answer: "Monday to Friday: 10 AM - 10 PM, Weekends: 9 AM - 11 PM" },
        { question: "Do you offer private screenings?", answer: "Yes, we offer private screenings with advanced booking." },
        { question: "How can I book tickets?", answer: "You can book tickets online or at our counter." },
        { question: "Is there parking available?", answer: "Yes, we have ample parking space available." },
        { question: "Do you have special events?", answer: "We regularly host special events. Check our events page." },
        { question: "Are outside food and drinks allowed?", answer: "Outside food is not permitted, but we have a wide range of refreshments available." }
    ];

    return (
        <div className="bg-white text-black min-h-screen">

            <div className="container mx-auto px-4 py-8">
                <motion.h1
                    className="text-3xl md:text-5xl font-bold text-center mb-8"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Contact us
                </motion.h1>


                <motion.div
                    className="relative max-w-3xl mx-auto mb-12 text-center bg-opacity-50 p-4 md:p-6 rounded-lg bg-gray-100"
                    style={{
                        backgroundImage: 'url(/assets/curtain.png)',
                        backgroundSize: 'cover',
                    }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Timings</h2>
                    <div className="mb-3">
                        <p className="text-lg md:text-xl text-yellow-400">Monday to Friday: 10 AM - 10 PM</p>
                        <p className="text-lg md:text-xl text-yellow-400">Weekends: 9 AM - 11 PM</p>
                    </div>
                    <p className="text-sm md:text-base text-white">
                        For reservations and special events, please call during business hours or fill out the contact form below.
                    </p>
                    <p className="text-base md:text-lg font-bold mt-2 text-yellow-400">Contact: +91  9100111402</p>

                    {/* Popcorn Animation */}
                    <motion.div
                        className="absolute right-2 md:right-8 -bottom-14 md:bottom-0 w-16 md:w-20"
                        animate={{
                            y: [0, -8, 0],
                            rotate: [0, 5, 0, 0, 0]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            ease: "easeInOut"
                        }}
                    >
                        <img src="/assets/popcorn.png" alt="Popcorn" className="w-full" />
                    </motion.div>
                </motion.div>

                {/* FAQ Section */}
                <motion.div
                    className="max-w-3xl mx-auto mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#9f1d21]">Frequently Asked Questions</h2>
                    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg border border-yellow-400">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                className="border-b border-yellow-300 last:border-b-0"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * index }}
                            >
                                <details className="group p-4">
                                    <summary className="flex justify-between items-center cursor-pointer list-none text-black">
                                        <span className="font-medium">{faq.question}</span>
                                        <motion.span
                                            className="transition text-[#9f1d21]"
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </motion.span>
                                    </summary>
                                    <p className="mt-3 text-gray-700 group-open:animate-fadeIn pl-2 border-l-2 border-yellow-400">
                                        {faq.answer}
                                    </p>
                                </details>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Slogan Banner on Film Reel */}
                <motion.div
                    className="max-w-4xl mx-auto p-4 md:p-8 mb-12 bg-gray-100 rounded-lg text-center relative overflow-hidden"
                    style={{
                        backgroundImage: 'url(/assets/reel.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                >
                    <motion.div
                        className="relative z-10 p-4 md:p-6 bg-white bg-opacity-90 rounded-lg"
                        animate={{
                            boxShadow: ['0 0 0px #9f1d21', '0 0 20px #FDDD3F', '0 0 0px #FDDD3F']
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <h3 className="text-xl md:text-3xl font-bold text-[#9f1d21]">BingeHall: Where Every Frame is a Celebration, Every Moment a Blockbuster!</h3>
                    </motion.div>

                    {/* Star decoration */}
                    <motion.div
                        className="absolute left-4 bottom-0 w-12 md:w-16"
                        animate={{
                            rotate: [0, 180, 360],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ repeat: Infinity, duration: 5 }}
                    >
                    </motion.div>
                </motion.div>

                {/* Footer with Contact Info and Form */}
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Contact Information */}
                    <motion.div
                        className="bg-gray-100 p-6 rounded-lg shadow-lg border-2 border-yellow-400"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ boxShadow: '0 0 15px rgba(234, 179, 8, 0.5)' }}
                    >
                        <h3 className="text-xl md:text-2xl font-bold mb-4 text-[#9f1d21]">Contact Information</h3>
                        <ul className="space-y-4">
                            <motion.li
                                className="flex items-center"
                                whileHover={{ x: 5 }}
                            >
                                <Phone className="mr-3 text-[#9f1d21]" size={20} />
                                <span>+91  9100111402</span>
                            </motion.li>
                            <motion.li
                                className="flex items-center"
                                whileHover={{ x: 5 }}
                            >
                                <Mail className="mr-3 text-[#9f1d21]" size={20} />
                                <span>info@bingehall.com</span>
                            </motion.li>
                            <motion.li
                                className="flex items-center"
                                whileHover={{ x: 5 }}
                            >
                                <MapPin className="mr-3 text-[#9f1d21]" size={50} />
                                <span>Binge Hall, Laxmi Heights, Vasavi Colony, Nagole Road, near Ashtalakshmi Temple, RK Puram, Kothapet, Hyderabad, Telangana 500035</span>
                            </motion.li>
                            <motion.li
                                className="flex items-center"
                                whileHover={{ x: 5 }}
                            >
                                <Clock className="mr-3 text-[#9f1d21]" size={20} />
                                <span>Mon-Fri: 10AM-10PM, Weekends: 9AM-11PM</span>
                            </motion.li>
                        </ul>

                        {/* Social Media Icons */}
                        <div className="mt-6 flex space-x-4">
                            <motion.a
                                href="#"
                                className="bg-[#9f1d21] text-white p-2 rounded-full transition-all"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                                </svg>
                            </motion.a>
                            <motion.a
                                href="#"
                                className="bg-[#9f1d21] text-white p-2 rounded-full transition-all"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                </svg>
                            </motion.a>
                            <motion.a
                                href="#"
                                className="bg-[#9f1d21] text-white p-2 rounded-full transition-all"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                                </svg>
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className="bg-gray-100 p-6 rounded-lg shadow-lg border-2 border-yellow-400"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ boxShadow: '0 0 15px rgba(234, 179, 8, 0.5)' }}
                    >
                        <h3 className="text-xl md:text-2xl font-bold mb-4 text-[#9f1d21]">Send us a Message</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9f1d21]"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9f1d21]"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9f1d21]"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-sm font-medium mb-1">Your Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9f1d21]"
                                    required
                                ></textarea>
                            </div>
                            <motion.button
                                type="submit"
                                className="w-full bg-[#9f1d21] text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Send className="mr-2" size={18} />
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default Contact;