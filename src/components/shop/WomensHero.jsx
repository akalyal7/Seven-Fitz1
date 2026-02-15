import React from 'react';
import { motion } from 'framer-motion';

const WomensHero = () => {
    const scrollToShop = () => {
        const element = document.getElementById('shop-collection');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative pt-12 pb-6 overflow-hidden bg-slate-50/50">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-[50vw] bg-[#e5a852]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="container-custom relative z-10">
                <div className="relative h-96 md:h-112.5 flex items-center overflow-hidden rounded-2xl bg-white border border-secondary-100 shadow-xl">
                    {/* Background Image with refined overlay */}
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                            alt="Women's Collection"
                            className="w-full h-full object-cover opacity-20 transition-transform duration-500 ease-out hover:scale-105 will-change-transform"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-white via-white/95 to-white/80"></div>
                    </div>

                    {/* Content */}
                    <div className="relative container-custom z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-xl"
                        >
                            <span className="inline-block px-4 py-2 bg-black text-[#e5a852] text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-6 shadow-lg">
                                Curated Selection
                            </span>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-black mb-6 leading-[0.95]">
                                The Women's <br />
                                <span className="text-[#e5a852] italic">Atelier.</span>
                            </h1>
                            <p className="text-secondary-600 text-base mb-8 max-w-md font-medium leading-relaxed">
                                Explore a collection where luxury meets modern minimalism. Silk dresses, tailored blazers, and artisanal essentials.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={scrollToShop}
                                    className="px-8 py-3 bg-black text-[#e5a852] font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-[#e5a852] hover:text-black transition-all duration-300 shadow-xl"
                                >
                                    Browse Collection
                                </button>
                                <button
                                    onClick={scrollToShop}
                                    className="px-8 py-3 bg-white border-2 border-black text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-black hover:text-[#e5a852] transition-all duration-300"
                                >
                                    View Lookbook
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Refined Decorative Elements */}
                    <div className="absolute top-12 right-12 hidden lg:flex flex-col items-end opacity-60">
                        <span className="text-black text-[10px] font-black uppercase tracking-[0.6em] mb-2">Exclusively</span>
                        <span className="text-[#e5a852] text-2xl font-serif font-bold italic">By 7FITZ</span>
                    </div>

                    <div className="absolute bottom-12 right-12 hidden lg:block">
                        <div className="w-14 h-14 rounded-full border border-secondary-200 flex items-center justify-center animate-bounce cursor-pointer group hover:bg-slate-50 transition-colors" onClick={scrollToShop}>
                            <svg className="w-5 h-5 text-[#e5a852]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WomensHero;
