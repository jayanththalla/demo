import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-sm py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-4">
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center group"
                    >
                        <span className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                            Binge
                            <span className="text-yellow-400 group-hover:text-white transition-colors duration-300">Hall</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`relative text-lg transition-colors duration-300 ${isActive(link.path)
                                    ? 'text-yellow-400'
                                    : 'text-white hover:text-yellow-400'
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute left-0 right-0 bottom-0 h-0.5 bg-yellow-400 transform origin-left transition-transform duration-300 ${isActive(link.path) ? 'scale-x-100' : 'scale-x-0'
                                    } group-hover:scale-x-100`} />
                            </Link>
                        ))}
                        <Link
                            to="/book"
                            className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold 
                         hover:bg-yellow-300 transform hover:-translate-y-0.5 transition-all duration-300
                         active:scale-95"
                        >
                            Book Now
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white hover:text-yellow-400 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>

                {/* Mobile Navigation */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen
                    ? 'max-h-96 opacity-100 mt-4'
                    : 'max-h-0 opacity-0 pointer-events-none'
                    }`}>
                    <div className="flex flex-col space-y-4 py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-lg transition-colors duration-300 ${isActive(link.path)
                                    ? 'text-yellow-400'
                                    : 'text-white hover:text-yellow-400'
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/book"
                            className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold text-center
                         hover:bg-yellow-300 transform hover:-translate-y-0.5 transition-all duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;