import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const NewArrivals = () => {
    return (
        <section className="relative h-150 overflow-hidden">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/videos/video_preview.mp4" type="video/mp4" />
                {/* Fallback for browsers that don't support video */}
                Your browser does not support the video tag.
            </video>

            {/* Dark Overlay */}
            {/* <div className="absolute inset-0 bg-black/50" /> */}

            {/* Content */}
            <div className="relative h-full flex items-center justify-center">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Main Heading */}
                        <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
                            New <span className="text-[#e5a852]">Arrivals</span>
                        </h2>

                        {/* Subheading */}
                        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                            Discover the latest trends in fashion. Elevate your wardrobe with our exclusive new collection.
                        </p>

                        {/* CTA Button */}
                        <Link to="/shop">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 bg-[#e5a852] text-black px-6 py-3 hover:text-white hover:bg-black rounded-full font-semibold text-lg shadow-xl transition-all duration-300"
                            >
                                Shop New Arrivals
                                <ArrowRight size={20} />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white/40 to-transparent" />
        </section>
    );
};

export default NewArrivals;
