

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import img1 from "../../assets/Images/img1.jpg"
import img2 from "../../assets/Images/img2.jpg"
import img3 from "../../assets/Images/img3.jpg"

const EpicCollection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -80]);
  const { categories, loading } = useProducts();

  if (loading) return <p className="text-center py-24">Loading...</p>;

  return (
    <section className="relative bg-white py-24">
      <div className="max-w-7xl mx-auto px-3">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-xs tracking-[0.4em] text-[#e5a852] uppercase mb-4 font-semibold">
            Collection
          </p>

          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            Our <span className="text-[#e5a852]">Categories</span>
          </h2>

          <div className="w-16 h-0.5 bg-[#e5a852] mx-auto mt-6" />

          <p className="text-gray-500 mt-6 max-w-lg mx-auto text-lg">
            Discover timeless elegance curated with premium craftsmanship.
          </p>
        </motion.div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-start">

          {/* LEFT SIDE - Sticky Luxury Banner */}
          <div className="relative h-[85vh] mt-20">
            <div className="sticky top-28 h-full">

              <motion.div
                style={{ y }}
                className="relative h-full overflow-hidden rounded-lg"
              >
                <img
                  src="https://i.pinimg.com/736x/db/06/2b/db062bacb67a156c1bd855693d55d9c0.jpg"
                  alt="Dress Collection"
                  className="w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                {/* <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" /> */}

                {/* Glass Panel */}
                <div className="absolute bottom-10 left-10 bg-white/50 backdrop-blur-md border border-white/20 p-4 rounded-xl">

                  <h3 className="text-2xl md:text-3xl font-serif text-black font-bold mb-3">
                    Dress Collection
                  </h3>
                  <h3>
                    347 Products
                  </h3>

                  <Link
                    to="/shop"
                    className="inline-block mt-4 px-6 py-2 md:px-8 md:py-3 bg-black text-white rounded-full text-sm tracking-wide hover:bg-[#e5a852] hover:text-black transition w-full sm:w-auto text-center"
                  >
                    Explore Collection →
                  </Link>

                </div>

              </motion.div>
            </div>
          </div>

         {/* RIGHT SIDE - Scroll Feed */}
<div className="h-[85vh] overflow-y-auto pr-2 space-y-7 scrollbar-hide">

  {/* Image 1 */}
  <motion.div
    className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <Link
      to="/shop?category=SAREE"
      className="group block relative rounded-lg overflow-hidden"
    >
      <div className="overflow-hidden">
        <img
          src={img1}
          alt="Category 1"
          className="w-full h-75 object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-2xl">Category 1</h3>
      </div>
    </Link>
  </motion.div>

  {/* Image 2 */}
  <motion.div
    className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <Link
      to="/shop"
      className="group block relative rounded-lg overflow-hidden"
    >
      <div className="overflow-hidden">
        <img
          src={img2}
          alt="Category 2"
          className="w-full h-75 object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-2xl">Category 2</h3>
      </div>
    </Link>
  </motion.div>

  {/* Image 3 */}
  <motion.div
    className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <Link
      to="/shop"
      className="group block relative rounded-lg overflow-hidden"
    >
      <div className="overflow-hidden">
        <img
          src={img3}
          alt="Category 3"
          className="w-full h-75 object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-2xl">Category 3</h3>
      </div>
    </Link>
  </motion.div>

  {/* Image 4 */}
  <motion.div
    className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <Link
      to="/shop"
      className="group block relative rounded-lg overflow-hidden"
    >
      <div className="overflow-hidden">
        <img
          src={img3}
          alt="Category 3"
          className="w-full h-75 object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-2xl">Category 3</h3>
      </div>
    </Link>
  </motion.div>

  {/* Image 5 */}
  <motion.div
    className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <Link
      to="/shop"
      className="group block relative rounded-lg overflow-hidden"
    >
      <div className="overflow-hidden">
        <img
          src={img3}
          alt="Category 3"
          className="w-full h-75 object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-2xl">Category 3</h3>
      </div>
    </Link>
  </motion.div>

</div>

        </div>
      </div>
    </section>
  );
};

export default EpicCollection;
