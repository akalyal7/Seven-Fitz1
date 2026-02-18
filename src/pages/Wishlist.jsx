import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Wishlist = () => {
    const { wishlistItems, removeFromWishlist } = useWishlist();
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
                    Explore Collection <ArrowRight size={18} />
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 md:px-30 py-15">
            <div className="flex items-center justify-between mb-12">

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900">My <span className="text-[#e5a852]">Wishlist</span></h1>
                <span className="bg-secondary-900 px-6 py-2 rounded-full text-[10px] font-black text-primary-500 uppercase tracking-widest shadow-lg">{wishlistItems.length} Saved Items</span>
                
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
                            className="group relative bg-white rounded-lg h-160 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-secondary-50"
                        >
                            <div className="relative aspect-3/4 overflow-hidden bg-secondary-100">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <button
                                    onClick={() => {
                                        removeFromWishlist(product.id);
                                        showToast('Removed from wishlist');
                                    }}
                                    className="absolute top-4 right-4 p-2 bg-white/80 text-secondary-900 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors shadow-lg"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="p-4">
                                <div className="text-[10px] font-black text-primary-500 uppercase tracking-[0.2em] mb-2">{product.category}</div>
                                <h3 className="text-lg font-serif font-bold text-secondary-900 mb-2 truncate group-hover:text-primary-500 transition-colors">
                                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                                </h3>

                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-lg font-bold">${product.price}</span>
                                    <div className="flex items-center gap-1 text-xs text-secondary-500">
                                        <Star size={12} className="text-yellow-400 fill-current" />
                                        {product.rating}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <button
                                        onClick={() => handleMoveToCart(product)}
                                        className="w-full btn-gold py-3 text-[10px] uppercase tracking-widest shadow-xl shadow-primary-500/10 flex items-center justify-center gap-2"
                                    >
                                        <ShoppingBag size={14} /> Move to Cart
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Wishlist;
