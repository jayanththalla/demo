import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Location coordinates for Binge Hall
    const location = {
        lat: 17.3810,
        lng: 78.5489,
        name: "Binge Hall, Kothapet, Hyderabad"
    };

    useEffect(() => {
        // Add animation when component mounts
        setIsVisible(true);

        // Load Leaflet resources
        const loadLeaflet = () => {
            // Load Leaflet CSS
            const leafletCSS = document.createElement('link');
            leafletCSS.rel = 'stylesheet';
            leafletCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
            document.head.appendChild(leafletCSS);

            // Load Leaflet JS
            const leafletScript = document.createElement('script');
            leafletScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
            document.body.appendChild(leafletScript);

            leafletScript.onload = initMap;
        };

        // Initialize the map
        const initMap = () => {
            if (window.L && document.getElementById('map')) {
                const map = window.L.map('map').setView([location.lat, location.lng], 15);

                window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                // Add marker for Binge Hall
                const marker = window.L.marker([location.lat, location.lng]).addTo(map);
                marker.bindPopup(`<b>Binge Hall</b><br>Kothapet, Hyderabad`).openPopup();

                // Add click event to the entire map
                map.on('click', () => {
                    openGoogleMaps();
                });

                // Add click event to the marker
                marker.on('click', () => {
                    openGoogleMaps();
                });
            }
        };

        // Function to open Google Maps
        const openGoogleMaps = () => {
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.name)}`;
            window.open(googleMapsUrl, '_blank');
        };

        loadLeaflet();

        // Cleanup
        return () => {
            // Remove the Leaflet script if needed
            const leafletScript = document.querySelector('script[src*="leaflet.js"]');
            if (leafletScript) {
                leafletScript.remove();
            }
        };
    }, []);

    // Function to open Google Maps directly
    const openGoogleMaps = () => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.name)}`;
        window.open(googleMapsUrl, '_blank');
    };

    // Function to open WhatsApp chat
    const openWhatsApp = () => {
        window.open('https://wa.me/919100111403', '_blank');
    };

    return (
        <footer className="bg-white py-8 text-gray-600 border-t border-gray-200">
            <div className="container mx-auto px-4 md:px-8">
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {/* Brand Info */}
                    <div className="transition-all duration-500 hover:translate-y-1">
                        <div className="mb-4">
                            <img
                                src="/assets/logo.png"
                                alt="Binge Hall"
                                className="h-16"
                            />
                        </div>
                        <p className="mb-4">
                            Your premium private cinema and event space in the heart of Hyderabad.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-500 hover:text-[#9f1d21] transition-colors duration-300 transform hover:scale-110">
                                <span className="sr-only">Facebook</span>
                                <Facebook size={24} />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-[#9f1d21] transition-colors duration-300 transform hover:scale-110">
                                <span className="sr-only">Instagram</span>
                                <Instagram size={24} />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-[#9f1d21] transition-colors duration-300 transform hover:scale-110">
                                <span className="sr-only">Twitter</span>
                                <Twitter size={24} />
                            </a>
                            <button
                                onClick={openWhatsApp}
                                className="text-gray-500 hover:text-green-600 transition-colors duration-300 transform hover:scale-110"
                                aria-label="Chat on WhatsApp"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="transition-all duration-500 hover:translate-y-1">
                        <h3 className="text-xl font-bold mb-4 text-black flex items-center">
                            <Clock className="mr-2 text-[#9f1d21]" size={20} />
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="hover:text-[#9f1d21] transition-colors flex items-center group">
                                    <span className="transform transition-transform group-hover:translate-x-1">→</span>
                                    <span className="ml-2">Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-[#9f1d21] transition-colors flex items-center group">
                                    <span className="transform transition-transform group-hover:translate-x-1">→</span>
                                    <span className="ml-2">About Us</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/gallery" className="hover:text-[#9f1d21] transition-colors flex items-center group">
                                    <span className="transform transition-transform group-hover:translate-x-1">→</span>
                                    <span className="ml-2">Gallery</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-[#9f1d21] transition-colors flex items-center group">
                                    <span className="transform transition-transform group-hover:translate-x-1">→</span>
                                    <span className="ml-2">Contact</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/book" className="hover:text-[#9f1d21] transition-colors flex items-center group">
                                    <span className="transform transition-transform group-hover:translate-x-1">→</span>
                                    <span className="ml-2">Book Now</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="hover:text-[#9f1d21] transition-colors flex items-center group">
                                    <span className="transform transition-transform group-hover:translate-x-1">→</span>
                                    <span className="ml-2">Terms & Conditions</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="hover:text-[#9f1d21] transition-colors flex items-center group">
                                    <span className="transform transition-transform group-hover:translate-x-1">→</span>
                                    <span className="ml-2">Privacy Policy</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/refund" className="hover:text-[#9f1d21] transition-colors flex items-center group">
                                    <span className="transform transition-transform group-hover:translate-x-1">→</span>
                                    <span className="ml-2">Refund Policy</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="transition-all duration-500 hover:translate-y-1">
                        <h3 className="text-xl font-bold mb-4 text-black flex items-center">
                            <Mail className="mr-2 text-[#9f1d21]" size={20} />
                            Contact Us
                        </h3>
                        <address className="not-italic space-y-3">
                            <p className="flex items-center">
                                <MapPin className="mr-2 text-[#9f1d21] flex-shrink-0" size={18} />
                                <span>Binge Hall, Laxmi Heights, Vasavi Colony, Nagole Road, near Ashtalakshmi Temple, RK Puram, Kothapet, Hyderabad, Telangana 500035</span>
                            </p>
                            <p className="flex items-center">
                                <Phone className="mr-2 text-[#9f1d21] flex-shrink-0" size={18} />
                                <a href="tel:+919100111403" className="hover:text-[#9f1d21] transition-colors">+91 9100111403</a>
                            </p>
                            <p className="flex items-center">
                                <Phone className="mr-2 text-[#9f1d21] flex-shrink-0" size={18} />
                                <a href="tel:+919100111402" className="hover:text-[#9f1d21] transition-colors">+91 9100111402</a>
                            </p>
                            <p className="flex items-center">
                                <Mail className="mr-2 text-[#9f1d21] flex-shrink-0" size={18} />
                                <a href="mailto:bingehall08@gmail.com" className="hover:text-[#9f1d21] transition-colors">bingehall08@gmail.com</a>
                            </p>
                            <button
                                onClick={openWhatsApp}
                                className="flex items-center mt-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Chat on WhatsApp
                            </button>
                        </address>
                    </div>

                    {/* OpenStreetMap with Google Maps redirect */}
                    <div className="transition-all duration-500 hover:translate-y-1 hover:shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-black flex items-center">
                            <MapPin className="mr-2 text-[#9f1d21]" size={20} />
                            Find Us
                        </h3>
                        <div className="rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <div className="relative cursor-pointer" style={{ height: "200px" }} onClick={openGoogleMaps}>
                                {/* OpenStreetMap with Leaflet */}
                                <div id="map" className="w-full h-full"></div>
                                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openGoogleMaps();
                                        }}
                                        className="bg-white text-[#9f1d21] py-2 px-4 rounded-lg shadow-md font-medium hover:bg-[#9f1d21] hover:text-white transition-colors duration-300"
                                    >
                                        Open in Google Maps
                                    </button>
                                </div>
                            </div>
                            <div className="p-3 bg-white cursor-pointer" onClick={openGoogleMaps}>
                                <p className="text-sm text-gray-700 font-medium">Binge Hall</p>
                                <p className="text-xs text-gray-500">Kothapet, Hyderabad</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className={`border-t border-gray-200 mt-8 pt-8 text-center text-sm transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <p>&copy; {new Date().getFullYear()} BingeHall. All rights reserved.</p>
                    <p className="mt-2">Designed with ❤️ for movie lovers</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;