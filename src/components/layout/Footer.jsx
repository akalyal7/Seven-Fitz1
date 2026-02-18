import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Send } from 'lucide-react';
import logo from '../../assets/images/logo1.png';
import { FaWhatsapp } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="bg-black text-white p-15">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-15 mb-5">

                    {/* Brand Section */}
                    <div className="space-y-8">
                        <Link to="/" className="block">
                            <img src={logo} alt="7-FITZ" className="h-10 w-auto object-contain brightness-0 invert transition-transform hover:scale-105" />
                        </Link>
                        <p className="text-secondary-400 text-sm leading-relaxed max-w-xs font-medium">
                            Empowering women through elegant, sustainable, and timeless fashion. Discover your perfect fit with 7-FITZ.
                        </p>
                        <div className="flex space-x-3">
                            <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 hover:text-secondary-900 transition-all duration-500 group">
                                <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 hover:text-secondary-900 transition-all duration-500 group">
                                <FaWhatsapp size={20} className="group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 hover:text-secondary-900 transition-all duration-500 group">
                                <Twitter size={20} className="group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 hover:text-secondary-900 transition-all duration-500 group">
                                <Youtube size={20} className="group-hover:scale-110 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-10 text-primary-500">Shop Selection</h4>
                        <ul className="space-y-3">
                            <li><Link to="/shop?category=Dresses" className="text-secondary-400 hover:text-primary-500 transition-colors text-xs font-bold uppercase tracking-widest">Sarees</Link></li>
                            <li><Link to="/shop?category=Outerwear" className="text-secondary-400 hover:text-primary-500 transition-colors text-xs font-bold uppercase tracking-widest">Half sarees</Link></li>
                            <li><Link to="/shop?category=Bottoms" className="text-secondary-400 hover:text-primary-500 transition-colors text-xs font-bold uppercase tracking-widest">Office wears</Link></li>
                            <li><Link to="/shop?category=Knitwear" className="text-secondary-400 hover:text-primary-500 transition-colors text-xs font-bold uppercase tracking-widest">Kurti</Link></li>
                            <li><Link to="/shop?isNew=true" className="text-secondary-400 hover:text-primary-500 transition-colors text-xs font-bold uppercase tracking-widest">New Arrivals</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-10 text-primary-500">Assistance</h4>
                        <ul className="space-y-3">
                            <li><Link to="/contact" className="text-secondary-400 hover:text-primary-500 transition-colors text-xs font-bold uppercase tracking-widest">Contact Us</Link></li>
                            <li><Link to="/shipping" className="text-secondary-400 hover:text-primary-500 transition-colors text-xs font-bold uppercase tracking-widest">Shipping & Delivery</Link></li>
                            <li><Link to="/returns" className="text-secondary-400 hover:text-primary-500 transition-colors text-xs font-bold uppercase tracking-widest">Returns & Refunds</Link></li>
                            <li><Link to="/faq" className="text-secondary-400 hover:text-primary-500 transition-colors text-xs font-bold uppercase tracking-widest">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-10 text-primary-500">Newsletter</h4>
                        <p className="text-secondary-400 text-xs font-medium mb-8 leading-relaxed">
                            Subscribe for early access to our seasonal drops and curated style guides.
                        </p>
                        <form className="relative group">
                            <input
                                type="email"
                                placeholder="YOUR EMAIL"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-[10px] font-bold tracking-widest focus:ring-1 focus:ring-primary-500 focus:bg-white/10 outline-none transition-all placeholder:text-secondary-600"
                            />
                            <button className="absolute right-2 top-2 p-2 bg-primary-500 rounded-lg text-secondary-900 hover:bg-white transition-all duration-300">
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                </div>
{/* 
                <div className=" flex flex-col md:flex-row justify-between items-center text-[10px] font-bold tracking-[0.2em] uppercase text-secondary-500 space-y-6 md:space-y-0">
                    <p>© {new Date().getFullYear()} 7-FITZ. REDEFINING MODERN LUXURY.</p>
                    <div className="flex space-x-10">
                        <Link to="/privacy" className="hover:text-primary-500 transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-primary-500 transition-colors">Terms of Service</Link>
                    </div>
                </div> */}
            </div>
        </footer>
    );
};

export default Footer;
