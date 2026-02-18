import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { Star, Heart, ShoppingBag, ChevronRight, Ruler, ShieldCheck, Truck, RefreshCw, Minus, Plus } from 'lucide-react';
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
            <div className="container mx-auto px-4 py-10 text-center">
                <h2 className="text-2xl font-serif font-bold mb-4">Product Not Found</h2>
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
        <div className="pb-10 mt-10">
            <div className="container-custom py-6">

                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-secondary-400 mb-6 px-2">
                    <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
                    <ChevronRight size={10} className="text-secondary-200" />
                    <Link to="/shop" className="hover:text-primary-500 transition-colors">Shop</Link>
                    <ChevronRight size={10} className="text-secondary-200" />
                    <Link to={`/shop?category=${product.category}`} className="hover:text-primary-500 transition-colors">{product.category}</Link>
                    <ChevronRight size={10} className="text-secondary-200" />
                    <span className="text-secondary-900 truncate">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

                    {/* Image Gallery */}
                    <div className="space-y-3">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="aspect-4/5 rounded-lg h-150 overflow-hidden bg-secondary-50 relative group"
                        >
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className="h-200 object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {product.isNew && (
                                <span className="absolute top-4 left-4 bg-white text-secondary-900 text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full shadow-md z-20">
                                    New
                                </span>
                            )}
                        </motion.div>
                        <div className="grid grid-cols-4 gap-3">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${selectedImage === idx ? 'border-primary-500 scale-95 shadow-md' : 'border-secondary-50 hover:border-secondary-200'}`}
                                >
                                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-600 bg-primary-500/10 px-3 py-1.5 rounded-full">
                                    {product.category}
                                </span>
                                <div className="flex items-center gap-1 text-xs font-black text-secondary-900 bg-secondary-50 px-2 py-1 rounded-full">
                                    <Star size={14} className="text-primary-500 fill-current" />
                                    <span>{product.rating}</span>
                                    <span className="text-secondary-400 pl-1 border-l border-secondary-200 ml-1">{product.reviews} Reviews</span>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary-900 mb-4 leading-[1.05]">{product.name}</h1>

                            <div className="flex items-center gap-4">
                                <span className="text-3xl font-black text-secondary-900 tracking-tight">${product.price}</span>
                                {product.oldPrice && (
                                    <span className="text-xl text-secondary-300 line-through font-medium tracking-tight">${product.oldPrice}</span>
                                )}
                            </div>
                        </div>

                        <p className="text-secondary-500 leading-relaxed text-base font-medium mb-6 max-w-xl">
                            {product.description}
                        </p>

                        {/* Color & Size Selectors */}
                        <div className="space-y-6">

                            {product.colors && (
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary-400 mb-1">Color: <span className="text-secondary-900">{selectedColor}</span></h4>
                                    <div className="flex gap-3">
                                        {product.colors.map(color => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color ? 'border-primary-500 scale-110 shadow' : 'border-transparent hover:border-secondary-200'}`}
                                            >
                                                <div className="w-full h-full rounded-full" style={{ backgroundColor: color.toLowerCase().replace(' ', '') }} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {product.sizes && (
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary-400 mb-1">Size: <span className="text-secondary-900">{selectedSize}</span></h4>
                                    <div className="flex flex-wrap gap-2">
                                        {product.sizes.map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${selectedSize === size ? 'bg-secondary-900 border-secondary-900 text-primary-500 shadow' : 'bg-white border-secondary-100 text-secondary-900 hover:border-primary-500'}`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex flex-wrap gap-3 items-center">
                                <div className="flex items-center bg-secondary-50 rounded-2xl p-1 h-14">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="h-full w-10 flex items-center justify-center hover:bg-white rounded-xl transition"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-10 text-center font-black">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="h-full w-10 flex items-center justify-center hover:bg-white rounded-xl transition"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className="grow btn-primary h-14 text-[10px] font-black uppercase tracking-[0.3em] shadow"
                                >
                                    <ShoppingBag size={16} /> Add to Bag
                                </button>

                                <button
                                    onClick={() => toggleWishlist(product)}
                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${isInWishlist(product.id) ? 'bg-[#e5a852] border-[#e5a852] text-white shadow' : 'bg-white border-secondary-100 text-secondary-900 hover:border-secondary-900'}`}
                                >
                                    <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                                </button>
                            </div>
                        </div>

                        {/* USP Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-secondary-50/50 rounded-2xl border border-secondary-100 mt-6">
                            {[{ icon: <Truck size={20} />, title: "Shipping", subtitle: "2-4 Days" },
                              { icon: <RefreshCw size={20} />, title: "Returns", subtitle: "30-Day" },
                              { icon: <ShieldCheck size={20} />, title: "Secure", subtitle: "Safe Checkout" }].map((feature, i) => (
                                <div key={i} className="flex flex-col gap-1">
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

                {/* Tabs */}
                <div className="mt-6">
                    <div className="flex items-center border-b border-secondary-200 overflow-x-auto no-scrollbar">
                        {['description','details','reviews'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap transition-all ${activeTab === tab ? 'text-primary-500 bg-secondary-900 rounded-t-2xl shadow' : 'text-secondary-500 hover:text-secondary-900'}`}
                            >
                                {tab === 'reviews' ? `Reviews (${product.reviews})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="py-6 min-h-48">
                        <AnimatePresence mode="wait">
                            {activeTab === 'description' && (
                                <motion.div key="desc" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:10 }}>
                                    <p className="text-secondary-600 text-base leading-relaxed">{product.description}</p>
                                </motion.div>
                            )}
                            {activeTab === 'details' && (
                                <motion.div key="details" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:10 }} className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-secondary-600">
                                    {['Fabric','Pattern','Fit','Neckline','SKU','Origin'].map((key,i) => (
                                        <div key={i} className="flex justify-between py-1 border-b border-secondary-100">
                                            <span className="font-medium">{key}</span>
                                            <span>{key==='SKU'? `7F-DW-2026-${product.id}` : key==='Fabric'? 'Silk Blend':'Regular'}</span>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                            {activeTab === 'reviews' && (
                                <motion.div key="reviews" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:10 }} className="space-y-4">
                                    <p className="text-secondary-600">Average Rating: {product.rating} / 5 ({product.reviews} reviews)</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-6 border-t border-secondary-100 pt-6">
                        <h2 className="text-2xl font-serif font-bold mb-4">You May Also Like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
};

export default ProductDetails;
