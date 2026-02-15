import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react';

const FilterSection = ({ title, children, isOpenDefault = true }) => {
    const [isOpen, setIsOpen] = useState(isOpenDefault);
    return (
        <div className="border-b border-secondary-100 py-6 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full mb-4 group"
            >
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-black group-hover:text-[#e5a852] transition-colors">
                    {title}
                </h4>
                <ChevronDown
                    size={16}
                    className={`text-secondary-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const WomensFilters = ({
    categories,
    categoryList = [],
    selectedSubcategories = [],
    setSelectedSubcategories = () => {},
    sizes,
    colors,
    selectedCategories,
    setSelectedCategories,
    selectedSizes,
    setSelectedSizes,
    selectedColors,
    setSelectedColors,
    priceRange,
    setPriceRange,
    onClear
}) => {
    const toggle = (item, selected, setter) => {
        setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal size={18} className="text-[#e5a852]" />
                    <h3 className="text-xl font-serif font-bold text-black">Filters</h3>
                </div>
                <button
                    onClick={onClear}
                    className="text-[10px] font-bold uppercase tracking-widest text-secondary-400 hover:text-[#e5a852] transition-colors underline underline-offset-8"
                >
                    Reset All
                </button>
            </div>

            <FilterSection title="Categories">
                <div className="space-y-3">
                    {categories.map(cat => (
                        <label key={cat} className="flex items-center gap-4 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => toggle(cat, selectedCategories, setSelectedCategories)}
                                />
                                <div className="w-5 h-5 border-2 border-secondary-200 rounded-md peer-checked:bg-black peer-checked:border-black transition-all duration-300"></div>
                                <X size={12} className="absolute text-[#e5a852] scale-0 peer-checked:scale-100 transition-transform duration-300" />
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${selectedCategories.includes(cat) ? 'text-black' : 'text-secondary-400 group-hover:text-black'}`}>
                                {cat}
                            </span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            <FilterSection title="Subcategories">
                {selectedCategories.length === 1 ? (
                    <div className="space-y-3">
                        {(() => {
                            const catObj = categoryList.find(c => c.name === selectedCategories[0]);
                            const subs = catObj?.subcategories || [];
                            return subs.map(sub => (
                                <label key={sub} className="flex items-center gap-4 cursor-pointer group">
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            className="peer sr-only"
                                            checked={selectedSubcategories.includes(sub)}
                                            onChange={() => toggle(sub, selectedSubcategories, setSelectedSubcategories)}
                                        />
                                        <div className="w-5 h-5 border-2 border-secondary-200 rounded-md peer-checked:bg-black peer-checked:border-black transition-all duration-300"></div>
                                    </div>
                                    <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${selectedSubcategories.includes(sub) ? 'text-black' : 'text-secondary-400 group-hover:text-black'}`}>
                                        {sub}
                                    </span>
                                </label>
                            ));
                        })()}
                    </div>
                ) : (
                    <p className="text-xs text-secondary-400">Select a single category to see its subcategories.</p>
                )}
            </FilterSection>

            <FilterSection title="Price Range">
                <div className="px-1">
                    <input
                        type="range"
                        min="0"
                        max="500"
                        value={priceRange}
                        onChange={(e) => setPriceRange(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-secondary-100 rounded-lg appearance-none cursor-pointer accent-[#e5a852]"
                    />
                    <div className="flex items-center justify-between mt-4">
                        <span className="text-[10px] font-black text-secondary-400 uppercase tracking-widest">Min: $0</span>
                        <span className="text-sm font-bold text-black bg-slate-50 px-3 py-1 rounded-full border border-secondary-100">
                            Up to ${priceRange}
                        </span>
                    </div>
                </div>
            </FilterSection>

            <FilterSection title="Size">
                <div className="grid grid-cols-4 gap-2">
                    {sizes.map(size => (
                        <button
                            key={size}
                            onClick={() => toggle(size, selectedSizes, setSelectedSizes)}
                            className={`h-10 rounded-xl text-[10px] font-black transition-all duration-300 border-2 ${selectedSizes.includes(size) ? 'bg-black border-black text-[#e5a852] shadow-lg shadow-black/10' : 'bg-white border-secondary-100 text-black hover:border-[#e5a852]'}`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </FilterSection>

            <FilterSection title="Colors">
                <div className="flex flex-wrap gap-3">
                    {colors.map(color => (
                        <button
                            key={color}
                            onClick={() => toggle(color, selectedColors, setSelectedColors)}
                            title={color}
                            className={`w-8 h-8 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${selectedColors.includes(color) ? 'border-black ring-2 ring-[#e5a852] ring-offset-2' : 'border-transparent ring-1 ring-secondary-100 hover:scale-110'}`}
                        >
                            <div
                                className="w-full h-full rounded-full"
                                style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}
                            />
                        </button>
                    ))}
                </div>
            </FilterSection>
        </div>
    );
};

export default WomensFilters;
