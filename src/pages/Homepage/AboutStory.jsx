import React from 'react';
import { motion } from 'framer-motion';

const AboutStory = () => {
    return (
        <section className="py-10 relative overflow-hidden bg-white">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Left Image - Standard Square */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="aspect-square overflow-hidden rounded-lg border border-secondary-100 bg-slate-50 p-2 shadow-lg">
                            <img
                                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                                alt="Artisanal Dressmaking"
                                className="w-full h-full object-cover rounded-lg transition-transform duration-500 ease-out hover:scale-105 will-change-transform"
                            />
                        </div>

                        {/* Small floating dots UI element */}
                        <div className="absolute top-1/2 -left-6 flex flex-col gap-3">
                            <div className="w-3 h-3 rounded-full bg-white/10" />
                            <div className="w-3 h-3 rounded-full bg-[#e5a852]/30" />
                            <div className="w-3 h-3 rounded-full bg-[#e5a852]" />
                        </div>
                    </motion.div>

                    {/* Right Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2"
                    >
                        <h2 className="text-light text-6xl font-serif mb-8 text-[#e5a852]/10 absolute -top-10 left-0 pointer-events-none whitespace-nowrap overflow-hidden">
                            Couture Art
                        </h2>

                        <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6 leading-tight text-black">
                            Crafting the Perfect <span className="text-[#e5a852]">Silhouette</span>
                        </h3>

                        <p className="text-secondary-600 mb-8 leading-relaxed max-w-xl">
                            At 7-FITZ, we believe every dress should tell a story. Our designers combine traditional craftsmanship with modern trends to create ethereal attire that celebrates womanhood in all its glory.
                        </p>

                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: "Dress Designs", value: "250+" },
                                { label: "Happy Clients", value: "5k+" },
                                { label: "Boutiques", value: "12" },
                            ].map((stat, i) => (
                                <div key={i} className="bg-slate-50 border border-secondary-100 p-4 rounded-2xl text-center hover:border-[#e5a852]/50 transition-colors">
                                    <div className="text-2xl font-serif font-bold text-[#e5a852] mb-1">{stat.value}</div>
                                    <div className="text-[9px] uppercase tracking-widest text-secondary-400 font-bold">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutStory;
