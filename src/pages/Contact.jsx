import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Contact = () => {
    const showToast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            showToast("Message sent! We'll get back to you soon.");
            e.target.reset();
        }, 1500);
    };

    return (
        <div className="pb-24">
            <div className="container-custom py-10">
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
                            Connect with <span className="text-primary-500">7FITZ</span>
                        </h1>
                        <p className="text-secondary-500 text-lg md:text-xl font-medium leading-relaxed">
                            Our concierge team is dedicated to providing you with an exceptional experience. Reach out for styling advice, order inquiries, or brand collaborations.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Contact info */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                            {[
                                { icon: <Mail size={24} />, title: "Inquiries", detail: "concierge@7fitz.com", subtitle: "24/7 Digital Support" },
                                { icon: <Phone size={24} />, title: "Contact", detail: "+1 (888) 7FITZ-HQ", subtitle: "Mon-Fri, 9am - 6pm EST" },
                                { icon: <MapPin size={24} />, title: "Atelier", detail: "77 Luxury Ave, New York, NY", subtitle: "By Appointment Only" },
                                { icon: <Clock size={24} />, title: "Presence", detail: "Global Headquarters", subtitle: "Serving 50+ Countries" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-6 p-6 rounded-4xl bg-secondary-50 border border-transparent hover:border-secondary-100 transition-all group"
                                >
                                    <div className="w-14 h-14 bg-secondary-900 text-primary-500 rounded-2xl flex items-center justify-center shrink-0 shadow-xl group-hover:scale-110 transition-transform duration-500">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary-400 mb-1">{item.title}</p>
                                        <h4 className="font-bold text-secondary-900 mb-0.5">{item.detail}</h4>
                                        <p className="text-[10px] font-bold text-secondary-400 uppercase tracking-widest">{item.subtitle}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="bg-secondary-900 text-white p-10 rounded-[3rem] relative overflow-hidden shadow-2xl group">
                            <MessageSquare className="absolute -right-12 -bottom-12 w-64 h-64 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
                            <div className="relative z-10">
                                <h3 className="text-3xl font-serif font-bold mb-6">Priority Support</h3>
                                <p className="text-secondary-400 text-sm mb-8 leading-relaxed max-w-xs">
                                    Experience real-time assistance with our premium chat service. Available for members and order updates.
                                </p>
                                <button className="btn-gold w-full py-5 text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-primary-500/10">
                                    Initialize Direct Chat
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Contact form */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 md:p-16 rounded-[4rem] border border-secondary-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)]"
                        >
                            <h3 className="text-4xl font-serif font-bold mb-12">Submit an Inquiry</h3>
                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary-400 ml-2">Your Name</label>
                                        <input type="text" required className="input-field rounded-2xl bg-secondary-50/50 focus:bg-white" placeholder="Aristotle Onassis" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary-400 ml-2">Digital Address</label>
                                        <input type="email" required className="input-field rounded-2xl bg-secondary-50/50 focus:bg-white" placeholder="concierge@example.com" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary-400 ml-2">Inquiry Type</label>
                                    <div className="relative">
                                        <select className="input-field rounded-2xl bg-secondary-50/50 focus:bg-white appearance-none cursor-pointer">
                                            <option>Bespoke Styling Advice</option>
                                            <option>Order Management</option>
                                            <option>Press & Collaborations</option>
                                            <option>Global Logistics</option>
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
                                            <Clock size={16} />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary-400 ml-2">Correspondence</label>
                                    <textarea required rows="6" className="input-field rounded-3xl bg-secondary-50/50 focus:bg-white resize-none" placeholder="How may we serve you today?"></textarea>
                                </div>
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="w-full btn-primary h-18 text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-secondary-900/10 active:scale-[0.98] transition-all"
                                >
                                    {isSubmitting ? (
                                        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <span className="flex items-center justify-center gap-4">
                                            <Send size={20} /> Transmit Inquiry
                                        </span>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
