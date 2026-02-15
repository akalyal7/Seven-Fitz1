import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { products } from '../../data/products';
import ProductCard from '../product/ProductCard';

const FeaturedProducts = () => {
    const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

    return (
        <section className="py-10 bg-slate-50 overflow-hidden relative">
            <div className="p-10 rounded-lg relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-[#e5a852] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
                        The Selection
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-black">
                        Our <span className="text-[#e5a852]">Collections</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        to="/shop"
                        className="text-black font-bold flex items-center justify-center gap-3 hover:text-[#e5a852] transition-colors uppercase tracking-widest text-sm"
                    >
                        Browse the Full Catalog
                        <Plus size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
