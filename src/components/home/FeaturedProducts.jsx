import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { products } from '../../data/products';
import ProductCard from '../product/ProductCard';

const FeaturedProducts = () => {
    const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);

    return (
        <section className="py-10 bg-slate-50 overflow-hidden relative">
            <div className="p-12 rounded-lg relative z-10">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-7 ">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
               
            </div>
        </section>
    );
};

export default FeaturedProducts;
