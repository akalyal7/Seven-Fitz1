import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const SocialGallery = () => {
    return (
        <section className="py-10 border-t border-secondary-100 relative overflow-hidden bg-slate-50/50">
            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 uppercase tracking-tight text-black">
                        Seen in <span className="text-[#e5a852]">#7FITZ</span>
                    </h2>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-black hover:text-[#e5a852] transition-colors font-bold tracking-widest text-[10px] uppercase group inline-flex items-center gap-2"
                    >
                        Follow our fashion journey <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {[
                        "https://images.unsplash.com/photo-1649139414876-ef584aa60f2e?w=600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1728485301543-317955b2237a?w=600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
                        "https://images.unsplash.com/photo-1743080331389-3517430d2cc8?w=600&auto=format&fit=crop"
                    ].map((src, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="aspect-square relative group overflow-hidden rounded-lg cursor-crosshair shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            <img
                                src={src}
                                alt="Women's Style"
                                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 will-change-transform"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                                <div className="bg-[#e5a852] p-4 rounded-full shadow-lg">
                                    <ShoppingBag className="text-black" size={24} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialGallery;
