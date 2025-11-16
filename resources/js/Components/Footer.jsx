import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-light-beige mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-burgundy">About Scentlab</h3>
                        <p className="text-mid-gray text-sm leading-relaxed">
                            Discover your signature scent with our curated collection of premium perfumes from around the world.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-burgundy">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="text-mid-gray hover:text-burgundy transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-mid-gray hover:text-burgundy transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-mid-gray hover:text-burgundy transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-mid-gray hover:text-burgundy transition-colors">
                                    Shipping Info
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-burgundy">Contact</h3>
                        <ul className="space-y-2 text-sm text-mid-gray">
                            <li>Email: info@scentlab.com</li>
                            <li>Phone: +1 (555) 123-4567</li>
                            <li>Address: 123 Fragrance Ave</li>
                            <li>New York, NY 10001</li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-burgundy">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a 
                                href="#" 
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-burgundy hover:bg-burgundy hover:text-white transition-colors"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a 
                                href="#" 
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-burgundy hover:bg-burgundy hover:text-white transition-colors"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a 
                                href="#" 
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-burgundy hover:bg-burgundy hover:text-white transition-colors"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a 
                                href="#" 
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-burgundy hover:bg-burgundy hover:text-white transition-colors"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-mid-gray/20 text-center text-sm text-mid-gray">
                    <p>&copy; 2025 Scentlab. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}