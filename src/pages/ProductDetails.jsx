import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { Star, Heart, ShoppingBag, ChevronRight, Share2, Ruler, ShieldCheck, Truck, RefreshCw, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/product/ProductCard';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const showToast = useToast();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const product = products.find(p => p.id === parseInt(id));
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        if (product) {
            setSelectedSize(product.sizes?.[0] || '');
            setSelectedColor(product.colors?.[0] || '');
            setSelectedImage(0);
            window.scrollTo(0, 0);
        }
    }, [product, id]);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-serif font-bold mb-4">Product Not Found</h2>
                <Link to="/shop" className="btn-primary">Back to Shop</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedSize, selectedColor);
        showToast(`Added ${product.name} to cart!`);
    };

    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <div className="pb-24">
            <div className="container-custom py-10">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-secondary-400 mb-16 px-2">
                    <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
                    <ChevronRight size={10} className="text-secondary-200" />
                    <Link to="/shop" className="hover:text-primary-500 transition-colors">Shop</Link>
                    <ChevronRight size={10} className="text-secondary-200" />
                    <Link to={`/shop?category=${product.category}`} className="hover:text-primary-500 transition-colors">{product.category}</Link>
                    <ChevronRight size={10} className="text-secondary-200" />
                    <span className="text-secondary-900 truncate">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 mb-32">
                    {/* Image Gallery */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="aspect-4/5 rounded-[3rem] overflow-hidden bg-secondary-50 relative group shadow-2xl"
                        >
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            {product.isNew && (
                                <span className="absolute top-8 left-8 bg-white text-secondary-900 text-[9px] font-black uppercase tracking-[0.3em] px-5 py-2.5 rounded-full shadow-2xl z-20">
                                    New Addition
                                </span>
                            )}
                        </motion.div>
                        <div className="grid grid-cols-4 gap-6">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`aspect-square rounded-3xl overflow-hidden border-2 transition-all duration-500 ${selectedImage === idx ? 'border-primary-500 scale-95 shadow-xl shadow-primary-500/10' : 'border-secondary-50 opacity-100 hover:border-secondary-200'}`}
                                >
                                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-10">
                            <div className="flex items-center gap-5 mb-8">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-600 bg-primary-500/10 px-5 py-2 rounded-full">
                                    {product.category}
                                </span>
                                <div className="flex items-center gap-1.5 text-xs font-black text-secondary-900 bg-secondary-50 px-3 py-1.5 rounded-full">
                                    <Star size={14} className="text-primary-500 fill-current" />
                                    <span>{product.rating}</span>
                                    <span className="text-secondary-400 pl-1 border-l border-secondary-200 ml-1">{product.reviews} Reviews</span>
                                </div>
                            </div>

                            <h1 className="text-5xl md:text-6xl font-serif font-bold text-secondary-900 mb-8 leading-[0.95]">{product.name}</h1>

                            <div className="flex items-center gap-6">
                                <span className="text-4xl font-black text-secondary-900 tracking-tight">${product.price}</span>
                                {product.oldPrice && (
                                    <span className="text-2xl text-secondary-300 line-through font-medium tracking-tight">${product.oldPrice}</span>
                                )}
                            </div>
                        </div>

                        <p className="text-secondary-500 leading-relaxed text-lg font-medium mb-12 max-w-xl">
                            {product.description}
                        </p>

                        <div className="space-y-10 pt-10 border-t border-secondary-100 mb-12">
                            {/* Color Selector */}
                            {product.colors && (
                                <div className="space-y-5">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary-400">Select Palette: <span className="text-secondary-900 ml-2">{selectedColor}</span></h4>
                                    <div className="flex gap-4">
                                        {product.colors.map(color => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`w-11 h-11 rounded-full border-2 p-1 transition-all duration-500 relative ${selectedColor === color ? 'border-primary-500 scale-110 shadow-lg shadow-primary-500/20' : 'border-transparent hover:border-secondary-200'}`}
                                            >
                                                <div
                                                    className="w-full h-full rounded-full ring-1 ring-black/5"
                                                    style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Size Selector */}
                            {product.sizes && (
                                <div className="space-y-5">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary-400">Select Size: <span className="text-secondary-900 ml-2">{selectedSize}</span></h4>
                                        <button className="text-[10px] uppercase font-black text-primary-500 flex items-center gap-2 hover:text-secondary-900 transition-all tracking-[0.3em]">
                                            <Ruler size={14} /> Size Guide
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {product.sizes.map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`min-w-16 h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${selectedSize === size ? 'bg-secondary-900 border-secondary-900 text-primary-500 shadow-xl' : 'bg-white border-secondary-100 text-secondary-900 hover:border-primary-500'}`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex flex-wrap gap-5 items-center pt-6">
                                <div className="flex items-center bg-secondary-50 rounded-2xl p-1 h-16">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="h-full w-12 flex items-center justify-center hover:bg-white rounded-xl transition-all"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-10 text-center font-black text-lg">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="h-full w-12 flex items-center justify-center hover:bg-white rounded-xl transition-all"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className="grow btn-primary h-16 text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-secondary-900/10"
                                >
                                    <ShoppingBag size={18} /> Add to Bag
                                </button>

                                <button
                                    onClick={() => toggleWishlist(product)}
                                    className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all ${isInWishlist(product.id) ? 'bg-primary-500 border-primary-500 text-white shadow-xl shadow-primary-500/20' : 'bg-white border-secondary-100 text-secondary-900 hover:border-secondary-900'}`}
                                >
                                    <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                                </button>
                            </div>
                        </div>

                        {/* USP Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-10 bg-secondary-50/50 rounded-[2.5rem] border border-secondary-100">
                            {[
                                { icon: <Truck size={24} />, title: "Concierge Shipping", subtitle: "2-4 Business Days" },
                                { icon: <RefreshCw size={24} />, title: "Curated Returns", subtitle: "30-Day Window" },
                                { icon: <ShieldCheck size={24} />, title: "Secure Checkout", subtitle: "Handled with Care" }
                            ].map((feature, i) => (
                                <div key={i} className="flex flex-col gap-3">
                                    <div className="text-primary-500">{feature.icon}</div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary-900 mb-0.5">{feature.title}</p>
                                        <p className="text-[9px] font-bold text-secondary-400 uppercase tracking-widest">{feature.subtitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Information Tabs */}
                <div className="mb-20">
                    <div className="flex items-center border-b border-secondary-200 overflow-x-auto no-scrollbar">
                        <button
                            onClick={() => setActiveTab('description')}
                            className={`px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] relative transition-all whitespace-nowrap ${activeTab === 'description' ? 'text-primary-500 bg-secondary-900 rounded-t-3xl shadow-xl' : 'text-secondary-500 hover:text-secondary-900'}`}
                        >
                            Description
                        </button>
                        <button
                            onClick={() => setActiveTab('details')}
                            className={`px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] relative transition-all whitespace-nowrap ${activeTab === 'details' ? 'text-primary-500 bg-secondary-900 rounded-t-3xl shadow-xl' : 'text-secondary-500 hover:text-secondary-900'}`}
                        >
                            Product Details
                        </button>
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] relative transition-all whitespace-nowrap ${activeTab === 'reviews' ? 'text-primary-500 bg-secondary-900 rounded-t-3xl shadow-xl' : 'text-secondary-500 hover:text-secondary-900'}`}
                        >
                            Reviews ({product.reviews})
                        </button>
                    </div>

                    <div className="py-10 min-h-75">
                        <AnimatePresence mode="wait">
                            {activeTab === 'description' && (
                                <motion.div
                                    key="desc"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="prose prose-secondary max-w-none"
                                >
                                    <p className="text-secondary-600 leading-relaxed text-lg">
                                        {product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 text-secondary-600">
                                        <div className="space-y-4">
                                            <h5 className="font-bold text-secondary-900 text-lg">Material & Care</h5>
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li>Premium Italian Silk Blend</li>
                                                <li>100% Cotton Lining</li>
                                                <li>Dry clean only</li>
                                                <li>Iron on low heat</li>
                                            </ul>
                                        </div>
                                        <div className="space-y-4">
                                            <h5 className="font-bold text-secondary-900 text-lg">Sustainable Crafting</h5>
                                            <p>Designed with longevity in mind, this piece uses ethically sourced materials and fair labor practices throughout its production cycle.</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'details' && (
                                <motion.div
                                    key="details"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-secondary-600"
                                >
                                    <div className="flex justify-between py-3 border-b border-secondary-100">
                                        <span className="font-medium">Fabric</span>
                                        <span>Silk Blend</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-secondary-100">
                                        <span className="font-medium">Pattern</span>
                                        <span>Solid / Printed</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-secondary-100">
                                        <span className="font-medium">Fit</span>
                                        <span>Regular / Tailored</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-secondary-100">
                                        <span className="font-medium">Neckline</span>
                                        <span>V-Neck / Wrap</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-secondary-100">
                                        <span className="font-medium">SKU</span>
                                        <span>7F-DW-2026-{product.id}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-secondary-100">
                                        <span className="font-medium">Origin</span>
                                        <span>Handcrafted in India</span>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'reviews' && (
                                <motion.div
                                    key="reviews"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="space-y-10"
                                >
                                    <div className="flex flex-col md:flex-row items-center gap-10 bg-secondary-50 p-8 rounded-3xl">
                                        <div className="text-center">
                                            <span className="text-6xl font-serif font-bold text-secondary-900">{product.rating}</span>
                                            <div className="flex items-center justify-center gap-1 text-yellow-400 my-2">
                                                <Star fill="currentColor" />
                                                <Star fill="currentColor" />
                                                <Star fill="currentColor" />
                                                <Star fill="currentColor" />
                                                <Star fill="currentColor" />
                                            </div>
                                            <p className="text-sm text-secondary-500 font-medium">Based on {product.reviews} reviews</p>
                                        </div>
                                        <div className="grow space-y-2 w-full">
                                            {[5, 4, 3, 2, 1].map(star => (
                                                <div key={star} className="flex items-center gap-4 text-sm font-medium">
                                                    <span className="w-4">{star}</span>
                                                    <div className="grow h-2 bg-secondary-200 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-yellow-400"
                                                            style={{ width: star === 5 ? '85%' : star === 4 ? '10%' : '5%' }}
                                                        />
                                                    </div>
                                                    <span className="w-10 text-right">{star === 5 ? '85%' : star === 4 ? '10%' : '5%'}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="pt-20 border-t border-secondary-100">
                        <h2 className="text-3xl font-serif font-bold mb-10">You May Also Like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
