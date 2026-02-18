import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Target, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="bg-linear-to-b from-white via-slate-50/30 to-white text-secondary-900 pb-20 selection:bg-[#e5a852] selection:text-black relative">

            {/* Our Story - Neat Geometric */}
            <section className="py-20 overflow-hidden">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <span className="text-[#e5a852] font-black uppercase tracking-[0.4em] text-[10px]">The Beginning</span>
                                <div className="w-12 h-px bg-secondary-200" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-[0.95] text-black">Crafting Confidence Since 2022</h2>
                            <p className="text-secondary-600 leading-relaxed text-lg">
                                7-FITZ began with a simple mission: to create fashion that makes women feel powerful, comfortable, and conscious. We believe that what you wear is an extension of who you are, and that style should never come at the cost of our planet.
                            </p>
                            <p className="text-secondary-500 leading-relaxed text-lg italic border-l-2 border-[#e5a852] pl-6">
                                "We're not just selling clothes; we're building a community of empowered women who value both aesthetics and ethics."
                            </p>
                        </div>
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="aspect-square overflow-hidden rounded-lg border border-secondary-100 p-2 bg-slate-50 shadow-xl"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80"
                                    alt="Design Process"
                                    className="w-full h-full object-cover rounded-lg transition-transform duration-[2s] hover:scale-105"
                                />
                            </motion.div>
                            <div className="absolute -bottom-10 -left-10 bg-black p-10 rounded-lg shadow-2xl hidden sm:block">
                                <div className="flex items-center gap-6">
                                    <span className="text-5xl font-serif font-bold text-[#e5a852]">10k+</span>
                                    <p className="text-[9px] font-black text-secondary-400 uppercase tracking-[0.3em] leading-relaxed">Global<br />Satisfied<br />Clientele</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values - Luxury Material Style */}
            <section className="py-12 bg-slate-50 relative">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-serif font-bold mb-4 text-black">Our Core Values</h2>
                        <div className="w-20 h-1 bg-[#e5a852] mx-auto rounded-full mb-6"></div>
                        <p className="text-secondary-500 font-medium">The pillars that uphold every creative decision at 7-FITZ.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: <Heart size={30} />, title: "Ethical Sourcing", desc: "We partner exclusively with certified factories that provide fair wages and safe working conditions." },
                            { icon: <Target size={30} />, title: "Timeless Design", desc: "We create pieces that transcend seasonal trends, focusing on longevity and versatile wearability." },
                            { icon: <Award size={30} />, title: "Premium Quality", desc: "Our fabrics are selected for their durability and feel, ensuring your 7-FITZ items last for years." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center p-8 bg-white border border-secondary-100 rounded-lg hover:border-[#e5a852]/50 transition-all shadow-sm hover:shadow-xl group"
                            >
                                <div className="w-20 h-20 bg-slate-50 text-[#e5a852] rounded-lg flex items-center justify-center mx-auto mb-10 transition-all duration-500 group-hover:bg-black group-hover:text-[#e5a852]">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-serif font-bold mb-4 text-black">{item.title}</h3>
                                <p className="text-secondary-500 leading-relaxed font-medium text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team/Join */}
            <section className="py-16 text-center">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight italic text-black">Join the Movement</h2>
                        <p className="text-secondary-600 mb-12 text-lg font-medium leading-relaxed">
                            We're always looking for passionate individuals to join our mission of conscious luxury.
                        </p>
                        <Link to="/shop" className="bg-black text-[#e5a852] inline-flex items-center gap-4 px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:bg-[#e5a852] hover:text-black transition-all duration-300">
                            Explore Collections <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
