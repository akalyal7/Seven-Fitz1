import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowLeft, ArrowRight, ListFilter } from "lucide-react";

import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/product/ProductCard";
import ProductSkeleton from "../components/product/ProductSkeleton";

const Shop = () => {
  const { products, loading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const isPageLoading = loading || isLoading;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const productsPerPage = 6;
  const urlSearch = searchParams.get("search");

  const categories = [
    "ALL",
    "SAREE",
    "HALF-SAREE",
    "KURTI",
    "LEHENGA",
    "SALWAR SUIT",
    "OFFICE WEAR",
  ];

  /* Loading Effect */
  useEffect(() => {
    setIsLoading(true);
    setCurrentPage(1);
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, [selectedCategory, urlSearch]);

  /* Scroll to top on page change */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchLower = urlSearch?.toLowerCase() || "";
      const matchesSearch = urlSearch
        ? product.name.toLowerCase().includes(searchLower) ||
          product.category?.toLowerCase().includes(searchLower)
        : true;

      const matchesCategory =
        selectedCategory === "ALL"
          ? true
          : product.category?.toUpperCase() === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [urlSearch, selectedCategory, products]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const clearFilters = () => {
    setSelectedCategory("ALL");
    setSearchParams({});
    setCurrentPage(1);
  };

  return (
    <div className="relative min-h-screen pt-10 md:pt-12 pb-20 md:pb-28 bg-slate-50/50 overflow-hidden">
      {/* Soft Luxury Background Glow */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-[#e5a852]/5 blur-[80px] md:blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* ================= HEADER ================= */}
        <header className="mb-10 md:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.1] mb-4 md:mb-6 text-black"
          >
            Our <span className="text-[#e5a852]">Luxury</span> Collection
          </motion.h1>

          <p className="text-secondary-600 text-sm md:text-base mb-8 md:mb-10 max-w-xl leading-relaxed">
            Discover refined silhouettes and handcrafted details curated for
            every special moment.
          </p>

          {/* -------- Filter Pills -------- */}
          <div className="flex overflow-x-auto md:flex-wrap items-center gap-2 md:gap-3 pt-5 md:pt-7 pb-4 hide-scrollbar">
            <div className="flex items-center gap-2 mr-2 md:mr-4 text-gray-500 shrink-0">
              <ListFilter size={16} />
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">
                Filter
              </span>
            </div>

            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                  if (urlSearch) setSearchParams({});
                }}
                className={`shrink-0 px-5 md:px-8 py-2 md:py-2.5 rounded-full border text-[9px] md:text-[10px] font-bold tracking-[0.15em] transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-[#e5a852] text-black border-[#e5a852] shadow-xl shadow-[#e5a852]/20"
                    : "bg-white text-gray-500 border-gray-200 hover:border-[#e5a852] hover:text-black"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </header>

        {/* ================= PRODUCT GRID ================= */}
        <main>
          {isPageLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {[...Array(6)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : paginatedProducts.length > 0 ? (
            <motion.div
              key={selectedCategory + currentPage}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
            >
              {paginatedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="py-16 md:py-28 text-center bg-white rounded-3xl shadow-lg border border-gray-100 mx-4 md:mx-0">
              <Search className="mx-auto text-[#e5a852] mb-4 md:mb-6 w-12 h-12 md:w-14 md:h-14" />
              <h3 className="text-xl md:text-2xl font-serif font-bold text-black">
                No pieces found
              </h3>
              <p className="text-sm md:text-base text-gray-500 mt-2 md:mt-3 mb-6 md:mb-8">
                Try exploring another category.
              </p>
              <button
                onClick={clearFilters}
                className="bg-black text-[#e5a852] px-5 py-2 md:px-6 md:py-2 text-sm md:text-base rounded-full font-bold hover:bg-[#e5a852] hover:text-black transition"
              >
                Back to All
              </button>
            </div>
          )}

          {/* ================= PAGINATION ================= */}
          {!isPageLoading && totalPages > 1 && (
            <div className="mt-16 md:mt-24 flex items-center justify-center gap-2 md:gap-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-[#e5a852]/10 disabled:opacity-30 transition shrink-0"
              >
                <ArrowLeft size={16} className="md:w-4.5 md:h-4.5" />
              </button>

              <div className="flex gap-1 md:gap-2 overflow-x-auto hide-scrollbar">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full text-[10px] font-bold transition shrink-0 ${
                      currentPage === i + 1
                        ? "bg-black text-[#e5a852]"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-[#e5a852]/10 disabled:opacity-30 transition shrink-0"
              >
                <ArrowRight size={16} className="md:w-4.5 md:h-4.5" />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;