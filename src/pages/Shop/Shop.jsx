import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowLeft, ArrowRight, SlidersHorizontal } from "lucide-react";

import { useProducts } from "../../context/ProductContext";
import ProductCard from "../../components/product/ProductCard";
import ProductSkeleton from "../../components/product/ProductSkeleton";

const Shop = () => {
  const { products, categories, loading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const isPageLoading = loading || isLoading;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedSubcategory, setSelectedSubcategory] = useState("ALL");

  const productsPerPage = 6;
  const urlSearch = searchParams.get("search");
  const urlCategory = searchParams.get("category");

  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory.toUpperCase());
    } else {
      setSelectedCategory("ALL");
    }
    setSelectedSubcategory("ALL");
  }, [urlCategory]);

  const mainCategoriesList = categories
    ? ["ALL", ...categories.map((c) => c.name.toUpperCase())]
    : ["ALL"];

  const currentCategoryData = categories?.find(
    (c) => c.name.toUpperCase() === selectedCategory
  );

  const subcategoriesList = currentCategoryData?.subcategories
    ? ["ALL", ...currentCategoryData.subcategories.map((s) => s.toUpperCase())]
    : [];

  /* Loading Effect */
  useEffect(() => {
    setIsLoading(true);
    setCurrentPage(1);
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedSubcategory, urlSearch]);

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

      const matchesSubcategory =
        selectedSubcategory === "ALL"
          ? true
          : product.subcategory?.toUpperCase() === selectedSubcategory;

      return matchesSearch && matchesCategory && matchesSubcategory;
    });
  }, [urlSearch, selectedCategory, selectedSubcategory, products]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const clearFilters = () => {
    setSelectedCategory("ALL");
    setSelectedSubcategory("ALL");
    setSearchParams({});
    setCurrentPage(1);
  };

  return (
    <div className="relative min-h-screen pt-8 sm:pt-10 md:pt-12 pb-16 sm:pb-20 md:pb-28 bg-slate-50/50 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-[#e5a852]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="container-custom relative z-10">

        {/* HEADER */}
        <header className="mb-6 sm:mb-10 md:mb-16">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.1] mb-2 sm:mb-4 md:mb-6 text-black"
          >
            Our <span className="text-[#e5a852]">Luxury</span> Collection
          </motion.h1>

          <p className="text-secondary-600 text-xs sm:text-sm md:text-base mb-6 sm:mb-8 md:mb-10 max-w-xl leading-relaxed">
            Discover refined silhouettes and handcrafted details curated for
            every special moment.
          </p>

          {/* CATEGORY TABS */}
          <div className="flex items-center gap-3 sm:gap-6 border-b border-gray-200 pb-3 overflow-x-auto hide-scrollbar">

            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-500 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em]">
                Category
              </span>
            </div>

            {mainCategoriesList.map((cat) => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedSubcategory("ALL");
                  setCurrentPage(1);
                  if (urlSearch) setSearchParams({});
                }}
                className={`relative shrink-0 px-3 sm:px-4 md:px-6 py-2 text-[10px] sm:text-[11px] md:text-[12px] font-semibold tracking-[0.15em] transition ${selectedCategory === cat
                  ? "text-black"
                  : "text-gray-400 hover:text-black"
                  }`}
              >
                {cat}

                {selectedCategory === cat && (
                  <motion.span
                    layoutId="activeCategory"
                    className="absolute left-0 -bottom-0.75 w-full h-0.5 bg-[#e5a852]"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* SUBCATEGORY CHIPS */}
          {selectedCategory !== "ALL" && subcategoriesList.length > 1 && (
            <>
              <div className="h-px bg-gray-200 my-4 sm:my-5"></div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-wrap gap-2 sm:gap-3"
              >
                {subcategoriesList.map((subcat) => (
                  <motion.button
                    key={subcat}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedSubcategory(subcat);
                      setCurrentPage(1);
                    }}
                    className={`px-3 sm:px-4 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-medium transition ${selectedSubcategory === subcat
                      ? "bg-[#e5a852]/10 text-[#e5a852] border border-[#e5a852]"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    {subcat}
                  </motion.button>
                ))}
              </motion.div>
            </>
          )}

        </header>

        {/* PRODUCT GRID */}
        <main>

          {isPageLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 lg:gap-y-12">
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
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 lg:gap-y-12"
            >
              {paginatedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="py-20 text-center bg-white rounded-3xl shadow-lg border border-gray-100">
              <Search className="mx-auto text-[#e5a852] mb-6 w-14 h-14" />

              <h3 className="text-2xl font-serif font-bold text-black">
                No pieces found
              </h3>

              <p className="text-gray-500 mt-3 mb-8">
                Try exploring another category.
              </p>

              <button
                onClick={clearFilters}
                className="bg-black text-[#e5a852] px-6 py-2 rounded-full font-bold hover:bg-[#e5a852] hover:text-black transition"
              >
                Back to All
              </button>
            </div>
          )}

          {/* PAGINATION */}
          {!isPageLoading && totalPages > 1 && (
            <div className="mt-20 flex items-center justify-center gap-4">

              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#e5a852]/10 disabled:opacity-30"
              >
                <ArrowLeft size={16} />
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-12 h-12 rounded-full text-[11px] font-bold ${currentPage === i + 1
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
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#e5a852]/10 disabled:opacity-30"
              >
                <ArrowRight size={16} />
              </button>

            </div>
          )}

        </main>

      </div>
    </div>
  );
};

export default Shop;