import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categories } from "../../data/products";

const CategoryPage = () => {
  const [index, setIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const containerRef = useRef(null);

  const updateItemsPerView = () => {
    const width = window.innerWidth;
    if (width < 640) setItemsPerView(1);
    else if (width < 768) setItemsPerView(2);
    else if (width < 1024) setItemsPerView(3);
    else setItemsPerView(4);
  };

  useEffect(() => {
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(categories.length - itemsPerView, 0);

  const nextSlide = () => setIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setIndex((prev) => Math.max(prev - 1, 0));

  const translatePercentage = (100 / itemsPerView) * index;

  return (
    <section className="relative py-24 bg-linear-to-b from-white via-yellow-50 to-white overflow-hidden">

      {/* Decorative Background Blur */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#e5a852]/20 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] text-[#e5a852] uppercase mb-4 font-semibold">
            Collections
          </p>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 text-gray-900">
            Shop by <span className="text-[#e5a852]">Category</span>
          </h1>

          <div className="w-20 h-0.75 bg-linear-to-r from-yellow-400 via-[#e5a852] to-yellow-700 mx-auto rounded-full mb-6" />

          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Explore our curated collections crafted with elegance.
          </p>
        </div>

        <div className="relative">

          {/* Left Arrow (only shows if index > 0) */}
          {index > 0 && (
            <button
              onClick={prevSlide}
              className="absolute -left-14 top-1/2 -translate-y-1/2 z-20 
                backdrop-blur-xl bg-white/70 border border-white/40 
                shadow-xl rounded-full p-3 transition-all duration-300
                hover:bg-[#e5a852] hover:text-white hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Slider */}
          <div className="overflow-hidden" ref={containerRef}>
            <motion.div
              animate={{ x: `-${translatePercentage}%` }}
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
              className="flex"
            >
              {categories.map((category, i) => (
                <div
                  key={i}
                  className="shrink-0 px-4"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <Link
                    to={`/shop?category=${category.name}`}
                    className="group block relative rounded-lg overflow-hidden shadow-xl"
                  >
                    <motion.img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-72 md:h-80 lg:90 object-cover transition-transform duration-200 ease-out transform-gpu will-change-transform group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition duration-200" />

                    <div className="absolute bottom-8 left-8">
                      <h3 className="text-2xl md:text-3xl font-serif font-semibold text-white mb-3">
                        {category.name}
                      </h3>

                      <div className="w-12 h-0.5 bg-[#e5a852] group-hover:w-24 transition-all duration-200 mb-4" />

                      <span className="text-sm uppercase tracking-wider text-white/80 group-hover:text-white transition">
                        Explore Collection →
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Arrow (only shows if index < maxIndex) */}
          {index < maxIndex && (
            <button
              onClick={nextSlide}
              className="absolute -right-14 top-1/2 -translate-y-1/2 z-20 
                backdrop-blur-xl bg-white/70 border border-white/40 
                shadow-xl rounded-full p-3 transition-all duration-300
                hover:bg-[#e5a852] hover:text-white hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>
          )}

        </div>

      </div>
    </section>
  );
};

export default CategoryPage;
