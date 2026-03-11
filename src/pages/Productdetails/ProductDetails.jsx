import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { Star, Heart, ShoppingBag, ChevronRight, Ruler, ShieldCheck, Truck, RefreshCw, Minus, Plus, Sparkles, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../../components/product/ProductCard';
import ReviewSummary from './ReviewSummery';
import ReviewModal from './Reviewmodel';

const ProductDetails = () => {
    const { products, loading } = useProducts();
    const { id } = useParams();
    const navigate = useNavigate();
    const showToast = useToast();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const [reviews, setReviews] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const handleAddReview = (newReview) => {
        setReviews([...reviews, newReview]);
    };

    const product = products.find(p => String(p.id) === String(id));
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [showProductDetails, setShowProductDetails] = useState(false);

    const [selectedVariant, setSelectedVariant] = useState(null);
    useEffect(() => {
        if (product) {

            // If product has variants
            if (product.variants && product.variants.length > 0) {
                setSelectedVariant(product.variants[0]);
            }
            // If no variants
            else {
                setSelectedVariant({
                    color: "Default",
                    images: product.images
                });
            }

            setSelectedImage(0);
        }
    }, [product]);

    console.log(selectedVariant, "selectedVariant")

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-10 text-center">
                <h2 className="text-2xl font-serif font-bold mb-4">Loading...</h2>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-10 text-center">
                <h2 className="text-2xl font-serif font-bold mb-4">Product Not Found</h2>
                <Link to="/shop" className="btn-primary">Back to Shop</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        const colorToPass = selectedVariant ? selectedVariant.color : selectedColor;
        const modifiedProduct = { ...product };
        if (selectedVariant && selectedVariant.images) {
            modifiedProduct.images = selectedVariant.images;
        }

        addToCart(modifiedProduct, quantity, selectedSize, colorToPass);
        showToast(`Added ${product.name} to cart!`);
    };

    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    const colorGallery = [
        { name: "Red", image: product.images[0] },
        { name: "Black", image: product.images[1] || product.images[0] },
        { name: "White", image: product.images[2] || product.images[0] },
        { name: "Beige", image: product.images[3] || product.images[0] },
        { name: "Brown", image: product.images[0] },
        { name: "Navy", image: product.images[1] || product.images[0] },
        { name: "Olive", image: product.images[2] || product.images[0] },
        { name: "Grey", image: product.images[3] || product.images[0] },
        { name: "Wine", image: product.images[0] },
        { name: "Mustard", image: product.images[1] || product.images[0] },
    ];

    // Instead of strictly same category, we could pick products that are not in the same category
    // or just random products excluding current one
    const peopleAlsoLike = products
        .filter(p => p.id !== product.id) // exclude current product
        .slice(0, 4); // show max 4 products

    return (
        <div className="pb-10 mt-10">
            <div className="container-custom py-6">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

                    {/* Left Column wrapper to stretch height */}
                    <div className="w-full">
                        {/* Sticky Left Column: Breadcrumbs + Image Gallery */}
                        <div className="flex flex-col gap-6 w-full lg:sticky lg:top-24 z-10">

                            {/* Breadcrumbs */}
                            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-secondary-400 px-2">
                                <Link to="/" className="hover:text-[#e5a852] transition-colors">Home</Link>
                                <ChevronRight size={10} className="text-secondary-200" />
                                <Link to="/shop" className="hover:text-[#e5a852] transition-colors">Shop</Link>
                                <ChevronRight size={10} className="text-secondary-200" />
                                <Link to={`/shop?category=${product.category}`} className="hover:text-[#e5a852] transition-colors">{product.category}</Link>
                                <ChevronRight size={10} className="text-secondary-200" />
                                <span className="text-secondary-900 truncate">{product.name}</span>
                            </nav>

                            {/* Image + Buttons Section */}
                            <div className="flex flex-col lg:flex-row gap-6 w-full">

                                {/* LEFT – Thumbnails */}
                                <div className="flex lg:flex-col gap-3 order-2 lg:order-1">
                                    {selectedVariant?.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-all duration-300
                ${selectedImage === idx
                                                    ? 'border-[#e5a852] shadow-md'
                                                    : 'border-secondary-200 hover:border-secondary-400'
                                                }`}
                                        >
                                            <img
                                                src={img}
                                                alt={`${product.name} view ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>

                                {/* RIGHT – Main Image + Buttons */}
                                <div className="flex flex-col flex-1 order-1 lg:order-2">

                                    {/* Main Image */}
                                    <motion.div
                                        key={selectedImage}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="rounded-xl overflow-hidden bg-secondary-50 relative group"
                                    >
                                        <img
                                            src={selectedVariant?.images[selectedImage]}
                                            alt={product.name}
                                            className="w-full h-150 object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        {product.isNew && (
                                            <span className="absolute top-4 left-4 bg-white text-secondary-900 text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full shadow-md z-20">
                                                New
                                            </span>
                                        )}
                                    </motion.div>

                                    {/* Buttons Below Image */}
                                    <div className="mt-6 grid grid-cols-2 gap-4">

                                        {/* Add To Cart */}
                                        <button
                                            onClick={handleAddToCart}
                                            className="col-span-1 h-14 bg-black text-[#ffbf67] rounded-lg font-black uppercase tracking-[0.2em] text-xs hover:text-white transition-all duration-300 shadow-lg"
                                        >
                                            Add to Bag
                                        </button>

                                        {/* Buy Now */}
                                        <button
                                            onClick={() => {
                                                handleAddToCart();
                                                navigate('/checkout');
                                            }}
                                            className="col-span-1 h-14 bg-[#e5a852] text-black rounded-lg font-black uppercase tracking-[0.3em] text-xs hover:text-white transition-all duration-300 shadow-lg"
                                        >
                                            Buy Now
                                        </button>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#e5a852] bg-primary-500/10 px-3 py-1.5 rounded-full">
                                    {product.category}
                                </span>
                                <div className="flex items-center gap-1 text-xs font-black text-secondary-900 bg-secondary-50 px-2 py-1 rounded-full">
                                    <Star size={14} className="text-[#e5a852] fill-current" />
                                    <span>{product.rating}</span>
                                    <span className="text-secondary-400 pl-1 border-l border-secondary-200 ml-1">{product.reviews} Reviews</span>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary-900 mb-4 leading-[1.05]">{product.name}</h1>

                            <div className="flex items-center gap-4">
                                <span className="text-3xl font-black text-secondary-900 tracking-tight">₹{product.price}</span>
                                {product.oldPrice && (
                                    <span className="text-xl text-secondary-300 line-through font-medium tracking-tight">₹{product.oldPrice}</span>
                                )}
                            </div>
                        </div>

                        <p className="text-secondary-500 leading-relaxed text-base font-medium mb-6 max-w-xl">
                            {product.description}
                        </p>

                        {/* Size Selection */}
                        <div className="mt-6">
                            <h4 className="text-sm font-extrabold uppercase tracking-[0.2em] text-black mb-3">
                                Available Sizes
                            </h4>

                            <div className="flex flex-wrap gap-3">
                                {product.sizes?.map((size, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => setSelectedSize(size)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`min-w-11 h-10 px-3 rounded-xl border-2 text-sm font-bold tracking-widest transition-all duration-300
                ${selectedSize === size
                                                ? 'border-[#e5a852] text-black shadow-lg'
                                                : 'border-secondary-200 text-secondary-700 hover:border-secondary-400'
                                            }`}
                                    >
                                        {size}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div className="mt-8">
                            <h4 className="text-sm font-extrabold uppercase tracking-[0.2em] text-black mb-4">
                                Available Colors
                            </h4>

                            <div className="relative">
                                <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2">

                                    {product.variants?.map((variant, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => {
                                                setSelectedVariant(variant);
                                                setSelectedImage(0); // Reset main image
                                            }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`relative min-w-27 group rounded-2xl overflow-hidden border-2 transition-all duration-300
          ${selectedVariant?.color === variant.color
                                                    ? 'border-[#e5a852] shadow-xl ring-2 ring-primary-200'
                                                    : 'border-secondary-100 hover:border-secondary-300'
                                                }`}
                                        >

                                            {/* Show First Image of That Color */}
                                            <img
                                                src={variant.images[0]}
                                                alt={variant.color}
                                                className="w-full h-24 object-cover transition-transform duration-500 group-hover:scale-110"
                                            />

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />

                                            {/* Color Name */}
                                            <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-center py-1">
                                                {variant.color}
                                            </div>

                                            {/* Selected Badge */}
                                            {selectedVariant?.color === variant.color && (
                                                <div className="absolute top-2 right-2 bg-[#e5a852] text-white text-[8px] px-2 py-0.5 rounded-full shadow">
                                                    Selected
                                                </div>
                                            )}

                                        </motion.button>
                                    ))}

                                </div>

                                <div className="pointer-events-none absolute top-0 right-0 h-full w-10 bg-linear-to-l from-white to-transparent" />
                            </div>
                        </div>
                        {/* Quantity Section */}
                        <div className="mt-8">
                            <h4 className="text-sm font-extrabold uppercase tracking-[0.2em] text-black mb-4">
                                Quantity
                            </h4>

                            <div className="flex items-center max-w-30 gap-6 border-2 border-secondary-200 rounded-2xl overflow-hidden">

                                {/* Minus Button */}
                                <button
                                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                    className="w-14 h-14 flex items-center justify-center text-secondary-600 transition"
                                >
                                    <Minus size={18} />
                                </button>

                                {/* Quantity Display */}
                                <span className="text-lg font-bold tracking-widest text-secondary-900">
                                    {quantity}
                                </span>

                                {/* Plus Button */}
                                <button
                                    onClick={() => setQuantity(prev => prev + 1)}
                                    className="w-14 h-14 flex items-center justify-center text-secondary-600 transition"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>

                        {/* USP Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-secondary-50/50 rounded-2xl border border-secondary-100 mt-8">
                            {[{ icon: <Sparkles size={20} />, title: "Premium Fabric", subtitle: "High Quality" },
                            { icon: <Tag size={20} />, title: "Lowest Price", subtitle: "Guaranteed" },
                            { icon: <ShieldCheck size={20} />, title: "Secure", subtitle: "Safe Checkout" }].map((feature, i) => (
                                <div key={i} className="flex flex-col gap-1 items-center sm:items-start text-center sm:text-left">
                                    <div className="text-[#e5a852] mb-1">{feature.icon}</div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary-900 mb-0.5">{feature.title}</p>
                                        <p className="text-[10px] font-bold text-secondary-400 uppercase tracking-widest">{feature.subtitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* DETAILS */}
                        <div className="border border-gray-100 rounded-3xl overflow-hidden mt-8 bg-white/70 backdrop-blur-xl shadow-lg transition-all duration-300">
                            <div
                                className="w-full px-8 py-6 bg-white border-b border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => setShowProductDetails(!showProductDetails)}
                            >
                                <span className="text-lg font-bold text-gray-800 font-sans">
                                    Product Details
                                </span>
                                <button
                                    type="button"
                                    className="text-sm font-bold text-[#e5a852] bg-primary-50 px-4 py-2 rounded-lg hover:bg-primary-100 transition-colors"
                                >
                                    {showProductDetails ? "Hide" : "View"}
                                </button>
                            </div>

                            <AnimatePresence>
                                {showProductDetails && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="bg-white px-8 pb-8 pt-6 space-y-4">
                                            {[
                                                { label: "Fabric", value: "Silk Blend" },
                                                { label: "Pattern", value: "Printed" },
                                                { label: "Fit", value: "Regular Fit" },
                                                { label: "Neckline", value: "Round Neck" },
                                                { label: "SKU", value: `7F-DW-2026-${product.id}` },
                                                { label: "Origin", value: "India" },
                                            ].map((item, i) => (
                                                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 rounded-lg px-3 transition-colors">
                                                    <span className="text-sm font-medium text-gray-500">{item.label}</span>
                                                    <span className="text-sm font-bold text-gray-800">{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Reviews */}
                <div className="mt-16 sm:mt-20">
                    <ReviewSummary
                        reviews={reviews}
                        onAddReview={() => setOpenModal(true)}
                    />

                    <ReviewModal
                        isOpen={openModal}
                        onClose={() => setOpenModal(false)}
                        onSubmit={handleAddReview}
                    />
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-16 sm:mt-20 pt-10 border-t border-secondary-100">
                        <h2 className="text-2xl font-serif font-bold text-secondary-900 mb-8">You May Also Like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </section>
                )}

                {/* People Also Like */}
                {peopleAlsoLike.length > 0 && (
                    <section className="mt-16 sm:mt-20 pt-10 border-t border-secondary-100">
                        <h2 className="text-2xl font-serif font-bold text-secondary-900 mb-8">People Also Buy</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {peopleAlsoLike.map(p => (
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
