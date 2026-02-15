import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CategoryCard = ({ category }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="relative overflow-hidden rounded-[2.5rem] h-full w-full group cursor-pointer shadow-xl"
        >
            <Link to={`/shop?category=${category.name}`} className="block h-full">
                <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-secondary-900/90 via-secondary-900/20 to-transparent flex flex-col justify-end p-10">
                    <span className="text-[10px] text-white/60 font-bold uppercase tracking-[0.3em] mb-3 block translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        Explore
                    </span>
                    <h3 className="text-3xl font-serif font-bold text-white mb-6 transform group-hover:-translate-y-2 transition-transform duration-500">{category.name}</h3>
                    <div className="w-12 h-1 bg-primary-500 rounded-full group-hover:w-full transition-all duration-700 ease-in-out"></div>

                    <div className="mt-6 flex items-center text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-2 group-hover:translate-y-0">
                        Shop Collection
                        <ArrowRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform h-4 w-4" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default CategoryCard;
