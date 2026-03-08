import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

const Wishlist = () => {
    const { wishlistItems, removeFromWishlist, toggleWishlist, isInWishlist } = useWishlist();
    const { addToCart } = useCart();
    const showToast = useToast();

    const handleMoveToCart = (product) => {
        addToCart(product, 1, product.sizes?.[0], product.colors?.[0]);
        removeFromWishlist(product.id);
        showToast(`Moved ${product.name} to cart!`);
    };

    if (wishlistItems.length === 0) {
        return (
            <div className="container mx-auto px-2 py-50 text-center">
                <div className="w-24 h-24 bg-black text-[#e5a852] rounded-lg flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <Heart size={40} />
                </div>
                <h1 className="text-3xl font-serif font-bold mb-4">Your wishlist is empty</h1>
                <p className="text-secondary-500 mb-8 max-w-md mx-auto">Save your favorite items here and they will be waiting for you when you're ready to make them yours.</p>
                <Link to="/shop" className="btn-gold inline-flex items-center gap-3 h-13 px-6 uppercase tracking-widest text-sm">
                    Explore Collection
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 md:px-30 py-15">
            <div className="flex items-center justify-between mb-12">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900">
                    My <span className="text-[#e5a852]">Wishlist</span>
                </h1>
                <span className="bg-secondary-900 px-6 py-2 rounded-full text-[10px] font-black text-primary-500 uppercase tracking-widest shadow-lg">
                    {wishlistItems.length} Saved Items
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <AnimatePresence>
                    {wishlistItems.map((product) => (
                        <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="group flex flex-col gap-5 font-sans border-0 rounded-lg p-2 py-5 shadow-md hover:shadow-lg bg-white"
                        >
                            <Link to={`/product/${product.id}`} className="relative block aspect-4/5 overflow-hidden rounded-lg bg-gray-100">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                {/* Action buttons */}
                                <div className="absolute bottom-3 left-3 right-3 flex gap-2 translate-y-0 opacity-100 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-300 ease-out z-20">
                                    <button
                                        onClick={(e) => { e.preventDefault(); handleMoveToCart(product); }}
                                        className="flex-1 bg-black backdrop-blur-md text-[#e5a852] py-2.5 lg:py-3 text-[10px] sm:text-xs font-semibold uppercase tracking-widest hover:bg-[#e5a852] hover:text-black transition-colors duration-300 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm"
                                    >
                                        <ShoppingBag size={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        Move to Cart
                                    </button>
                                    <button
                                        onClick={(e) => { e.preventDefault(); toggleWishlist(product); showToast(isInWishlist(product.id) ? 'Removed from wishlist' : 'Added to wishlist'); }}
                                        className="bg-white/95 backdrop-blur-md text-secondary-900 p-2.5 lg:p-3 hover:bg-secondary-900 hover:text-white transition-colors duration-300 rounded-lg shadow-sm flex items-center justify-center group/btn"
                                    >
                                        <Heart
                                            size={16}
                                            fill={isInWishlist(product.id) ? "currentColor" : "none"}
                                            className={`transition-colors ${isInWishlist(product.id) ? "text-[#e5a852]" : "text-secondary-900 group-hover/btn:text-white"}`}
                                        />
                                    </button>
                                    <button
                                        onClick={(e) => { e.preventDefault(); removeFromWishlist(product.id); showToast('Removed from wishlist'); }}
                                        className="bg-red-50 text-red-600 p-2.5 lg:p-3 rounded-lg shadow-sm flex items-center justify-center hover:bg-red-100 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </Link>

                            {/* Product Info */}
                            <div className="flex flex-col gap-1.5 px-1">
                                <div className="flex justify-between items-start gap-2">
                                    <Link to={`/product/${product.id}`} className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors truncate">
                                            {product.name}
                                        </h3>
                                    </Link>
                                    <div className="flex flex-col items-end shrink-0">
                                        <span className="text-lg font-semibold text-secondary-900">₹{product.price}</span>
                                        <div className="flex items-center gap-1 text-xs text-secondary-500">
                                            <Star size={12} className="text-yellow-400 fill-current" />
                                            {product.rating}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-secondary-500 capitalize tracking-wide">{product.category}</span>
                                    {product.oldPrice && (
                                        <span className="text-xs text-secondary-400 line-through">₹{product.oldPrice}</span>
                                    )}
                                </div>
                                {/* Colors */}
                                {product.colors && product.colors.length > 0 && (
                                    <div className="flex gap-1.5 mt-1.5">
                                        {product.colors.slice(0, 4).map((color, i) => (
                                            <div
                                                key={i}
                                                className="w-3.5 h-3.5 rounded-full border border-gray-200 shadow-xs"
                                                style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}
                                                title={color}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Wishlist;