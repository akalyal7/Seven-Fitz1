import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Send } from 'lucide-react';
import logo from '../../assets/images/logo1.png';
import { FaWhatsapp } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="bg-black text-white p-6 sm:p-10 md:p-15 border-t border-gray-900 pb-24 md:pb-15">
            <div className="container-custom">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-15 mb-8 md:mb-5">

                    {/* Brand Section */}
                    <div className="space-y-6 md:space-y-8">
                        <Link to="/" className="block">
                            <img src={logo} alt="7-FITZ" className="h-8 md:h-10 w-auto object-contain transition-transform hover:scale-105" />
                        </Link>
                        <p className="text-secondary-400 text-[11px] sm:text-xs md:text-sm leading-relaxed max-w-xs font-medium">
                            Designed for beauty, comfort, and confidence.
                            Because every woman deserves to feel amazing.
                        </p>
                        <div className="flex space-x-3 pt-2">
                            <a href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#ffbf67] hover:border-[#ffbf67] hover:text-secondary-900 transition-all duration-500 group">
                                <Instagram size={18} className="md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#ffbf67] hover:border-[#ffbf67] hover:text-secondary-900 transition-all duration-500 group">
                                <FaWhatsapp size={18} className="md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                            </a>
                            {/* <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#ffbf67] hover:border-[#ffbf67] hover:text-secondary-900 transition-all duration-500 group">
                                <Twitter size={20} className="group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#ffbf67] hover:border-[#ffbf67] hover:text-secondary-900 transition-all duration-500 group">
                                <Youtube size={20} className="group-hover:scale-110 transition-transform" />
                            </a> */}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-[11px] md:text-sm font-bold uppercase tracking-[0.2em] mb-4 md:mb-8 text-[#ffbf67]">Customer Delight</h4>
                        <ul className="space-y-2 md:space-y-3">
                            <li><Link to="/" className="text-secondary-400 hover:text-[#ffbf67] transition-colors text-[10px] sm:text-[11px] md:text-xs font-bold uppercase tracking-widest block py-1 md:py-0">Shipping Policy</Link></li>
                            <li><Link to="/Termsandconditions" className="text-secondary-400 hover:text-[#ffbf67] transition-colors text-[10px] sm:text-[11px] md:text-xs font-bold uppercase tracking-widest block py-1 md:py-0">Terms & Conditions</Link></li>
                            <li><Link to="/" className="text-secondary-400 hover:text-[#ffbf67] transition-colors text-[10px] sm:text-[11px] md:text-xs font-bold uppercase tracking-widest block py-1 md:py-0">Cancellation & Refund</Link></li>
                            <li><Link to="/" className="text-secondary-400 hover:text-[#ffbf67] transition-colors text-[10px] sm:text-[11px] md:text-xs font-bold uppercase tracking-widest block py-1 md:py-0">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-[11px] md:text-sm font-bold uppercase tracking-[0.2em] mb-4 md:mb-8 text-[#ffbf67]">Get to Know Us</h4>
                        <ul className="space-y-2 md:space-y-3">
                            <li><Link to="/" className="text-secondary-400 hover:text-[#ffbf67] transition-colors text-[10px] sm:text-[11px] md:text-xs font-bold uppercase tracking-widest block py-1 md:py-0">Our Brand Story</Link></li>
                            <li><Link to="/shop" className="text-secondary-400 hover:text-[#ffbf67] transition-colors text-[10px] sm:text-[11px] md:text-xs font-bold uppercase tracking-widest block py-1 md:py-0">Our Collections</Link></li>
                            <li><Link to="/" className="text-secondary-400 hover:text-[#ffbf67] transition-colors text-[10px] sm:text-[11px] md:text-xs font-bold uppercase tracking-widest block py-1 md:py-0">Customer Reviews</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="sm:col-span-2 lg:col-span-1 mt-4 sm:mt-0">
                        <h4 className="text-[11px] md:text-sm font-bold uppercase tracking-[0.2em] mb-4 md:mb-8 text-[#ffbf67]">Newsletter</h4>
                        <p className="text-secondary-400 text-[10px] md:text-xs font-medium mb-4 md:mb-8 leading-relaxed">
                            Subscribe for early access to our seasonal drops and curated style guides.
                        </p>
                        <form className="relative group max-w-sm md:max-w-none">
                            <input
                                type="email"
                                placeholder="YOUR EMAIL"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 md:py-4 px-4 md:px-6 text-[9px] md:text-[10px] font-bold tracking-widest focus:ring-1 focus:ring-[#ffbf67] focus:bg-white/10 outline-none transition-all placeholder:text-secondary-600"
                            />
                            <button className="absolute right-1.5 md:right-2 top-1.5 md:top-2 p-1.5 md:p-2 bg-[#ffbf67] rounded-lg text-secondary-900 hover:bg-white transition-all duration-300">
                                <Send size={14} className="md:w-4 md:h-4" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Copyright Mobile Only space since Footer is blocked by mobile bottom nav */}
                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                    <p className="text-[9px] md:text-[10px] text-secondary-600 font-bold tracking-widest uppercase">
                        &copy; {new Date().getFullYear()} 7-FITZ. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
