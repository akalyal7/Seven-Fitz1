import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProducts } from "../../context/ProductContext";

const CategoryPage = () => {
  const [index, setIndex] = useState(0);
  const { categories, loading } = useProducts();
  const [itemsPerView, setItemsPerView] = useState(4);
  const containerRef = useRef(null);

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

  if (loading) return <p className="text-center py-20">Loading...</p>;

  return (
    <section className="min-h-screen py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-22 relative">

        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">
            New <span className="text-[#e5a852]">Arrivals</span>
          </h1>
          <p className="text-gray-500 mt-4 text-lg">
            Explore all our new collections
          </p>
          <div className="w-20 h-0.75 bg-linear-to-r from-yellow-400 via-[#e5a852] to-yellow-700 mx-auto rounded-full mt-4" />
        </div>

        <div className="relative">

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            disabled={index === 0}
            className={`absolute -left-2 md:-left-10 top-1/2 -translate-y-1/2 z-20 
              bg-white shadow-xl rounded-full p-3 transition 
              ${index === 0
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
                  >
                    {/* First Image */}
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-87.5 object-cover transition-opacity duration-500 group-hover:opacity-0"
                    />

                    {/* Second Image */}
                    <img
                      src={category.image1}
                      alt={category.name}
                      className="absolute inset-0 w-full h-87.5 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    {/* 
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-500" /> */}

                    <div className="absolute bottom-8 left-8">
                      <h3 className="text-lg font-serif font-semibold text-[#e5a852] bg-black/80 backdrop-blur-sm px-4 rounded-2xl border border-[#e5a852] ">
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
            className={`absolute -right-2 md:-right-10 top-1/2 -translate-y-1/2 z-20 
              bg-white shadow-xl rounded-full p-3 transition 
              ${index === maxIndex
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
