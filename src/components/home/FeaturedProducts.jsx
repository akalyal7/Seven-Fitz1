import React from "react";
import { motion } from "framer-motion";
import { products } from "../../data/products";
import ProductCard from "../product/ProductCard";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  // Get featured products
  const featured = products.filter((p) => p.isFeatured);

  // Ensure we always show 8 products
  const displayProducts =
    featured.length >= 8
      ? featured.slice(0, 8)
      : products.slice(0, 8);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#e5a852] font-semibold uppercase tracking-[0.4em] text-xs block mb-4">
            The Selection
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">
            Our <span className="text-[#e5a852]">Collections</span>
          </h2>

          <div className="w-20 h-0.75 bg-linear-to-r from-yellow-400 via-[#e5a852] to-yellow-700 mx-auto rounded-full" />

          <p className="text-gray-500 mt-5 max-w-xl mx-auto">
            Discover our carefully curated pieces crafted for elegance and confidence.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {displayProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;
