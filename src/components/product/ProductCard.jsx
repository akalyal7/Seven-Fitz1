import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [isHovered, setIsHovered] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product, 1, product.sizes?.[0], product.colors?.[0]);
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        toggleWishlist(product);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative bg-white rounded-lg overflow-hidden transition-all duration-700 hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.1)] border border-transparent hover:border-secondary-50"
        >
            <Link to={`/product/${product.id}`} className="block">
                <div className="relative aspect-4/5 overflow-hidden bg-secondary-50">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={isHovered && product.images[1] ? 'alt' : 'main'}
                            src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
                            alt={product.name}
                            initial={{ opacity: 0.8, scale: 1 }}
                            animate={{ opacity: 1, scale: isHovered ? 1.05 : 1 }}
                            exit={{ opacity: 0.8 }}
                            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                            className="w-full h-full object-cover"
                        />
                    </AnimatePresence>

                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
                        {product.isNew && (
                            <span className="bg-white text-secondary-900 text-[8px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full shadow-xl">
                                New Drop
                            </span>
                        )}
                        {product.discount && (
                            <span className="bg-primary-500 text-secondary-900 text-[8px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full shadow-xl">
                                -{product.discount}%
                            </span>
                        )}
                    </div>

                    {/* Action Bar */}
                    <div className="absolute bottom-8 left-0 right-0 px-6 flex items-center justify-center gap-3 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-30">
                        <button
                            onClick={handleWishlist}
                            className={`p-4 rounded-2xl shadow-2xl backdrop-blur-xl transition-all duration-300 ${isInWishlist(product.id) ? 'bg-primary-500 text-white shadow-primary-500/20' : 'bg-white/95 text-secondary-900 hover:bg-secondary-900 hover:text-primary-500'}`}
                        >
                            <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                        </button>
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 h-14 bg-secondary-900 text-primary-500 rounded-2xl shadow-2xl backdrop-blur-xl hover:bg-black hover:scale-[1.02] active:scale-95 transition-all duration-500 text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                        >
                            <ShoppingBag size={18} />
                            Add to Bag
                        </button>
                    </div>
                </div>

                <div className="p-8 pb-10">
                    <div className="mb-3">
                        <span className="text-[9px] text-secondary-400 font-black uppercase tracking-[0.4em]">
                            {product.category}
                        </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-serif font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors duration-500 truncate">
                        {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-4">
                        {[1,2,3,4,5].map(i => (
                            <Star key={i} size={14} className={` ${i <= Math.round(product.rating) ? 'text-primary-500 fill-current' : 'text-secondary-300'} `} />
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-secondary-900">
                            ${product.price}
                        </span>
                        {product.oldPrice && (
                            <span className="text-sm text-secondary-300 line-through font-medium">
                                ${product.oldPrice}
                            </span>
                        )}
                    </div>

                    {/* Color Swatches */}
                    <div className="flex gap-2.5 mt-8 items-center">
                        <div className="flex -space-x-1.5 overflow-hidden">
                            {product.colors?.slice(0, 3).map((color, i) => (
                                <div
                                    key={i}
                                    className="w-5 h-5 rounded-full border-2 border-white shadow-sm ring-1 ring-secondary-50"
                                    style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}
                                    title={color}
                                />
                            ))}
                        </div>
                        {product.colors?.length > 3 && (
                            <span className="text-[10px] font-black text-secondary-400 uppercase tracking-widest pl-1">
                                +{product.colors.length - 3}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
