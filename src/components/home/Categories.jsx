import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categories } from "../../data/products";

const CategoryPage = () => {
  const [index, setIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Detect how many cards should show based on screen width
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

  const nextSlide = () => {
    setIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const translatePercentage = (100 / itemsPerView) * index;

  return (
    <section className="min-h-screen py-20 bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">
            Shop by <span className="text-[#e5a852]">Category</span>
          </h1>
          <p className="text-gray-500 mt-4 text-lg">
            Explore all our curated collections
          </p>
        </div>

        <div className="relative">
          
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            disabled={index === 0}
            className={`absolute -left-6 top-1/2 -translate-y-1/2 z-20 
              bg-white shadow-xl rounded-full p-3 transition 
              ${
                index === 0
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-[#e5a852] hover:text-white"
              }`}
          >
            <ChevronLeft size={22} />
          </button>

          {/* Slider */}
          <div className="overflow-hidden" ref={containerRef}>
            <motion.div
              animate={{ x: `-${translatePercentage}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
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
                    className="group block relative overflow-hidden rounded-lg shadow-lg"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Primary Image (fall back to same image if no secondary) */}
                    <img
                      src={hoveredIndex === i ? (category.img2 || category.image) : (category.img1 || category.image)}
                      alt={category.name}
                      loading="lazy"
                      className="w-full h-64 md:h-80 lg:h-96 object-cover transition duration-500"
                    />

                    {/* Secondary / hover image (optional) */}
                    <img
                      src={category.img2 || category.image}
                      alt={category.name}
                      className="absolute inset-0 w-full h-64 md:h-80 lg:h-96 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-500" />

                    <div className="absolute bottom-8 left-8">
                      <h3 className="text-2xl font-serif font-semibold text-white">
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            disabled={index === maxIndex}
            className={`absolute -right-6 top-1/2 -translate-y-1/2 z-20 
              bg-white shadow-xl rounded-full p-3 transition 
              ${
                index === maxIndex
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-[#e5a852] hover:text-white"
              }`}
          >
            <ChevronRight size={22} />
          </button>

        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
