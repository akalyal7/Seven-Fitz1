import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

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
        <div
            className="group flex flex-col gap-5 font-sans border-0 rounded-lg p-2 py-5 shadow-md hover:shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={`/product/${product.id}`} className="relative block aspect-4/5 overflow-hidden rounded-lg bg-gray-100">
                {/* Image */}
                <img
                    src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Minimalist Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
                    {product.isNew && (
                        <span className="text-[10px] font-medium bg-white/90 backdrop-blur-sm text-secondary-900 px-2.5 py-1 uppercase tracking-widest rounded-sm">
                            New
                        </span>
                    )}
                    {product.discount && (
                        <span className="text-[10px] font-medium bg-red-500/90 backdrop-blur-sm text-white px-2.5 py-1 uppercase tracking-widest rounded-sm">
                            -{product.discount}%
                        </span>
                    )}
                </div>

                {/* Actions */}
                <div className="absolute bottom-3 left-3 right-3 flex gap-2 translate-y-0 opacity-100 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-300 ease-out z-20">
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-black backdrop-blur-md text-[#e5a852] py-2.5 lg:py-3 text-[10px] sm:text-xs font-semibold uppercase tracking-widest hover:bg-[#e5a852] hover:text-black transition-colors duration-300 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm"
                    >
                        <ShoppingBag size={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Add to Bag
                    </button>
                    <button
                        onClick={handleWishlist}
                        className="bg-white/95 backdrop-blur-md text-secondary-900 p-2.5 lg:p-3 hover:bg-secondary-900 hover:text-white transition-colors duration-300 rounded-lg shadow-sm flex items-center justify-center group/btn"
                    >
                        <Heart
                            size={16}
                            fill={isInWishlist(product.id) ? "currentColor" : "none"}
                            className={`transition-colors ${isInWishlist(product.id) ? "text-[#e5a852]" : "text-secondary-900 group-hover/btn:text-white"}`}
                        />
                    </button>
                </div>
            </Link>

            {/* Product Meta */}
            <div className="flex flex-col gap-1.5 px-1">
                <div className="flex justify-between items-start gap-2">
                    <Link to={`/product/${product.id}`} className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors truncate">
                            {product.name}
                        </h3>
                    </Link>
                    <div className="flex flex-col items-end shrink-0">
                        <span className="text-lg font-semibold text-secondary-900">
                            ₹{product.price}
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-sm text-secondary-500 capitalize tracking-wide">
                        {product.category}
                    </span>
                    {product.oldPrice && (
                        <span className="text-xs text-secondary-400 line-through">
                            ₹{product.oldPrice}
                        </span>
                    )}
                </div>

                {/* Colors Indicator */}
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
        </div>
    );
};

export default ProductCard;
