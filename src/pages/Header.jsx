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

        const debouncedHandleScroll = debounce(handleScroll, 100);

        window.addEventListener('scroll', debouncedHandleScroll);
        return () => window.removeEventListener('scroll', debouncedHandleScroll);
    }, []);

    const debounce = (func, wait) => {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header
            className={`fixed w-full z-50 transition-all duration-200 ${scrolled ? 'bg-white/90 backdrop-blur-sm shadow-md' : 'bg-white'
                } py-4`}
        >
            <div className="container mx-auto px-4">
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center group"
                    >
                        <img
                            src="/assets/logo.png"
                            alt="Binge Hall"
                            className="h-10 md:h-14"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`relative text-lg transition-colors duration-300 ${isActive(link.path)
                                    ? 'text-[#9f1d21]'
                                    : 'text-black hover:text-[#9f1d21]'
                                    }`}
                            >
                                {link.name}
                                <span
                                    className={`absolute left-0 right-0 bottom-0 h-0.5 bg-[#9f1d21] transform origin-left transition-transform duration-300 ${isActive(link.path) ? 'scale-x-100' : 'scale-x-0'
                                        } group-hover:scale-x-100`}
                                />
                            </Link>
                        ))}
                        <Link
                            to="/book"
                            className="bg-[#9f1d21] text-white px-6 py-2 rounded-full font-semibold 
                             hover:bg-[#b12329] transform hover:-translate-y-0.5 transition-all duration-300
                             active:scale-95"
                        >
                            Book Now
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-black hover:text-[#9f1d21] transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>

                {/* Mobile Navigation */}
                <div
                    className={`md:hidden transition-all duration-300 ease-in-out ${isOpen
                        ? 'max-h-96 opacity-100 mt-4'
                        : 'max-h-0 opacity-0 pointer-events-none'
                        }`}
                >
                    <div className="flex flex-col space-y-4 py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-lg transition-colors duration-300 ${isActive(link.path)
                                    ? 'text-[#9f1d21]'
                                    : 'text-black hover:text-[#9f1d21]'
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/book"
                            className="bg-[#9f1d21] text-white px-6 py-2 rounded-full font-semibold text-center
                             hover:bg-[#b12329] transform hover:-translate-y-0.5 transition-all duration-300"
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