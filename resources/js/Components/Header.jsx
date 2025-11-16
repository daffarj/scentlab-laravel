import { useEffect, useState, useRef } from 'react';
import { ShoppingBag, User, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react';
import { Link, router } from '@inertiajs/react';

export function Header({ currentPage = 'home', auth }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const isLoggedIn = !!auth.user;
    const isAdmin = auth.user?.isAdmin || false;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo with Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        {isLoggedIn ? (
                            <Link href={route('home')} className="flex items-center space-x-2 group">
                                <ShoppingBag className="w-8 h-8 text-burgundy group-hover:scale-110 transition-transform" />
                                <span className="font-serif italic text-2xl text-burgundy">Scentlab</span>
                            </Link>
                        ) : (
                            <>
                                <button 
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center space-x-2 group"
                                >
                                    <ShoppingBag className="w-8 h-8 text-burgundy group-hover:scale-110 transition-transform" />
                                    <span className="font-serif italic text-2xl text-burgundy">Scentlab</span>
                                    <ChevronDown className={`w-5 h-5 text-burgundy transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {showDropdown && (
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                                        <Link
                                            href={route('login')}
                                            className="block w-full px-4 py-3 text-left text-mid-gray hover:bg-light-beige hover:text-burgundy transition-colors"
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="block w-full px-4 py-3 text-left text-mid-gray hover:bg-light-beige hover:text-burgundy transition-colors"
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8 flex-1 justify-end mr-8">
                        <Link
                            href={route('home')}
                            className={`transition-colors ${
                                currentPage === 'home' 
                                    ? 'text-burgundy font-semibold' 
                                    : 'text-mid-gray hover:text-burgundy'
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            href={route('catalog')}
                            className={`transition-colors ${
                                currentPage === 'catalog' 
                                    ? 'text-burgundy font-semibold' 
                                    : 'text-mid-gray hover:text-burgundy'
                            }`}
                        >
                            Catalog
                        </Link>
                        <Link
                            href={route('compare')}
                            className={`transition-colors ${
                                currentPage === 'compare' 
                                    ? 'text-burgundy font-semibold' 
                                    : 'text-mid-gray hover:text-burgundy'
                            }`}
                        >
                            Compare
                        </Link>
                    </nav>

                    {/* User Actions */}
                    {isLoggedIn && (
                        <div className="flex items-center space-x-4">
                            {isAdmin ? (
                                <Link
                                    href={route('admin.dashboard')}
                                    className="flex items-center space-x-2 text-mid-gray hover:text-burgundy transition-colors"
                                >
                                    <LayoutDashboard className="w-5 h-5" />
                                    <span className="hidden sm:inline">Dashboard</span>
                                </Link>
                            ) : (
                                <Link
                                    href={route('profile')}
                                    className="flex items-center space-x-2 text-mid-gray hover:text-burgundy transition-colors"
                                >
                                    <User className="w-5 h-5" />
                                    <span className="hidden sm:inline">Profile</span>
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 text-mid-gray hover:text-burgundy transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}