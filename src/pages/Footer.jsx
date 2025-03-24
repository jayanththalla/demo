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
                            Your premium private cinema and event space in the heart of the city.
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
                                <span>+91 9100111402</span>
                            </p>
                            <p className="flex items-center">
                                <Phone className="mr-2 text-[#9f1d21] flex-shrink-0" size={18} />
                                <span>+91 9100111403</span>
                            </p>
                            <p className="flex items-center">
                                <Mail className="mr-2 text-[#9f1d21] flex-shrink-0" size={18} />
                                <span>info@bingehall.com</span>
                            </p>
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
                                    <a
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openGoogleMaps();
                                        }}
                                        className="bg-white text-[#9f1d21] py-2 px-4 rounded-lg shadow-md font-medium hover:bg-[#9f1d21] hover:text-white transition-colors duration-300"
                                    >
                                        Open in Google Maps
                                    </a>
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
                </div>
            </div>
        </footer>
    );
};

export default Footer;