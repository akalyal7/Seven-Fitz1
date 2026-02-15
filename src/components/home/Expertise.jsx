import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Expertise = () => {
    return (
        <section className="py-10 bg-white relative">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-black">
                            Our Expertise in <span className="text-[#e5a852]">Couture</span>
                        </h2>

                        <p className="text-secondary-600 mb-8 leading-relaxed">
                            We take pride in our technical mastery. From selecting the finest silks to perfecting intricate hand-embroidery, our process ensures unparalleled quality.
                        </p>

                        <div className="space-y-6">
                            {[
                                { label: "Fabric Selection", progress: 98 },
                                { label: "Intricate Detailing", progress: 95 },
                                { label: "Pattern Perfecting", progress: 90 },
                            ].map((skill, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex justify-between text-sm font-serif">
                                        <span className="text-black italic font-bold">{skill.label}</span>
                                        <span className="text-[#e5a852] font-bold">{skill.progress}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.progress}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-linear-to-r from-black to-[#e5a852] rounded-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <motion.div whileHover={{ scale: 1.05 }} className="mt-8 inline-block">
                            <Link to="/about" className="bg-black text-[#e5a852] px-8 py-3 rounded-full font-bold shadow-lg shadow-black/10">
                                Our Process
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-lg border border-secondary-100 bg-slate-50 p-2 shadow-lg">
                            <img
                                src="https://images.unsplash.com/photo-1539109132314-34a9c6883391?q=80&w=2070&auto=format&fit=crop"
                                alt="Pattern Making"
                                className="w-full h-full object-cover rounded-lg transition-transform duration-500 ease-out hover:scale-105 will-change-transform"
                            />
                        </div>

                        {/* Decorative dots for image */}
                        <div className="absolute -bottom-6 -right-6 flex flex-col gap-3">
                            <div className="w-5 h-5 rounded-full bg-[#e5a852]" />
                            <div className="w-5 h-5 rounded-full bg-[#e5a852]/50" />
                            <div className="w-5 h-5 rounded-full bg-[#e5a852]/10" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Expertise;
