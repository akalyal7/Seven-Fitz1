import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import ProductSkeleton from '../components/product/ProductSkeleton';
import WomensFilters from '../components/shop/WomensFilters';
import { Search, ChevronDown, X, SlidersHorizontal, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState('featured');
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    // Filter states 
    const [priceRange, setPriceRange] = useState(500);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);

    const urlCategory = searchParams.get('category');
    const urlSearch = searchParams.get('search');

    // Simulate loading
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, [selectedCategories, selectedSizes, selectedColors, priceRange, sortBy]);

    useEffect(() => {
        if (urlCategory && !selectedCategories.includes(urlCategory)) {
            setSelectedCategories([urlCategory]);
        }
    }, [urlCategory]);

    const allCategories = [...new Set(products.map(p => p.category))];
    const allSizes = ["XS", "S", "M", "L", "XL"];
    const allColors = ["Emerald", "Midnight Blue", "Rose Gold", "Beige", "Ivory", "Sage", "Olive", "Black", "Sand", "Heather Gray", "Oatmeal", "Burgundy"];

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = urlSearch
                ? product.name.toLowerCase().includes(urlSearch.toLowerCase()) ||
                product.description.toLowerCase().includes(urlSearch.toLowerCase())
                : true;

            const matchesCategory = selectedCategories.length > 0
                ? selectedCategories.includes(product.category)
                : true;

            const matchesSize = selectedSizes.length > 0
                ? product.sizes.some(size => selectedSizes.includes(size))
                : true;

            const matchesColor = selectedColors.length > 0
                ? product.colors.some(color => selectedColors.includes(color))
                : true;

            const matchesPrice = product.price <= priceRange;

            return matchesSearch && matchesCategory && matchesSize && matchesColor && matchesPrice;
        }).sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            if (sortBy === 'newest') return b.id - a.id;
            return 0; // featured
        });
    }, [urlSearch, selectedCategories, selectedSizes, selectedColors, priceRange, sortBy]);

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    // Scroll to top on page change
    useEffect(() => {
        const element = document.getElementById('shop-collection');
        if (element && !isLoading) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentPage]);

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedSizes([]);
        setSelectedColors([]);
        setPriceRange(500);
        setSearchParams({});
        setCurrentPage(1);
    };

    return (
        <div className="bg-lineaar-to-b from-white via-slate-50/30 to-white min-h-screen pb-16 mt-10 relative">
           

            <div id="shop-collection" className="container-custom">
                {/* Mobile Filter Toggle & Sort */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-secondary-100">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-px bg-[#e5a852]" />
                            <span className="text-[#e5a852] font-black uppercase tracking-[0.4em] text-[10px]">Collection</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-2">
                            {urlSearch ? `Search: "${urlSearch}"` : "The Women's Edit"}
                        </h2>
                        <p className="text-secondary-400 text-sm font-medium tracking-wide">
                            Curating {isLoading ? "..." : paginatedProducts.length} of {filteredProducts.length} masterpieces
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none bg-white border border-secondary-200 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[#e5a852]/20 transition-all cursor-pointer pr-12 shadow-sm hover:border-[#e5a852]"
                            >
                                <option value="featured">Featured</option>
                                <option value="newest">Newest Arrivals</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400" />
                        </div>

                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="lg:hidden flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#e5a852] hover:text-black transition-all duration-300 shadow-xl"
                        >
                            <SlidersHorizontal size={14} className="text-[#e5a852]" /> Refine
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-64 shrink-0">
                        <div className="sticky top-24">
                            <WomensFilters
                                categories={allCategories}
                                sizes={allSizes}
                                colors={allColors}
                                selectedCategories={selectedCategories}
                                setSelectedCategories={setSelectedCategories}
                                selectedSizes={selectedSizes}
                                setSelectedSizes={setSelectedSizes}
                                selectedColors={selectedColors}
                                setSelectedColors={setSelectedColors}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                onClear={clearFilters}
                            />
                        </div>
                    </aside>

                    {/* Product Grid Area */}
                    <div className="grow">
                        {isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[...Array(productsPerPage)].map((_, i) => (
                                    <ProductSkeleton key={i} />
                                ))}
                            </div>
                        ) : paginatedProducts.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {paginatedProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-12 flex items-center justify-center gap-3">
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage(prev => prev - 1)}
                                            className="w-10 h-10 rounded-full border border-secondary-200 flex items-center justify-center text-secondary-900 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 hover:border-[#e5a852] transition-all duration-300"
                                        >
                                            <ArrowLeft size={18} />
                                        </button>

                                        <div className="flex items-center gap-2">
                                            {[...Array(totalPages)].map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setCurrentPage(i + 1)}
                                                    className={`w-10 h-10 rounded-full text-xs font-black transition-all duration-300 ${currentPage === i + 1 ? 'bg-black text-[#e5a852] shadow-lg' : 'hover:bg-slate-50 text-secondary-400'}`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            disabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage(prev => prev + 1)}
                                            className="w-10 h-10 rounded-full border border-secondary-200 flex items-center justify-center text-secondary-900 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 hover:border-[#e5a852] transition-all duration-300"
                                        >
                                            <ArrowRight size={18} />
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="py-20 bg-secondary-50 rounded-3xl border-2 border-dashed border-secondary-200 px-8">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-black/5">
                                    <Search size={36} className="text-secondary-200" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-black mb-2">No products found</h3>
                                <p className="text-secondary-400 max-w-md mb-8 font-medium text-sm">We couldn't find anything matching your filters. Try widening your search.</p>
                                <button
                                    onClick={clearFilters}
                                    className="px-8 py-3 bg-black text-[#e5a852] text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[#e5a852] hover:text-black transition-all duration-300 shadow-xl"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Slide-over */}
            <AnimatePresence>
                {isFilterOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsFilterOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-101 shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center justify-between p-8 border-b border-secondary-100">
                                <h3 className="text-2xl font-serif font-bold">Refine Results</h3>
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="p-3 bg-secondary-50 rounded-full hover:bg-secondary-100 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="grow overflow-y-auto px-8 py-4">
                                <WomensFilters
                                    categories={allCategories}
                                    sizes={allSizes}
                                    colors={allColors}
                                    selectedCategories={selectedCategories}
                                    setSelectedCategories={setSelectedCategories}
                                    selectedSizes={selectedSizes}
                                    setSelectedSizes={setSelectedSizes}
                                    selectedColors={selectedColors}
                                    setSelectedColors={setSelectedColors}
                                    priceRange={priceRange}
                                    setPriceRange={setPriceRange}
                                    onClear={clearFilters}
                                />
                            </div>

                            <div className="p-6 bg-slate-50 border-t border-secondary-100">
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="w-full py-4 bg-black text-[#e5a852] text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-[#e5a852] hover:text-black transition-all duration-300"
                                >
                                    Show {filteredProducts.length} Results
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Shop;
